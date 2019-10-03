import { MyTube } from '../helpers/MyTube';

describe('My Tube Service: /status',  function() {

  it('should respond with status 200 if My Tube service is alive', async () => {
    const response = await MyTube.status();
    const body = response.body;

    expect(response.statusCode).toBe(200);
    expect(body.app_name).toBeDefined();
    expect(body.app_version).toBeDefined();
    expect(body.status_message).toBeDefined();
  });
});
