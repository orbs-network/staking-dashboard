import {GitHubApiTestKit} from './githubApi';
import {IServicesDependencies} from '../../../services/services';

export class ApiDependencies {
    public gitHubApiTestKit: GitHubApiTestKit;

    constructor() {
        this.gitHubApiTestKit = new GitHubApiTestKit();
    }

    public buildAppDependencies(): IServicesDependencies {
        return {
            gitHubApi: this.gitHubApiTestKit.buildMockedInstance(),
        };
    }
}
