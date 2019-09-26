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

        when(mockedGitHubApi.getRepo(anyString(), anyString())).thenReturn(mockedRepositoryResponse);

        const githubApi = instance(mockedGitHubApi);

        return githubApi;
    }

    private buildGetRepositoryResponse() {
        const mockedRepositoryResponse = {
            listCommits: async () => {
                return {
                    data: [
                        {
                            commit: {
                                message: 'last commit for test',
                            }
                        }
                    ]
                };
            }
        };

        return mockedRepositoryResponse;
    }
}