import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

// E2E 테스트는 유닛 테스트에서 확인하기 어려운 부분을 해결
// 예를 들어, 비밀번호 테스트를 할 때, 암호화 생성, 저장 등 관련 기능을 모두 테스트
describe('AppController (e2e)', () => {
  let app: INestApplication;

  // beforeEach => beforeAll로 바꾸는 이유는 테스트 할 때마다 새 애플리케이션 (새 데이터)가 생성되지 않고 계속 유지되도록 하기 위해
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    // 테스팅 환경도 실제 구동 환경의 설정 그대로 적용해야 한다.
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // 잘못된 데이터 입력(추가) 방지
        forbidNonWhitelisted: true, // 잘못된 데이터 입력(추가) 방지
        transform: true,
      }),
    );
    await app.init();
  });

  // URL 요청 테스트
  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my Movie API');
  });

  describe('/movies', () => {
    it('GET', () => {
      return request(app.getHttpServer())
        .get('/movies')
        .expect(200)
        .expect([]);
    });
    //  POST 성공시 201 출력
    it('POST 201', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Test',
          year: 2000,
          genres: ['test'],
        })
        .expect(201);
    });
    // 잘못된 요청을 했을 시 테스트
    it('POST 400', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Test',
          year: 2000,
          genres: ['test'],
          other: 'thing', // 잘못된 요청
        })
        .expect(400);
    });
    // 삭제가 완료가 되면 404 출력
    it('DELETE', () => {
      return request(app.getHttpServer())
        .delete('/movies')
        .expect(404);
    });
  });

  // 현재 코드에서 실제 서버에서 id는 number지만 테스트 서버에서는 string이기 때문에 에러
  // 왜냐하면 테스트 서버에서는 useGlobalPipes의 Transform을 적용하지 않았기 때문
  describe('/movies/:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer())
        .get('/movies/1')
        .expect(200);
    });
    it('GET 404', () => {
      return request(app.getHttpServer())
        .get('/movies/999')
        .expect(404);
    });
    it('PATCH 200', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({ title: 'Updated Test' })
        .expect(200);
    });
    it('DELETE 200', () => {
      return request(app.getHttpServer())
        .delete('/movies/1')
        .expect(200);
    });
  });
});
