import { initConsumer } from './SocketHelper';

// import { sentryHub, SentryErrorType } from "Utils/sentryHelper";

export function createDropService(
	handler: Function,
	errorHander: Function,
	aUrl: string = '',
	connectedHandler: Function
) {
	let requestId = 0;
	let onUpdate = handler;
	let onError = errorHander;

	let createConsumer: any;
	let sender: any;
	let socketUrl: any;
	let socket: any;
	let url = aUrl;

	let isDropWebsocketActive: boolean = false;

	let reconnectTimeout = 5000;

	initConsumer(onConsumerReady);

	function onConsumerReady(aConsumer: any) {
		createConsumer = aConsumer;
		socketUrl = url;
		start();
	}

	function connect() {
		isDropWebsocketActive = true;
		startDebug();
	}

	function disconnect(isPlanned: boolean) {
		if (isPlanned) {
			isDropWebsocketActive = false;
		}
		closeSocket();
	}

	function start() {
		// console.log('DROP SERVICE | starting socket .............!');
		try {
			closeSocket();
			socket = createConsumer(socketUrl);
			socket.subscriptions.create('LoyaltySystem::LobbyChannel', {
				connected() {
					// console.log('DROP SERVICE | connect socket .............!');
					sender = this;
					connectedHandler();
				},
				disconnected: disconnectHandler,
				rejected: errorHandler,
				received: dataHandler
			});
		} catch (e) {
			console.error('Error socket connection ' + socketUrl);
		}
	}

	function closeSocket() {
		if (socket) {
			socket.disconnect();
			socket = null;
		}
	}

	function subscribeToLobbyCampaign(id: string) {
		try {
			send('subscribe_to_campaign', { campaign_id: id });
		} catch (e) {
			console.error('Server| subscribe_to_campaign: ' + e);
			//sentryHub.captureException(SentryErrorType.LS_SERVER_ERROR + ": on send subscribe_to_campaign:" + JSON.stringify(e));
		}
	}

	function getLobbyCampaignDetail(id: string) {
		try {
			send('campaign_data', { campaign_id: id });
		} catch (e) {
			console.error('Server| lobby_campaign_data: ' + e);
			//sentryHub.captureException(SentryErrorType.LS_SERVER_ERROR + ": on send subscribe_to_campaign:" + JSON.stringify(e));
		}
	}

	function subscribeToCampaingList() {
		// console.log('DROP SERVICE | subscribeToCampaingList');
		try {
			//list_lobby_campaigns
			send('list_campaigns');
		} catch (e) {
			console.error('Server| list_lobby_campaigns: ' + e);
			//sentryHub.captureException(SentryErrorType.LS_SERVER_ERROR + ": on send subscribe_to_campaign:" + JSON.stringify(e));
		}
	}

	function showSocketError(error = 'websocket error') {
		console.error(error);
		//sentryHub.captureException(SentryErrorType.LS_SERVER_ERROR + ': ' + JSON.stringify(error));
	}

	function disconnectHandler(msg = 'websocket disconnect') {
		// console.info('disconnect');
		//sentryHub.captureException(SentryErrorType.LS_SERVER_SOCKTED_DISCONNECTED + ': ' + JSON.stringify(msg));
		if (isDropWebsocketActive) {
			reconnect();
		}
	}

	function reconnect() {
		setTimeout(() => {
			start();
		}, reconnectTimeout);
	}

	function errorHandler(error: any) {
		if (socket) {
			closeSocket();
			showSocketError(error);
		}
		console.error('socket error: ' + error);
		//set app status Error
		onError();
	}

	function send(action: any, data: any = {}) {
		requestId++;
		data && (data.request_id = requestId);
		sender && sender.perform(action, data);
		return requestId;
	}

	function dataHandler(data: any) {
		try {
			//console.log('DropService dataHandler: ');
			//console.log(data);

			if (!socket) {
				closeSocket();
				return;
			}

			// const parsedData = typeof data === 'string' || data instanceof String ? JSON.parse(data as string) : data;

			// if (parsedData.error) {
			// 	showSocketError(parsedData.error);
			// 	closeSocket();
			// } else {
			updateState(data);
			//			}
		} catch (e) {
			console.log('Error: socket dataHandler: ' + e);
		}
	}

	function updateState(parsedData: any) {
		//sentryHub.addBreadcrumb("socket", parsedData)
		onUpdate(parsedData);
	}

	function startDebug() {
		if (process.env.NODE_ENV !== 'development') return;

		//onUpdate({ externalWinInfo: { win: 77, playerId: 'KDa***' } })
		// let winCount = 0
		// const interval = setInterval(() => {
		//     winCount++;
		//     let newWin = { userWinInfo: { win: winCount * 5000, winLocal: winCount * 900000 } }

		//     onUpdate(newWin)
		//     if (winCount > 2) {
		//         clearInterval(interval)
		//     }

		// }, 4000)

		window.addEventListener('keydown', (e) => {
			if (e.code === 'KeyJ') {
				//that.send('fetch_menu');
				//onUpdate(fetchMenu);
				//onUpdate(fetchMenu1)
			}
			if (e.code === 'KeyA') {
				//that.send('fetch_menu');
				//onUpdate(fetchMenuAuto);
				//onUpdate(fetchMenu1)
			}

			if (e.code === 'KeyL') {
				console.log('keyL send userWinInfo ');

				onUpdate({ userWinInfo: { win: 0.99, winLocal: 9.99 } });
			}

			if (e.code === 'KeyE') {
				onUpdate({ externalWinInfo: { win: 1, playerId: 'KDa***' } });
			}

			if (e.code === 'KeyM') {
				//onUpdate(fetchMenuManual);
			}

			if (e.code === 'KeyS') {
				//onUpdate(fetchMenuSocial);
			}

			if (e.code === 'KeyF') {
				console.log('keyF send archived ');
				//onUpdate(fmArchived);
			}
		});
	}

	// function run() {
	// 	let winCount = 0;

	// 	const interval = setInterval(() => {
	// 		winCount++;
	// 		let newWin = { userWinInfo: { win: 999, winLocal: 100000, isShowed: false } };

	// 		onUpdate(newWin);

	// 		onUpdate(newWin);
	// 		if (winCount > 3) {
	// 			clearInterval(interval);
	// 		}
	// 	}, 1000);
	// }
	return {
		connect,
		subscribeToLobbyCampaign,
		getLobbyCampaignDetail,
		subscribeToCampaingList,
		disconnect
	};
}
