import {instance, mock, verify, when, anyString} from 'ts-mockito';
import {IGithubService} from '../../services/gitHubService';
import {SocialStore} from '../../store/SocialStore';

describe('Social store functionality', () => {
    it('Init works properly', async () => {
        const mockedGithubService = mock<IGithubService>();

        // Mock the service
        when(mockedGithubService.getRepoLastCommitGist(anyString(), anyString())).thenResolve({ message: 'lastCommit'});

        const gitHubServiceInstance = instance(mockedGithubService);

        const socialStore: SocialStore = new SocialStore(gitHubServiceInstance);

        // The tested function
        await socialStore.init();

        // TOOD : FUTURE: O.L : make app constants injectable.
        verify(mockedGithubService.getRepoLastCommitGist('orbs-network', 'orbs-network-go')).called();

        expect(socialStore.latestCommit).toBe('lastCommit');
    });
});