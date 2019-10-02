import { instance, mock, verify, when, anyString } from 'ts-mockito';
import { IGithubService } from '../../services/gitHubService';
import { SocialStore } from '../../store/SocialStore';
import { ISocialStoreState } from '../../../shared/IStore';

describe('Social store functionality', () => {
  let mockedGithubService = mock<IGithubService>();

  // Initialize a new mock
  beforeEach(() => {
    mockedGithubService = mock<IGithubService>();
  });

  // TODO : FUTURE : Add tests for default values.

  it('Constructs properly', () => {
    const hydratingState: ISocialStoreState = {
      recentUpdate: 'recentUpdate',
      latestCommit: 'latestCommit',
      latestTweet: 'latestTweet',
    };

    // Get store instance
    const socialStore: SocialStore = new SocialStore(mockedGithubService, hydratingState);

    // Ensure state is equal to hydrating state
    expect(socialStore.recentUpdate).toBe(hydratingState.recentUpdate);
    expect(socialStore.latestCommit).toBe(hydratingState.latestCommit);
    expect(socialStore.latestTweet).toBe(hydratingState.latestTweet);
  });

  it('Init works properly', async () => {
    // Mock the service
    when(mockedGithubService.getRepoLastCommitGist(anyString(), anyString())).thenResolve({ message: 'lastCommit' });

    // Get store instance
    const socialStore = buildWithMocks(mockedGithubService);

    // The tested function
    await socialStore.init();

    // TOOD : FUTURE: O.L : make app constants injectable.
    verify(mockedGithubService.getRepoLastCommitGist('orbs-network', 'orbs-network-go')).called();

    expect(socialStore.latestCommit).toBe('lastCommit');
  });
});

function buildWithMocks(mockedGithubService: IGithubService): SocialStore {
  const gitHubServiceInstance = instance(mockedGithubService);

  const socialStore: SocialStore = new SocialStore(gitHubServiceInstance);

  return socialStore;
}
