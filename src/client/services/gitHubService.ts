import GitHub from 'github-api';

export interface IGithubService {
    /**
     * Returns the gist of the latest commit for the given owner/repo.
     */
    getRepoLastCommitGist(owner: string, repo: string): Promise<{ message: string }>;
}

export class GitHubService implements IGithubService {
    constructor(private gitHubApi: GitHub) {
        console.log(this.gitHubApi);
    }

    public async getRepoLastCommitGist(owner: string, repo: string): Promise<{ message: string }> {
        const repoData = await this.gitHubApi.getRepo(owner, repo);

        const commits = await repoData.listCommits();

        const latestCommitMessage = commits.data[0].commit.message;

        return {
            message: latestCommitMessage,
        };
    }
}
