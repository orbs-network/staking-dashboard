import { anyString, instance, mock, when } from 'ts-mockito';
import GitHub from 'github-api';
import { OrbsGitHubService, IOrbsGithubService } from '../../services/OrbsGitHubService';
import { buildGetRepositoryResponse } from '../testKits/apis/GithubApi';
import { IGitHubCommitGist } from '../../../shared/IStoreTypes';

const TEST_CONSTANTS = {
  repoOwner: 'orbs-network',
  repoName: 'orbs-network-go',
};

describe('Orbs-GitHub service functionality', () => {
  let mockedGitHubApi: GitHub;

  // Initialize a new mock
  beforeEach(() => {
    mockedGitHubApi = mock(GitHub);
  });

  it('Should extract the last commit message properly', async () => {
    const expectedLastCommitText = 'This is the latest commit';
    const expectedLastCommitUrl = 'https://github.com/stam';

    // Build the mocked response
    const mockedGetRepoResponse = buildGetRepositoryResponse(expectedLastCommitText, expectedLastCommitUrl);

    // Assign the mocked value for 'getRepo'
    when(mockedGitHubApi.getRepo(anyString(), anyString())).thenReturn(mockedGetRepoResponse);

    const gitHubService = buildWithMocks(mockedGitHubApi);

    const lastCommitGist = await gitHubService.getRepoLastCommitGist();

    // We expect the returned value to be in the proper form + have the proper value
    const expectedCommitGist: IGitHubCommitGist = {
      commitText: expectedLastCommitText,
      commitUrl: expectedLastCommitUrl,
    };

    expect(lastCommitGist).toStrictEqual(expectedCommitGist);
  });
});

function buildWithMocks(mockedGithubApi: GitHub): IOrbsGithubService {
  const githubApi = instance(mockedGithubApi);

  const githubService: IOrbsGithubService = new OrbsGitHubService(githubApi, {
    repoOwner: TEST_CONSTANTS.repoOwner,
    repoName: TEST_CONSTANTS.repoName,
  });

  return githubService;
}
