import { Test, TestingModule } from '@nestjs/testing';

import { AdminUserService } from './admin-user.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('AdminUserService', () => {
  let service: AdminUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaService],
      providers: [AdminUserService, PrismaService],
    }).compile();

    service = module.get<AdminUserService>(AdminUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
