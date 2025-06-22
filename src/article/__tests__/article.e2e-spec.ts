// test/article.e2e-spec.ts
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('ArticleController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe()); // 👈 как в main.ts
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/articles (GET) should return 200', () => {
    return request(app.getHttpServer())
      .get('/articles')
      .expect(200);
  });

  it('/articles/:id (GET) should return 404 if not found', () => {
    return request(app.getHttpServer())
      .get('/articles/99999')
      .expect(404);
  });
});
