export const createCurrencyFormatter = (aPlayerCurrencyInfo = { code: 'EUR', decimal: 2 }) => {
	let { code, decimal } = aPlayerCurrencyInfo;

	const cut = (num) => {
		let result = Math.fround(num * 100) / 100;
		return new Intl.NumberFormat('en').format(result);
	};

	const formatToLocal = (value) => {
		if (typeof value !== 'number') {
			//sentryHub.captureMessage(SentryErrorType.LS_SERVER_DATA_UNDEFINED + ": local currency");
			return '1 TUGRIC';
		}

		//if (value) {
		//let sum = value;
		// if (decimal > 0) {
		// 	sum /= Math.pow(10, decimal);
		// }

		let result = new Intl.NumberFormat('en', {
			notation: 'standard',
			//minimumFractionDigits: decimal,
			maximumFractionDigits: decimal,
			notation: 'standard',
			useGrouping: true
		}).format(value);
		//}
		return result + ' ' + code.toUpperCase();
	};

	const formatToShort = (value, code) => {
		if (typeof value !== 'number') {
			return ' ';
		}

		var ranges = [
			{ num: 10 ** 9, symbol: 'B', range: 10 ** 9 },
			{ num: 10 ** 6, symbol: 'M', range: 10 ** 6 },
			{ num: 10 ** 3, symbol: 'K', range: 10 ** 5 },
			{ num: 1, symbol: '', range: 0 }
		];

		for (let range of ranges) {
			if (value >= range.range) {
				return cut(value / range.num).toString() + range.symbol + ' ' + code.toUpperCase();
			}
		}

		//sentryHub.captureMessage(SentryErrorType.LS_SERVER_DATA_UNDEFINED + ": fun value: " + value);
		return value.toString() + ' ' + code.toUpperCase();
	};

	const formatToEUR = (value) => {
		//return "99.00"
		let result = '1 EUR';

		if (typeof value !== 'number') {
			sentryHub.captureMessage(SentryErrorType.LS_SERVER_DATA_UNDEFINED + ': currency: value: ' + value);
			return '';
		}

		result = new Intl.NumberFormat('en', {
			//style: 'currency',
			//currencyDisplay: 'code',
			//currency: 'EUR',
			//minimumFractionDigits: 2,
			maximumFractionDigits: 2,
			notation: 'standard',
			useGrouping: true
		}).format(value);

		return result + ' ' + 'EUR';
	};

	return { formatToLocal, formatToEUR, formatToShort };
};
