export const amplitude = {
	player_id: null,
	refreshRoundSeriesId: false
};

export const setupAmplitude = (options: any) => {
	amplitude.player_id = options.loyalty_system_options.player_id;
	decorateFetchAmplitude();
};

export const refreshRoundSeriesId = () => {
	amplitude.refreshRoundSeriesId = true;
};

const resetRoundSeriesId = () => {
	amplitude.refreshRoundSeriesId = false;
};

const generateRoundSeriesId = () => {
	const current_timestamp = new Date().getTime();
	window.extraData = { round_series_id: `${current_timestamp}_${amplitude.player_id}` };
};

const decorateFetchAmplitude = () => {
	generateRoundSeriesId();
	const originalFetch = fetch;
	window.fetch = async (input, init = {}) => {
		if (amplitude.refreshRoundSeriesId) {
			generateRoundSeriesId();
			resetRoundSeriesId();
		}
		let url = typeof input === 'string' ? input : input.url;
		if (!init.method || init.method === 'GET') {
			const urlObj = new URL(url);
			urlObj.searchParams.append(
				'extra_data',
				JSON.stringify({ round_series_id: window.extraData.round_series_id })
			);
			url = urlObj.toString();
		}
		if (init.method === 'POST') {
			let body = init.body ? JSON.parse(init.body) : {};
			body.extra_data = { round_series_id: window.extraData.round_series_id };
			init.body = JSON.stringify(body);
		}
		return originalFetch(url, init);
	};
};
