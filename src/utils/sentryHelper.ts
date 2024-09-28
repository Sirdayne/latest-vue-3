import * as Sentry from '@sentry/browser';

function createSentryHelper() {
	//hub

	//let serverId = 'devdemo'
	const DEV_SENTRY_DSN = 'https://88777cb675fa4d2a8c8b106539b5d1fc@sentry.bgaming-system.com/25';

	Sentry.init({
		dsn: DEV_SENTRY_DSN,
		release: 'lobby@0.0.1',
		integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration(), Sentry.breadcrumbsIntegration()],
		tracesSampleRate: 1.0,
		tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],
		replaysSessionSampleRate: 0.1,
		replaysOnErrorSampleRate: 1.0
	});

	function captureException(msg: any) {
		Sentry.captureException(msg);
	}

	function captureMessage(msg: any) {
		Sentry.captureMessage(msg);
	}

	return { captureException, captureMessage };
}

export const SentryErrorType = {
	UNHANDLED_ERROR: 'UNHANDLED ERROR',
	UI_ERROR: 'UI Error',
	OPTIONS_UNDEFINED: 'OPTIONS NOT EXIST',
	OPTIONS_ERROR: 'OPTIONS ERROR',
	LOAD_RESOURCE_ERROR: 'LOAD RESOURCE ERROR',
	LS_SERVER_SOCKTED_DISCONNECTED: 'LS_SERVER_SOCKTED_DISCONNECTED',
	LS_SERVER_ERROR: 'LS SERVER ERROR',
	LS_SERVER_DATA_UNDEFINED: 'LS SERVER DATA NOT EXIST',
	LS_SERVER_DATA_ERROR: 'LS_SERVER_DATA_ERROR'
};

// export const sentryHelper = createSentryHelper();
