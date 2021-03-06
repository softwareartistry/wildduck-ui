/**
 * @author Chirag <chirag.kushwaha@314ecorp.com>
 * @description React hook useRenameDomain
 */

import { useMutation, useQueryClient } from 'react-query';

import api from 'client/RequestClient';
import AppEvents, { Events } from 'app-ui/utils/AppEvents';
import { RenameDomainRequest } from 'client/wildduck-api';

/**
 * useRenameDomain
 */
const useRenameDomain = () => {
	const queryClient = useQueryClient();

	return useMutation((newDomain: RenameDomainRequest) => api.addressApi.renameDomain(newDomain), {
		onError: () => {
			AppEvents.publish(Events.Error, 'Error');
		},
		onSuccess: () => {
			AppEvents.publish(Events.Success, 'Success');
			queryClient.invalidateQueries('useForwardedAddress');
		},
	});
};

export default useRenameDomain;
