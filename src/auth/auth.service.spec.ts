import { Test, TestingModule } from '@nestjs/testing';

import { AuthService } from './auth.service';
import { DynamicJwtModule } from './auth.module';
import { PrismaService } from '../../src/prisma/prisma.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DynamicJwtModule],
      providers: [AuthService, PrismaService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
