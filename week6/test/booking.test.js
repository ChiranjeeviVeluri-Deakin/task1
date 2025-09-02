process.env.NODE_ENV = 'test';

const request = require('supertest');
const { expect } = require('chai');
const app = require('../../week5/app');

// reset the in-memory store before each test
async function reset() {
  await request(app).post('/__test__/reset').send();
}

describe('Bookings API (Week5 model)', () => {
  beforeEach(reset);

  it('GET /bookings -> 200 and returns an empty array', async () => {
    const res = await request(app).get('/bookings');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array').that.is.empty;
  });

  it('POST /bookings valid -> 201 and echoes booking with default status', async () => {
    const payload = {
      studentName: 'Alice',
      tutorName:   'Dr. Smith',
      topic:       'Algorithms',
      start:       '2025-09-01T10:00:00Z',
      end:         '2025-09-01T11:00:00Z'
    };
    const res = await request(app).post('/bookings').send(payload);
    expect(res.status).to.equal(201);
    expect(res.body).to.include.keys('_id','studentName','tutorName','topic','start','end','status');
    expect(res.body.status).to.equal('requested');
  });

  it('POST /bookings invalid (missing fields) -> 400', async () => {
    const res = await request(app).post('/bookings').send({ studentName: 'OnlyName' });
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('error');
  });

  it('GET /bookings shows created items', async () => {
    await request(app).post('/bookings').send({
      studentName: 'Bob',
      tutorName:   'Tutor A',
      topic:       'DBMS',
      start:       '2025-09-02T09:00:00Z',
      end:         '2025-09-02T10:00:00Z'
    });
    const res = await request(app).get('/bookings');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array').with.lengthOf(1);
    expect(res.body[0]).to.include({ studentName: 'Bob', tutorName: 'Tutor A', topic: 'DBMS' });
  });
});
