import { instance, mock, verify, when, anyString } from 'ts-mockito';
import { IOrbsGithubService } from '../../services/OrbsGitHubService';
import { SocialStore } from '../../store/SocialStore';
import { ISocialStoreState } from '../../../shared/IStore';

describe('Social store functionality', () => {
  let mockedGithubService = mock<IOrbsGithubService>();

  // Initialize a new mock
  beforeEach(() => {
    mockedGithubService = mock<IOrbsGithubService>();
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
    when(mockedGithubService.getRepoLastCommitGist()).thenResolve({ message: 'lastCommit' });

    // Get store instance
    const socialStore = buildWithMocks(mockedGithubService);

    // The tested function
    await socialStore.init();

    // We expect the service to be called in order to get the latest commit gist.
    verify(mockedGithubService.getRepoLastCommitGist()).called();

    // We expect returned value to be assigned properly
    expect(socialStore.latestCommit).toBe('lastCommit');
  });
});

function buildWithMocks(mockedGithubService: IOrbsGithubService): SocialStore {
  const gitHubServiceInstance = instance(mockedGithubService);

  const socialStore: SocialStore = new SocialStore(gitHubServiceInstance);

  return socialStore;
}
