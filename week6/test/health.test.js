// make sure the test-only reset route exists before we import app
process.env.NODE_ENV = 'test';

const request = require('supertest');
const { expect } = require('chai');
const app = require('../../week5/app');


describe('Health endpoint', () => {
  it('GET /health -> 200 { ok: true, service: "week5-app" }', async () => {
    const res = await request(app).get('/health');
    expect(res.status).to.equal(200);
    expect(res.body).to.deep.include({ ok: true, service: 'week5-app' });
  });
});

