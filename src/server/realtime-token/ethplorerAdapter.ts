import { EventEmitter } from 'events';
import * as request from 'request';
import { sleep } from '../utils/time-utils';

export const ETHPLORER_URL = 'https://api.ethplorer.io';
export const GET_TOKEN_INFO_PATH = 'getTokenInfo';
export const API_KEY = 'freekey';

export class EthplorerAdapter extends EventEmitter {
  private isDisposed = false;
  private samplingInterval: number;
  private previousTotalHolders: number = 0;
  private previousOrbsInCirculation: number = 0;
  private previousToken24HVolume: number = 0;
  private previousTokenPrice: number = 0;

  constructor(samplingInterval: number = 1_000) {
    super();
    this.samplingInterval = samplingInterval;
  }

  public init() {
    this.getTokenInfo();
  }

  public dispose() {
    this.isDisposed = true;
  }

  private onNewTokenInfo(tokenInfo: any): void {
    if (this.previousTotalHolders !== tokenInfo.holdersCount) {
      this.emit('totalHolders', tokenInfo.holdersCount);
      this.previousTotalHolders = tokenInfo.holdersCount;
    }

    if (this.previousOrbsInCirculation !== tokenInfo.price.availableSupply) {
      this.emit('orbsInCirculation', tokenInfo.price.availableSupply);
      this.previousOrbsInCirculation = tokenInfo.price.availableSupply;
    }

    if (this.previousToken24HVolume !== tokenInfo.price.volume24h) {
      this.emit('token24HVolume', tokenInfo.price.volume24h);
      this.previousToken24HVolume = tokenInfo.price.volume24h;
    }

    if (this.previousTokenPrice !== tokenInfo.price.rate) {
      this.emit('tokenPrice', tokenInfo.price.rate);
      this.previousTokenPrice = tokenInfo.price.rate;
    }
  }

  private getTokenInfo(): void {
    request.get(
      `${ETHPLORER_URL}/${GET_TOKEN_INFO_PATH}?apiKey=${API_KEY}`,
      (error: any, response: request.Response, body: any) => {
        if (!error && response.statusCode === 200) {
          const res = JSON.parse(body);
          this.onNewTokenInfo(res);
        }
        sleep(this.samplingInterval).then(() => {
          if (this.isDisposed === false) {
            this.getTokenInfo();
          }
        });
      },
    );
  }
}
