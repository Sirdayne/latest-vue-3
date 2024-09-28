import { expect, test } from 'vitest';

import { formatToDate } from './DateFormatter';

test('campaing formating', () => {
	//expect(campaignTest(campaign0).id).toBe('c592531f-af96-49a0-a429-f7540169725e');
	let date = formatToDate(1721827660);

	//expect(camp0.id).toBe('c592531f-af96-49a0-a429-f7540169725e');

	expect(date).toEqual('July 24, 2024');
});
