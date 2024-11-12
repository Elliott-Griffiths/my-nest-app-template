import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    // Changed from beforeEach to beforeAll
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET) - API Info', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect((res) => {
        expect(res.body).toMatchObject({
          name: 'User Management API',
          version: '1.0.0',
          environment: expect.any(String),
          timestamp: expect.any(String),
        });
      });
  });

  it('/health (GET) - Health Check', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect((res) => {
        expect(res.body).toMatchObject({
          status: expect.stringMatching(/^(healthy|unhealthy)$/),
          timestamp: expect.any(String),
          services: {
            api: {
              status: expect.stringMatching(/^(healthy|unhealthy)$/),
              latency: expect.any(Number),
            },
            database: {
              status: expect.stringMatching(/^(healthy|unhealthy)$/),
              latency: expect.any(Number),
            },
          },
        });
      });
  });

  it('/docs (GET) - API Documentation', () => {
    return request(app.getHttpServer())
      .get('/docs')
      .expect(200)
      .expect((res) => {
        expect(res.body).toMatchObject({
          endpoints: expect.arrayContaining([
            expect.objectContaining({
              path: '/api/users',
              methods: expect.arrayContaining(['GET', 'POST']),
              description: expect.any(String),
            }),
          ]),
          version: '1.0.0',
          lastUpdated: expect.any(String),
        });
      });
  });
});
