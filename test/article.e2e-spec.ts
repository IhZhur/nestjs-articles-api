import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('ArticleController (e2e)', () => {
  let app: INestApplication;
  let jwtToken: string;
  let createdArticleId: number;

  beforeAll(async () => {
    process.env.JWT_SECRET = 'xVr3p9!f9GsvZ2@Jtzv2Hq5LpXs7Nw8K';

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    const email = `test${Date.now()}@example.com`;

    // Регистрация пользователя
    const regRes = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email,
        password: '123456',
        role: 'admin',
      });
    console.log('REGISTER RESPONSE:', regRes.body);

    // Логин пользователя
    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email,
        password: '123456',
      });
    console.log('LOGIN RESPONSE:', loginRes.body);

    jwtToken = loginRes.body.access_token;
    console.log('JWT TOKEN:', jwtToken);

    // Получить пользователей (если маршрут открыт)
    try {
      const userRes = await request(app.getHttpServer())
        .get('/users')
        .set('Authorization', `Bearer ${jwtToken}`);
      console.log('USERS TABLE AFTER REGISTER:', userRes.body);
    } catch (err) {
      console.log('Cannot fetch users:', err.message);
    }

    expect(jwtToken).toBeDefined();
    expect(jwtToken.length).toBeGreaterThan(10);
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /articles (создать статью)', async () => {
    const res = await request(app.getHttpServer())
      .post('/articles')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        title: 'E2E Test Article',
        content: 'Some content',
        published: true,
      })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('E2E Test Article');
    createdArticleId = res.body.id;
  });

  it('GET /articles (получить все)', async () => {
    const res = await request(app.getHttpServer())
      .get('/articles')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.some((a: any) => a.id === createdArticleId)).toBe(true);
  });

  it('GET /articles/:id (получить одну)', async () => {
    const res = await request(app.getHttpServer())
      .get(`/articles/${createdArticleId}`)
      .expect(200);

    expect(res.body).toHaveProperty('id', createdArticleId);
    expect(res.body).toHaveProperty('title', 'E2E Test Article');
  });

  it('PUT /articles/:id (обновить)', async () => {
    const res = await request(app.getHttpServer())
      .put(`/articles/${createdArticleId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        title: 'E2E Updated Title',
        content: 'Updated content',
        published: false,
      })
      .expect(200);

    expect(res.body).toHaveProperty('title', 'E2E Updated Title');
    expect(res.body).toHaveProperty('published', false);
  });

  it('DELETE /articles/:id (удалить)', async () => {
    await request(app.getHttpServer())
      .delete(`/articles/${createdArticleId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    await request(app.getHttpServer())
      .get(`/articles/${createdArticleId}`)
      .expect(404);
  });
});
