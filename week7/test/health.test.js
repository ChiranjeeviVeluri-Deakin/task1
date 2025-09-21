const request = require('supertest');
const app = require('../server');

describe('Health Check Endpoint', () => {
  it('should return status 200 and a JSON response', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status', 'Server is running fine');
  });
});
