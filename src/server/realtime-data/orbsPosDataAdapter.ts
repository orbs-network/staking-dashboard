import { EventEmitter } from 'events';
import { OrbsPOSDataService } from 'orbs-pos-data';
import { IGuardianDisplayGist } from '../../shared/IGuardian';
import { IGuardianInfo } from 'orbs-pos-data/dist/orbs-pos-data-service';

export class OrbsPosDataAdapter extends EventEmitter {
  public top3Guardians: IGuardianDisplayGist[] = [];

  constructor(private orbsPOSDataService: OrbsPOSDataService) {
    super();
  }

  public async init() {
    await this.updateTop3Guardians();
  }

  private async updateTop3Guardians(): Promise<void> {
    const guardians = await this.orbsPOSDataService.getGuardiansList(0, 1_000);
    const guardiansInfo = [];
    for (const guardianAddress of guardians) {
      const guardianInfo = await this.orbsPOSDataService.getGuardianInfo(guardianAddress);
      guardiansInfo.push(guardianInfo);
    }
    const sortedGuardians = guardiansInfo.sort((a, b) => b.stake - a.stake);
    this.top3Guardians = [
      guardianInfoToDisplayGist(sortedGuardians[0]),
      guardianInfoToDisplayGist(sortedGuardians[1]),
      guardianInfoToDisplayGist(sortedGuardians[2]),
    ];
  }
}

function guardianInfoToDisplayGist(guardianInfo: IGuardianInfo): IGuardianDisplayGist {
  const guardianDisplayGist: IGuardianDisplayGist = {
    id: guardianInfo.name,
    displayName: guardianInfo.name,
    homePage: guardianInfo.website,
  };

  return guardianDisplayGist;
}
