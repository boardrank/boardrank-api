import { Test, TestingModule } from '@nestjs/testing';

import { AdminUserController } from './admin-user.controller';
import { AdminUserModule } from './admin-user.module';

describe('AdminUserController', () => {
  let controller: AdminUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AdminUserModule],
    }).compile();

    controller = module.get<AdminUserController>(AdminUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
