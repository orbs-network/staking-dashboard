import { instance, mock, verify, when, anyString } from 'ts-mockito';
import { IOrbsGithubService } from '../../services/OrbsGitHubService';
import { SocialStore } from '../../store/SocialStore';
import { ISocialStoreState } from '../../../shared/IStore';
import { IGitHubCommitGist } from '../../../shared/IStoreTypes';

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
      latestCommitGist: {
        commitText: 'latestCommit',
        commitUrl: '',
      },
      latestTweetGist: {
        tweetText: 'latestTweet',
        tweetUrl: '',
      },
    };

    // Get store instance
    const socialStore: SocialStore = new SocialStore(mockedGithubService, hydratingState);

    // Ensure state is equal to hydrating state
    expect(socialStore.recentUpdate).toBe(hydratingState.recentUpdate);
    expect(socialStore.latestCommitGist).toStrictEqual(hydratingState.latestCommitGist);
    expect(socialStore.latestTweetGist).toStrictEqual(hydratingState.latestTweetGist);
  });

  it('Init works properly', async () => {
    const commitText = 'lastCommit';
    const commitUrl = 'https:github.com';

    const expectedCommitGist: IGitHubCommitGist = {
      commitText,
      commitUrl,
    };

    // Mock the service
    when(mockedGithubService.getRepoLastCommitGist()).thenResolve(expectedCommitGist);

    // Get store instance
    const socialStore = buildWithMocks(mockedGithubService);

    // The tested function
    await socialStore.init();

    // We expect the service to be called in order to get the latest commit gist.
    verify(mockedGithubService.getRepoLastCommitGist()).called();

    // We expect returned value to be assigned properly
    expect(socialStore.latestCommitGist).toStrictEqual(expectedCommitGist);
  });
});

function buildWithMocks(mockedGithubService: IOrbsGithubService): SocialStore {
  const gitHubServiceInstance = instance(mockedGithubService);

  const socialStore: SocialStore = new SocialStore(gitHubServiceInstance);

  return socialStore;
}
