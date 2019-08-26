import { EventEmitter } from 'events';
import * as request from 'request';
import { sleep } from '../utils/time-utils';

export const ETHPLORER_URL = 'https://api.ethplorer.io';
export const GET_TOKEN_INFO_PATH = 'getTokenInfo';
export const API_KEY = 'freekey';
export const ORBS_TOKEN_ADDRESS = '0xff56cc6b1e6ded347aa0b7676c85ab0b3d08b0fa';

export class EthplorerAdapter extends EventEmitter {
  public totalHolders: number = 0;
  public orbsInCirculation: number = 0;
  public token24HVolume: number = 0;
  public tokenPrice: number = 0;

  private isDisposed = false;
  private samplingInterval: number;

  constructor(samplingInterval: number = 3_000) {
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
    if (this.totalHolders !== tokenInfo.holdersCount) {
      this.totalHolders = tokenInfo.holdersCount;
      this.emit('totalHolders', this.totalHolders);
    }

    if (this.orbsInCirculation !== tokenInfo.price.availableSupply) {
      this.orbsInCirculation = tokenInfo.price.availableSupply;
      this.emit('orbsInCirculation', this.orbsInCirculation);
    }

    if (this.token24HVolume !== tokenInfo.price.volume24h) {
      this.token24HVolume = tokenInfo.price.volume24h;
      this.emit('token24HVolume', this.token24HVolume);
    }

    if (this.tokenPrice !== tokenInfo.price.rate) {
      this.tokenPrice = tokenInfo.price.rate;
      this.emit('tokenPrice', this.tokenPrice);
    }
  }

  private getTokenInfo(): void {
    request.get(
      `${ETHPLORER_URL}/${GET_TOKEN_INFO_PATH}/${ORBS_TOKEN_ADDRESS}?apiKey=${API_KEY}`,
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
