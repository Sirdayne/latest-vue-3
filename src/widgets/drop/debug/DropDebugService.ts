import { campaign1, campaign_list } from '../utils/CampaignMock';

// import { sentryHub, SentryErrorType } from "Utils/sentryHelper";

export function createDropDebugService(
	handler: Function,
	errorHander: Function,
	aUrl: string = '',
	connectedHandler: Function
) {
	let timerId: any;
	let requestId = 0;
	let onUpdate = handler;
	//let onError = errorHander;

	let createConsumer: any;
	let sender: any;
	let socketUrl: any;
	let socket: any;
	let url = aUrl;

	let reconnectTimeout = 5000;

	//connect();

	function connect() {
		startDebug();
		start();
	}

	function start() {
		console.log('DROP SERVICE | starting socket .............!');

		connectedHandler();
		//dataHandler
	}

	function subscribeToLobbyCampaign(id: string) {
		try {
			//send('subscribe_to_campaign', { campaign_id: id });
			setTimeout(() => dataHandler(campaign1), 1000);
		} catch (e) {
			console.error('Server| subscribe_to_campaign: ' + e);
		}
	}

	function getLobbyCampaignDetail(id: string) {
		try {
			//send('campaign_data', { campaign_id: id });
		} catch (e) {
			console.error('Server| lobby_campaign_data: ' + e);
			//sentryHub.captureException(SentryErrorType.LS_SERVER_ERROR + ": on send subscribe_to_campaign:" + JSON.stringify(e));
		}
	}

	function subscribeToCampaingList() {
		console.log('DROP SERVICE | subscribeToCampaingList');
		dataHandler(campaign_list);
		//setTimeout(() => dataHandler(campaign_list), 1000);
	}

	function dataHandler(data: any) {
		try {
			//console.log('DropService dataHandler: ');
			//console.log(data);

			onUpdate(data);
		} catch (e) {
			console.log('Error: socket dataHandler: ' + e);
		}
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
		subscribeToCampaingList
	};
}
