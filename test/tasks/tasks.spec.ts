import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import { AppModule } from '../../src/app.module';
import { CreateTaskDto } from '../../src/tasks/dto/create-task.dto';
import { Task } from '../../src/tasks/task.entity';

describe('Tasks', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(async () => {
    const repository = app.get<Repository<Task>>(getRepositoryToken(Task));
    await repository.clear();
  });

  it('/tasks (GET)', async () => {
    await request(app.getHttpServer()).get('/tasks').expect(200).expect([]);
  });

  it('/tasks (POST)', async () => {
    const createTaskDto: CreateTaskDto = { title: 'Test Task' };
    const response = await request(app.getHttpServer())
      .post('/tasks')
      .send(createTaskDto)
      .expect(201);

    expect(response.body).toMatchObject({
      id: expect.any(String),
      title: 'Test Task',
      completed: false,
    });
  });

  it('/tasks/:id (GET)', async () => {
    const createTaskDto: CreateTaskDto = { title: 'Test Task' };
    const { body: createdTask } = await request(app.getHttpServer())
      .post('/tasks')
      .send(createTaskDto)
      .expect(201);

    const response = await request(app.getHttpServer())
      .get(`/tasks/${createdTask.id}`)
      .expect(200);

    expect(response.body).toMatchObject(createdTask);
  });

  it('/tasks/:id (PATCH)', async () => {
    const createTaskDto: CreateTaskDto = { title: 'Test Task' };
    const { body: createdTask } = await request(app.getHttpServer())
      .post('/tasks')
      .send(createTaskDto)
      .expect(201);

    const response = await request(app.getHttpServer())
      .patch(`/tasks/${createdTask.id}`)
      .send({ completed: true })
      .expect(200);

    expect(response.body).toMatchObject({
      ...createdTask,
      completed: true,
    });
  });
});
