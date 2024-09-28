import { setup as setupProfile } from '@/widgets/profile/ProfileFacade';
import { setupAppStore, isOpened } from './AppStore';
import { ref } from 'vue';
import { router } from '@/router';
import { createMessageBroker } from './message/MessageBroker';
// import { SentryErrorType, sentryHelper } from '@/utils/sentryHelper';
import { refreshRoundSeriesId, setupAmplitude } from '@/utils/amplitudeHelper';
import { setup as setupChallenge, isInited as isChallengeInited } from '@/widgets/challenge/ChallengeFacade';
import {
	setup as setupDrop,
	isInited as isDropInited,
	run as runDrop,
	stop as stopDrop
} from '@/widgets/drop/DropFacade';
import { switchLanguage } from '@/i18n';
import { SOCIAL_LOCALE } from '@/constants/global';
import { loadDateLocale } from '@/utils';

export const initApp = () => {
	const messageBroker = createMessageBroker(window.parent, onCmdHandler);

	messageBroker.sendCommand({ name: 'ready', sender: 'lobby' });

	const path = ref('/');

	function onCmdHandler(cmd: { name: string; sender: string; params?: { path: string; options: any } }) {
		if (cmd.name === 'open') {
			const getDetailsHandler = () => {
				if (cmd.params) {
					path.value = cmd.params.path;
					// console.log('open: ' + path.value);
					router.push(path.value);
				}
			};
			runDrop(getDetailsHandler);
			isOpened.value = true;
		}
		if (cmd.name === 'close') {
			stopDrop();
			router.push(`/`);
			isOpened.value = false;
		}
		if (cmd.name === 'setup') {
			setupApp(cmd.params?.options || '');
		}
		if (cmd.name === 'refreshRoundSeriesId') {
			refreshRoundSeriesId();
		}
	}

	function setupApp(options: any) {
		setupAppStore(options);
		switchLanguage(options?.locale);
		loadDateLocale(options?.locale);
		setupAmplitude(options);

		if (options?.locale !== SOCIAL_LOCALE) {
			setupProfile();
		}

		setupDrop(
			{
				websocketUrl: options.websocket_url,
				playerId: options.loyalty_system_options.player_id,
				locale: options.locale,
				playerCurrencyInfo: {
					code: options.currency,
					decimal: options.loyalty_system_options.currency_exponent,
					isSocial: options.locale.indexOf('SOCIAL') != -1
				}
			},
			commandHandler
		);

		setupChallenge(commandHandler);
	}

	function commandHandler(name: string) {
		if (name === 'inited') {
			if (isDropInited.value && isChallengeInited.value) {
				messageBroker.sendCommand({ name, sender: 'lobby' });
			}
		} else {
			messageBroker.sendCommand({ name, sender: 'lobby' });
		}
	}

	function throwError() {
		throw new Error('lobby error');
	}

	window.onerror = function (e) {
		console.error('lobby handler: ' + e);
		// sentryHelper.captureException(SentryErrorType.UNHANDLED_ERROR);
		commandHandler('close_lobby');
	};
};
