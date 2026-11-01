const request = require('supertest');
const app = require('../src/app');
const { applyDiscount } = require('../src/discounts');

test.each([
  ['WELCOME10', 50, 5],
  ['SAVE5', 40, 5],
  ['FREESHIP', 60, 0],
])('%s on a subtotal of %p gives a discount of %p', (code, subtotal, discount) => {
  expect(applyDiscount(subtotal, code).discount).toBe(discount);
});

test.each([
  ['BOGUS', 40],
  ['SAVE5', 10],
])('%s on a subtotal of %p is rejected', (code, subtotal) => {
  expect(() => applyDiscount(subtotal, code)).toThrow();
});

test('POST /orders/discount applies a valid code', async () => {
  const res = await request(app).post('/orders/discount').send({ subtotal: 50, code: 'WELCOME10' });
  expect(res.status).toBe(200);
});
