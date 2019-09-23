import GitHub from 'github-api';

const gh = new GitHub();

export async function getRepoLastCommitGist(owner: string, repo: string) {
    const repoData = await gh.getRepo(owner, repo);

    const commits = await repoData.listCommits();

    const latestCommitMessage = commits.data[0].commit.message;

    return {
        message: latestCommitMessage,
    };
}