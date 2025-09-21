const request = require('supertest');
const app = require('../server');

describe('Booking API Tests', () => {
  it('should return all bookings (GET /api/bookings)', async () => {
    const res = await request(app).get('/api/bookings');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should create a new booking (POST /api/bookings)', async () => {
    const newBooking = {
      studentName: 'Test Student',
      tutorName: 'Test Tutor',
      topic: 'Math',
      start: '2025-09-21T10:00:00Z',
      end:   '2025-09-21T11:00:00Z',
      status: 'requested'
    };

    const res = await request(app)
      .post('/api/bookings')
      .send(newBooking);

    expect(res.statusCode).toBe(201);
    // Returned object will include _id; we only assert the fields we sent
    expect(res.body).toMatchObject(newBooking);
  });
});
