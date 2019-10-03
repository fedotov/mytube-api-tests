import { MyTube } from '../helpers/MyTube';
import { testRecord } from '../helpers/testData';
const joi = require('@hapi/joi');
const mysql = require('mysql');

describe('MyTube history endpoint', () => {

  const schema = joi.object().keys({
    icon: joi.string(),
    id: joi.number,
    name: joi.string(),
    videoId: joi.string().alphanum(),
  });
  let con;

  beforeAll(async () => {
    con = mysql.createConnection({
      host: "localhost",
      user: "yourusername",
      password: "yourpassword"
    });

    con.connect(function (err) {
      if (err) throw err;
      console.log("Connected!");
    });
  });

  it('returns data in correct format', async () => {
    const response = await MyTube.getHistory();
    const result = schema.validate(response.body[0]);

    expect(result.error).toBeNull();
  });

  it('gets the same record, which was posted', async () => {
    await MyTube.postHistory(testRecord);
    const response = await MyTube.getHistory();
    const recordFromHistoryList = response.body.find(item => item.videoId === 'testId');
    recordFromHistoryList.delete('id');

    expect(recordFromHistoryList).toEqual(testRecord);
  });

  afterAll(async () => {
      const deleteTestData = "DELETE FROM history WHERE videoId = 'testId'";
      con.query(deleteTestData, function (err) {
        if (err) throw err;
        console.log("Test data deleted");
      });
    });
});
