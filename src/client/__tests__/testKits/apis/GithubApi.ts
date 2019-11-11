import GitHub from 'github-api';
import { anyString, instance, mock, when } from 'ts-mockito';

export class GitHubApiTestKit {
  private lastCommitMessage: string;
  private lastCommitUrl: string;

  constructor() {
    this.lastCommitMessage = 'default last commit message';
    this.lastCommitUrl = 'default last commit url';
  }

  public build(): GitHub {
    const mockedGitHubApi = mock(GitHub);

    // Build the mocked response for 'getRepo
    const mockedRepositoryResponse = this.buildGetRepositoryResponse();

    when(mockedGitHubApi.getRepo(anyString(), anyString())).thenReturn(mockedRepositoryResponse);

    const githubApi = instance(mockedGitHubApi);

    return githubApi;
  }

  public withLastCommitMessage(commitMessage: string): this {
    this.lastCommitMessage = commitMessage;
    return this;
  }

  public withLastCommitUrl(commitUrl: string): this {
    this.lastCommitUrl = commitUrl;
    return this;
  }

  /**
   * Used to mimic the response of 'getRepo'
   */
  private buildGetRepositoryResponse() {
    return buildGetRepositoryResponse(this.lastCommitMessage, this.lastCommitUrl);
  }
}

/**
 * Builds the response object for the 'getRepo' function.
 */
export function buildGetRepositoryResponse(lastCommitMessage: string, lastCommitUrl: string) {
  const mockedRepositoryResponse = {
    listCommits: async () => {
      return {
        data: [
          {
            commit: {
              message: lastCommitMessage,
            },
            // eslint-disable-next-line @typescript-eslint/camelcase
            html_url: lastCommitUrl,
          },
        ],
      };
    },
  };

  return mockedRepositoryResponse;
}
