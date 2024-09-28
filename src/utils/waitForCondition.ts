export async function waitForCondition(conditionFunction: () => boolean, checkInterval = 100) {
	return new Promise((resolve) => {
		const interval = setInterval(() => {
			if (conditionFunction()) {
				clearInterval(interval);
				resolve(true);
			}
		}, checkInterval);
	});
}
