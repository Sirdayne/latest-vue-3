import { createMemoryHistory, createRouter } from 'vue-router';
import { AllIconsPage } from '@/components/icons';
import DropPage from '@/pages/drop/DropPage.vue';
import ChallengePage from '@/pages/challenge/ChallengePage.vue';
import ChallengeLeaderboardPage from '@/widgets/challenge/challenge-details/ChallengeLeaderboardPage.vue';
import ChallengeDetails from '@/widgets/challenge/challenge-details/ChallengeDetails.vue';
import DropDetails from '@/widgets/drop/drop-details/DropDetails.vue';
import ProfilePage from './pages/profile/ProfilePage.vue';
import GamePage from './pages/games/GamePage.vue';
import { EmptyEventDetails } from '@/components/app';

const routes = [
	{
		path: '/lobby/drop',
		component: DropPage,
		children: [
			{
				path: '',
				component: DropDetails
			},
			{
				path: ':id',
				component: DropDetails
			}
		]
	},
	{
		path: '/lobby/challenge',
		component: ChallengePage,
		children: [
			{
				path: '',
				component: EmptyEventDetails
			},
			{
				path: ':id',
				component: ChallengeDetails
			},
			{
				path: ':id/leaderboard',
				component: ChallengeLeaderboardPage
			}
		]
	},
	{
		path: '/lobby/games',
		component: GamePage
	},
	{
		path: '/lobby/profile',
		component: ProfilePage
		// component: AllIconsPage
	}
];

export const router = createRouter({
	history: createMemoryHistory(),
	routes
});
