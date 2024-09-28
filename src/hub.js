(function () {
	const GameEvent = {
		START_LOADING: 'start_loading',
		GAME_LOADED: 'game_loaded',
		SHOW_MODAL: 'show_modal',
		PRE_PLAY: 'pre_play',
		PLAY: 'play',
		FINISH_ROUND_ANIMATIONS: 'finish_round_animations',
		AUTOSPINS_STARTED: 'autospins_started',
		AUTOSPINS_STOPPED: 'autospins_stopped'
	};

	//TODO: сделать чёткое разделение на external и internal ивенты
	const LobbyEvent = {
		READY: 'ready',
		INITED: 'inited',
		INIT_EXT_WIDGETS: 'init_ext_widgets',
		DISABLE_EXT_WIDGETS: 'disable_ext_widgets',
		ENABLE_EXT_WIDGETS: 'enable_ext_widgets',
		OPEN_LOBBY: 'open_lobby',
		CLOSE_LOBBY: 'close_lobby',
		JOIN_CHALLENGE: 'join_challenge',
		JOIN_CHALLENGE_INT: 'join_challenge_int',
		GAME_UI_OVERLAP: 'game_ui_overlap'
	};

	class LobbyHub {
		lobby = null;
		lobbyContainer = null;
		globalEventDispatcher = null;

		lobbyUrl = `lobby.html`;

		_isAutoSpining = false;
		_isAutoSpinCount = 0;

		constructor() {
			this.initialHandler = this.initialHandler.bind(this);
			this._onLobbyHubMessage = this._onLobbyHubMessage.bind(this);
			this._onResize = this._onResize.bind(this);
			this._onGlobalError = this._onGlobalError.bind(this);

			if (!window.trackGameEventListeners) {
				window.trackGameEventListeners = [];
			}

			this._prepareLobbyUrl();

			window.trackGameEventListeners.push(this.initialHandler);
		}

		_prepareLobbyUrl() {
			const urlParts = document.currentScript.src.split('/');
			urlParts.pop();

			if (urlParts[urlParts.length - 1] === 'src') {
				urlParts.pop();
			}

			this.lobbyUrl = `${urlParts.join('/')}/${this.lobbyUrl}`;
		}

		initialHandler(eventName, targetName, context) {
			switch (eventName) {
				case GameEvent.START_LOADING:
					this.game = context?.game;
					this.isMobile = this.game?.isMobile?.any;
					this.isPortrait = window.innerHeight > window.innerWidth;
					this.globalEventDispatcher = this.game?.globalEventDispatcher;
					break;

				case GameEvent.GAME_LOADED:
					if (window.__OPTIONS__?.lobby_options?.show_lobby) {
						this.init();
					}
					break;

				case GameEvent.AUTOSPINS_STARTED:
					this._isAutoSpining = true;
					this._isAutoSpinCount = context === 1 ? Infinity : context;
					window.postMessage({ name: LobbyEvent.DISABLE_EXT_WIDGETS }, '*');
					break;

				case GameEvent.AUTOSPINS_STOPPED:
					this._isAutoSpining = false;
					this._isAutoSpinCount = 0;
					window.postMessage({ name: LobbyEvent.ENABLE_EXT_WIDGETS }, '*');
					break;

				case GameEvent.PRE_PLAY:
					this._closeLobby();
					if (this._isAutoSpining) break;
					window.postMessage({ name: LobbyEvent.DISABLE_EXT_WIDGETS }, '*');
					break;

				case GameEvent.PLAY:
					this.sendCommand({ name: 'refreshRoundSeriesId', sender: 'hub' });
					break;

				case GameEvent.FINISH_ROUND_ANIMATIONS:
					if (this._isAutoSpining) {
						this._isAutoSpinCount--;
						if (this._isAutoSpinCount === 0) {
							this._isAutoSpining = false;
							window.postMessage({ name: LobbyEvent.ENABLE_EXT_WIDGETS }, '*');
						}
					} else {
						window.postMessage({ name: LobbyEvent.ENABLE_EXT_WIDGETS }, '*');
					}

					break;

				case GameEvent.SHOW_MODAL:
					this._closeLobby();
					break;

				default:
				// do nothing
			}
		}

		init() {
			this._createLobby();

			window.addEventListener('message', this._onLobbyHubMessage);
			window.addEventListener('onerror', this._onGlobalError);
			window.addEventListener('resize', this._onResize);
		}

		_onGlobalError(error) {
			console.error('Hub error handler :::' + JSON.stringify(error));
			this._closeLobby();
		}

		sendCommand(command) {
			try {
				this.lobby?.contentWindow?.postMessage(command, '*');
			} catch {
				console.error("Can't send command");
			}
		}

		destroy() {
			window.removeEventListener('message', this._onLobbyHubMessage);
			window.removeEventListener('onerror', this._onGlobalError);
			window.removeEventListener('resize', this._onResize);
		}

		_createLobby() {
			this.lobbyContainer = document.createElement('div');
			this.lobbyContainer.style.display = 'none';
			this.lobbyContainer.style.position = 'absolute';
			this.lobbyContainer.style.zIndex = '999';
			this.lobbyContainer.style.overflow = 'hidden';
			this.lobbyContainer.style.width = '100%';
			this.lobbyContainer.style.height = '100%';

			document.body.appendChild(this.lobbyContainer);

			this.lobby = document.createElement('iframe');
			this.lobby.src = this.lobbyUrl;
			this.lobby.allow = 'clipboard-write';
			this.lobby.width = '100%';
			this.lobby.height = '100%';
			this.lobby.frameBorder = '0';

			this.lobby.style.position = 'absolute';
			this.lobby.style.borderWidth = 0;
			this.lobby.style.top = '0%';
			this.lobby.style.left = '0%';
			this.lobby.style.overflow = 'hidden';

			this.lobbyContainer.appendChild(this.lobby);
		}

		_setup() {
			const options = window.__OPTIONS__;
			this.sendCommand({ name: 'setup', sender: 'hub', params: { options } });
		}

		_openLobby(data = { eventType: 'drop', id: null }) {
			if (this.lobbyContainer) {
				this.lobbyContainer.style.display = 'block';
				const path = data.id ? `/lobby/${data.eventType}/${data.id}` : `/lobby/${data.eventType}`;
				this.sendCommand({ name: 'open', sender: 'hub', params: { path } });
				window.postMessage({ name: LobbyEvent.GAME_UI_OVERLAP, isOverlapped: true }, '*');
			}
		}

		_closeLobby() {
			if (this.lobbyContainer) {
				this.lobbyContainer.style.display = 'none';
				this.sendCommand({ name: 'close', sender: 'hub', params: { path: '/' } });
				window.postMessage({ name: LobbyEvent.GAME_UI_OVERLAP, isOverlapped: false }, '*');
			}
		}

		_onResize() {
			this.isPortrait = window.innerHeight > window.innerWidth;
		}

		_onLobbyHubMessage(event) {
			const cmd = event.data;

			switch (cmd.name) {
				// from lobby window to hub
				case LobbyEvent.READY:
					this._setup();
					break;

				case LobbyEvent.INITED:
					window.postMessage({ name: LobbyEvent.INIT_EXT_WIDGETS }, '*');

					break;

				case LobbyEvent.JOIN_CHALLENGE_INT:
					if (this.lobbyContainer) {
						window.postMessage({ name: LobbyEvent.JOIN_CHALLENGE }, '*');
					}
					break;

				case LobbyEvent.CLOSE_LOBBY:
					if (this.lobbyContainer) {
						this._closeLobby();
					}
					break;

				// from game window to hub
				case LobbyEvent.OPEN_LOBBY:
					if (this.game.currentScene && !this.game.currentScene.flowLocked) {
						this._openLobby(cmd);
					}
					break;

				default:
				// do nothing
			}
		}
	}

	new LobbyHub();
})();
