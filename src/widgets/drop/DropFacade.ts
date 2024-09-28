import { reactive, computed, ref } from 'vue';
import { createDropService } from './DropService';
import {
	DropCampaignStatus,
	type Campaign,
	type DropData,
	type DropParams,
	type DropState,
	type Drops
} from './DropModel';
import { createCampaignFormatter } from './utils/CampaignFormatter';
import { APP_STORE } from '@/core/AppStore';

let campaignFormatter: any;
let params: DropParams;

let sendCommand: (name: string) => void;

export const isRunning = ref(false);
export const isInited = ref(false);

export function setup(aParams: DropParams, handler: (name: string) => void) {
	params = aParams;
	sendCommand = handler;

	isSocial.value = params.playerCurrencyInfo.isSocial || false;
	if (isSocial.value) {
		isShowLocal.value = false;
	} else {
		isShowLocal.value = params.playerCurrencyInfo.code !== 'EUR';
	}

	campaignFormatter = createCampaignFormatter(params.playerCurrencyInfo);

	if (!isInited.value) {
		isInited.value = true;
		sendCommand('inited');
	}
}

export type { Campaign, Prize, Currency } from './DropModel';
export const activeDrop = reactive({});

export let campaigns: Campaign[] = reactive([]);

let service: any = null;
let afterConnectHandler: any = null;

export function run(getDetailsHandler: Function) {
	//let websocket_url = APP_STORE.websocket_url;
	let websocket_url = params.websocketUrl;
	afterConnectHandler = getDetailsHandler;

	if (!websocket_url) {
		websocket_url =
			'wss://games-bggr-1895-lobby-endpoints.stg.bgaming-system.com:443/cable?currency=USD\u0026identifier=DiamondOfJungle\u0026play_token=ce83dd7f-7b27-48d2-967e-c5c2b5ac9152\u0026server_id=devdemo';
	}

	if (!service) {
		service = createDropService(onDataUpdate, onDataError, websocket_url, connectedHandler);
		//service = createDropDebugService(onDataUpdate, onDataError, websocket_url, connectedHandler);
		service.connect();
	}
}

export function stop() {
	if (!isRunning.value) return;
	if (service) {
		selectCampaign('');
		service.disconnect(true);
		service = null;
	}
	isRunning.value = false;
}

function connectedHandler() {
	if (isRunning.value) return;

	service.subscribeToCampaingList();
}

function onDataUpdate(data: any) {
	// console.log(data);

	//campaings.push(...data["campaings"]as any );
	try {
		if (data.hasOwnProperty('campaigns')) {
			updateCampaigns(data.campaigns);
		}

		if (data.hasOwnProperty('campaign')) {
			updateCampaignStatus(data.campaign);
		}
	} catch (e) {
		console.error('DropFacade | onDataUpdate Error');
		console.error(e);
	}
}

function updateCampaigns(aCampaigns: Campaign[]) {
	campaigns.length = 0;

	aCampaigns.forEach((camp) => {
		let formattedCamp = camp;

		formattedCamp = campaignFormatter.formatFull(camp);
		campaigns.push(formattedCamp);
		upsertDrop(`${formattedCamp.id}`, { status: formattedCamp.status });
	});

	if (!isRunning.value) {
		isRunning.value = true;
		afterConnectHandler();
	}
}

export const getFirstCampaignId = computed(() => {
	return activeCampaigns?.value[0]?.id || archiveCampaigns?.value[0]?.id;
});

function updateCampaignStatus(aCampaign: Campaign) {
	let existedCamp = campaigns.find((value) => value.id === aCampaign.id);

	if (existedCamp) {
		let formattedCamp = campaignFormatter.formatFull(aCampaign);
		if (formattedCamp) {
			const existedCampStatus = existedCamp.status;
			Object.assign(existedCamp, formattedCamp);
			upsertDrop(`${formattedCamp.id}`, { status: formattedCamp.status || existedCampStatus });
		}
	} else {
		console.info('Campaing not exist in campaing list');
		//campaigns.push(aCampaign);
	}
}

//it is private instad use selectedCampaign
let selectedCampaignId = ref('');

export const selectedCampaign = computed(() => {
	let existedCamp = campaigns.find((value) => value.id === selectedCampaignId.value);
	return existedCamp;
});

function onDataError(error: any) {
	console.error('DropFacade | onDataError: ' + error);
}

export const isSocial = ref(false);
export const isShowLocal = ref(true);

//TODO watch router

export function selectCampaign(id: string | undefined) {
	// console.log('Drop Facade | selectCampaing:' + id);
	if (!isRunning.value) return;
	if (id === selectedCampaignId.value) return;
	selectedCampaignId.value = id || '';
	//router.push(`/lobby/drop/${id}`);
	if (service && id) {
		service.getLobbyCampaignDetail(id);
	}
}

export function sendJoinToCampaign(id: string | undefined) {
	if (!id) {
		console.error('DropFacade | subscribeToCampaign id is undefined');
		return;
	}

	service.subscribeToLobbyCampaign(id);
}

export const activeCampaigns = computed(() => {
	let ongoingCamp = campaigns
		.filter(
			(item) => item.status === DropCampaignStatus.Ongoing && item.gameIdentifiers.includes(APP_STORE?.identifier)
		)
		.sort((a: Campaign, z: Campaign) => a.endAt.timestamp - z.endAt.timestamp);

	let promotingCamp = campaigns
		.filter(
			(item) =>
				item.status === DropCampaignStatus.Promoting && item.gameIdentifiers.includes(APP_STORE?.identifier)
		)
		.sort((a: Campaign, z: Campaign) => a.startAt.timestamp - z.startAt.timestamp);

	return [...ongoingCamp, ...promotingCamp];
});

export const archiveCampaigns = computed(() => {
	return campaigns
		.filter(
			(item) =>
				item.status === DropCampaignStatus.Archived && item.gameIdentifiers.includes(APP_STORE?.identifier)
		)
		.sort((a: Campaign, z: Campaign) => z.endAt.timestamp - a.endAt.timestamp)
		.slice(0, 10);
});

export const dropState = reactive<DropState>({
	drops: {} as Drops
});

export const upsertDrop = (id: string, drop: DropData) => {
	dropState.drops[id] = drop;
};

export const closeLobby = () => {
	sendCommand('close_lobby');
};
