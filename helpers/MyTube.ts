import * as rp from 'request-promise';

export class MyTube {

  private static basePath = 'http://localhost:3300';
  private static historyPath = '/history';
  private static statusPath = '/status';

  static async status() {
    const options = {
      method: 'GET',
      uri: MyTube.basePath + MyTube.statusPath,
      resolveWithFullResponse: true,
      json: true
    };
    return await rp(options);
  }

  static async getHistory() {
    const options = {
      method: 'GET',
      uri: MyTube.basePath + MyTube.historyPath,
      resolveWithFullResponse: true,
      json: true
    };
    return await rp(options)
  }

  static async postHistory(body) {
    const options = {
      method: 'POST',
      uri: MyTube.basePath + MyTube.historyPath,
      body,
      resolveWithFullResponse: true,
      json: true
    };
    return await rp(options)
  }
}
