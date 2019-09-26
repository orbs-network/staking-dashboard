import GitHub from 'github-api';
import {anyString, instance, mock, when} from 'ts-mockito';
import {IApiTestClass} from './IApiTestClass';

export class GitHubApiTestKit implements IApiTestClass<GitHub> {
    private lastCommitMessage: string;

    constructor() {
        this.lastCommitMessage = 'default last commit message';
    }

    public buildMockedInstance(): GitHub {
        const mockedGitHubApi = mock(GitHub);

        // Build the mocked response for 'getRepo
        const mockedRepositoryResponse = this.buildGetRepositoryResponse();

        // @ts-ignore (no types for library)
        when(mockedGitHubApi.getRepo(anyString(), anyString())).thenReturn(mockedRepositoryResponse);

        const githubApi = instance(mockedGitHubApi);

        return githubApi;
    }

    public withLasCommitMessage(commitMessage: string) {
        this.lastCommitMessage = commitMessage;
    }

    /**
     * Used to mimic the response of 'getRepo'
     */
    private buildGetRepositoryResponse() {
        return buildGetRepositoryResponse(this.lastCommitMessage);
    }
}

export function buildGetRepositoryResponse(lastCommitMessage: string) {
    const mockedRepositoryResponse = {
        listCommits: async () => {
            return {
                data: [
                    {
                        commit: {
                            message: lastCommitMessage,
                        }
                    }
                ]
            };
        }
    };

    return mockedRepositoryResponse;
}