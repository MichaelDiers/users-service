import { Test, TestingModule } from '@nestjs/testing';
import { UsersDatabaseService } from './users-database.service';

describe('UsersDatabaseService', () => {
  let service: UsersDatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersDatabaseService],
    }).compile();

    service = module.get<UsersDatabaseService>(UsersDatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
