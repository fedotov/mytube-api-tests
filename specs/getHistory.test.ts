import * as joi from '@hapi/joi';
import * as mysql from 'mysql';
import { MyTube } from '../helpers/MyTube';
import { testRecord } from '../helpers/testData';

describe('MyTube history endpoint', () => {

  const schema = joi.object().keys({
    id: joi.number,
    videoId: joi.string(),
    title: joi.string(),
    thumbnail: joi.string(),
    createdAt: joi.string(),
    updatedAt: joi.string(),
  });

  let con;

  beforeAll(async () => {
    con = mysql.createConnection({
      database: 'mytube',
      host: 'localhost',
      user: 'user',
      password: 'password',
    });

    con.connect(function(err) {
      if (err) { throw err; }
      console.log('Connected!');
    });
  });

  it('returns data in correct format', async () => {
    const response = await MyTube.getHistory();
    const result = schema.validate(response.body[0]);

    expect(result).toBeDefined();
  });

  it('gets the same record, which was posted', async () => {
    await MyTube.postHistory(testRecord);
    const response = await MyTube.getHistory();
    const recordFromHistoryList = response.body.find(item => item.videoId === 'testId');
    delete recordFromHistoryList['id'];
    delete recordFromHistoryList['createdAt'];
    delete recordFromHistoryList['updatedAt'];

    expect(recordFromHistoryList).toEqual(testRecord);
  });

  afterAll(async () => {
      const deleteTestData = 'DELETE FROM history WHERE videoId = \'testId\'';
      con.query(deleteTestData, function(err) {
        if (err) { throw err; }
        console.log('Test data deleted');
      });
    });
});
