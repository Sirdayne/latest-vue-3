export function initConsumer(onConsumerReady) {
	let createConsumer;
	let timerId;
	function checkActionCable() {
		if (window.ActionCable) {
			createConsumer = window.ActionCable.createConsumer.bind(window.ActionCable);
			onConsumerReady(createConsumer);
			if (timerId) clearTimeout(timerId);
		} else {
			timerId = setTimeout(() => checkActionCable(), 300);
		}
	}

	checkActionCable();
}
