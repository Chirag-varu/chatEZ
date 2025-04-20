import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app';

describe('GET /healthcheck', () => {
  it('should return 200 and a healthy message', async () => {
    const res = await (request(app) as any).get('/healthcheck');

    expect(res.status).toBe(200);
    expect(res.text).toBe('Server is healthy');
  });
});
