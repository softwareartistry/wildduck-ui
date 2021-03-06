/**
 * @author Chirag <chirag.kushwaha@314ecorp.com>
 * @description React hook useUpdateFilter
 */

import { useMutation } from 'react-query';

import api from 'client/RequestClient';
import AppEvents, { Events } from 'app-ui/utils/AppEvents';
import { CreateFilterRequest } from 'client/wildduck-api';
import handleError from 'app-ui/utils/handleError';

/**
 * useUpdateFilter
 */
const useUpdateFilter = () => {
	return useMutation(
		({
			userId,
			filterId,
			filterDetails,
		}: {
			userId: string;
			filterId: string;
			filterDetails: CreateFilterRequest;
		}) => api.filtersApi.updateFilter(userId, filterId, filterDetails),
		{
			onError: () => {
				AppEvents.publish(Events.Error, 'Error');
			},
			onSuccess: ({ data }) => {
				handleError(data);
			},
		},
	);
};

export default useUpdateFilter;
