import { anyString, instance, mock, when } from 'ts-mockito';
import { IOrbsTwitterService, OrbsTwitterService } from '../../services/orbsTwitterService';
import Twitter from 'twitter';

describe('Orbs-Twitter service (server) functionality', () => {
  let mockedGitHubApi: Twitter;

  // Initialize a new mock
  beforeEach(() => {
    mockedGitHubApi = mock(Twitter);
  });

  it('Should extract the last commit message properly', async () => {});

  // it('Should extract the last commit message properly', async () => {
  //   const expectedLastCommitText = 'This is the latest commit';
  //   const expectedLastCommitUrl = 'https://github.com/stam';
  //
  //   // Build the mocked response
  //   const mockedGetRepoResponse = buildGetRepositoryResponse(expectedLastCommitText, expectedLastCommitUrl);
  //
  //   // Assign the mocked value for 'getRepo'
  //   when(mockedGitHubApi.getRepo(anyString(), anyString())).thenReturn(mockedGetRepoResponse);
  //
  //   const gitHubService = buildWithMocks(mockedGitHubApi);
  //
  //   const lastCommitGist = await gitHubService.getRepoLastCommitGist();
  //
  //   // We expect the returned value to be in the proper form + have the proper value
  //   const expectedCommitGist: IGitHubCommitGist = {
  //     commitText: expectedLastCommitText,
  //     commitUrl: expectedLastCommitUrl,
  //   };
  //
  //   expect(lastCommitGist).toStrictEqual(expectedCommitGist);
  // });
});

/**
 * Builds an instance of the service with mocked dependencies
 */
function buildWithMocks(mockedTwitterClient: Twitter): IOrbsTwitterService {
  const twitterClient = instance(mockedTwitterClient);

  const githubService: IOrbsTwitterService = new OrbsTwitterService(twitterClient, 'screenName');

  return githubService;
}
