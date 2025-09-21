const request = require('supertest');
const http = require('http');
const app = require('../server');

describe('Socket.IO Realtime Tests', () => {
  let server;

  beforeAll((done) => {
    server = http.createServer(app);
    server.listen(done);
  });

  afterAll((done) => {
    server.close(done);
  });

  it('should serve realtime.html', async () => {
    const res = await request(server).get('/realtime.html');
    expect(res.statusCode).toBe(200);
  });
});
