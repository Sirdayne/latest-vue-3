import { ref } from 'vue';

export interface Skin {
	isReady: boolean;
	id?: string;
	url?: string;
	publicName?: string;
	skinHeaderImage?: string;
	title?: string;
	generalInformationBlockLeftIcon?: string;
	generalInformationBlockRightIcon?: string;
	bCoinsWonBlockIcon?: string;
	bCoinsValueBlockIcon?: string;
	rulesBlockIcon?: string;
	luckyBCoinsMinersBlockIcon?: string;
	skinWidgetPrimaryButtonColor?: string;
	skinWidgetPrimaryButtonHoverColor?: string;
	skinWidgetPrimaryButtonTextColor?: string;
	skinWidgetSecondaryButtonColor?: string;
	skinWidgetSecondaryButtonHoverColor?: string;
	skinWidgetSecondaryButtonTextColor?: string;
	bCoinsWonBackgroundColor?: string;
	winWidgetBackgroundImage?: string;
	winWidgetColor?: string;
	winWidgetIcon?: string;
	winWidgetIconPosition?: string;
	winWidgetTitle?: string;
	winWidgetInfoAnimation?: string;
	winWidgetAnimation?: string;
	winWidgetButtonColor?: string;
	winWidgetButtonHoverColor?: string;
	winWidgetButtonTextColor?: string;
	winWidgetInfoAnimationFrames?: number;
	winWidgetImg?: string;
	winWidgetFooter?: string;
	winWidgetFooterColor?: string;
	status?: string;
	user?: string;
	creationDate?: string;
	editDate?: string;
}

function createSkinManager() {
	const cacheSkinInfoList: any = {};

	const loadSkinInfo = async (skinName: string = 'default') => {
		const skinUrl = `${import.meta.env.VITE_APP_SKINS_PATH}/${skinName}/skin.json`;
		try {
			let result = await fetch(skinUrl);
			let skin = await result.json();

			skin.url = `${import.meta.env.VITE_APP_SKINS_PATH}/${skinName}`;
			skin.isReady = true;
			Object.assign(cacheSkinInfoList[skinName].value, skin);
			// console.info(skinName);
			// console.table(cacheSkinInfoList);
		} catch (e) {
			console.error("can't load skin.json for " + skinUrl);
			console.error(e);
			return defaultSkin;
		}
	};

	const getSkinInfo = (skinName: string = 'default') => {
		//console.info('SkinManager | getSkinInfo ');
		if (!cacheSkinInfoList[skinName]) {
			cacheSkinInfoList[skinName] = ref({
				isReady: false,
				id: '666'
			});

			loadSkinInfo(skinName);
		}
		return cacheSkinInfoList[skinName];
	};

	return { getSkinInfo };
}

export const skinManager = createSkinManager();

export const defaultSkin = {
	isReady: true,
	id: '1',
	url: 'https://static-loyalty-system-r2.bgaming-network.com/loyalty-system-fe/skins/default',
	publicName: 'Spring Fortune Drops',
	skinHeaderImage: 'header.png',
	title: 'Spring Fortune Drops',
	generalInformationBlockLeftIcon: 'icon_1_clever.png',
	generalInformationBlockRightIcon: 'icon_2_flower.png',
	bCoinsWonBlockIcon: 'icon_3_flower.png',
	bCoinsValueBlockIcon: 'icon_4_flower.png',
	rulesBlockIcon: 'icon_5_star.png',
	luckyBCoinsMinersBlockIcon: 'icon_6_pot.png',

	skinWidgetPrimaryButtonColor: 'rgba(0, 122, 255, 1)',
	skinWidgetPrimaryButtonHoverColor: 'rgba(0, 122, 255, 0.7)',
	skinWidgetPrimaryButtonTextColor: '#FFFFFF',
	skinWidgetSecondaryButtonColor: 'rgba(28, 28, 30, 1)',
	skinWidgetSecondaryButtonHoverColor: 'rgba(28, 28, 30, 0.7)',
	skinWidgetSecondaryButtonTextColor: 'rgba(0, 122, 255, 1)',
	bCoinsWonBackgroundColor: 'rgba(194, 229, 91, 1)',

	winWidgetBackgroundImage: 'bg.png',
	winWidgetColor: '#fff',
	winWidgetIcon: '',
	winWidgetIconPosition: '',
	winWidgetTitle: 'Spring Fortune Drops',
	winWidgetInfoAnimation: 'pots_animation.png',
	winWidgetAnimation: '',
	winWidgetButtonColor: 'linear-gradient(rgba(42, 144, 255, 1) 0%, rgba(0, 113, 237, 1) 100%)',
	winWidgetButtonHoverColor: '#ffffff',
	winWidgetButtonTextColor: '#fff',

	winWidgetInfoAnimationFrames: 34,
	winWidgetImg: 'pots.png',
	winWidgetFooter: 'footer.png',
	winWidgetFooterColor: '#000',

	status: 'Active',
	user: 'User Login',
	creationDate: '2024-01-21T12:00:00',
	editDate: '2024-01-24T15:00:00'
};
