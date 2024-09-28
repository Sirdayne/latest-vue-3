//export const createMessageBroker = (_iFrame: HTMLIFrameElement, handler: Function) => {
export const createMessageBroker = (_window: Window | null, handler: Function) => {
	if (_window == null) {
		throw new Error('MessageBroker: iframe is null');
	}

	//let iFrame: HTMLIFrameElement = _iFrame
	const appWindow: Window = _window;

	window.addEventListener('message', (event) => {
		// console.log(event.data);
		handler(event.data);
	});

	function sendCommand(command: { name: string; sender: string; params?: { path: string } }) {
		//console.log('sendCommand: ' + JSON.stringify(command));
		try {
			//iFrame?.contentWindow?.postMessage({ cmd: commandName })
			appWindow?.postMessage(command, '*');
		} catch {
			console.error("MessageBroker can't send command");
		}
	}

	return { sendCommand };
};
