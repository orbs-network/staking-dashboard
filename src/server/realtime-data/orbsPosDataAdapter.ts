import { EventEmitter } from 'events';
import { OrbsPOSDataService } from 'orbs-pos-data';

export class OrbsPosDataAdapter extends EventEmitter {
  public top3Guardians: string[] = [];

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
    this.top3Guardians = [sortedGuardians[0].name, sortedGuardians[1].name, sortedGuardians[2].name];
  }
}
