import { Test, TestingModule } from '@nestjs/testing';
import { MediController } from './medi.controller';
import { MediService } from './medi.service';

describe('MediController', () => {
  let controller: MediController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MediController],
      providers: [MediService],
    }).compile();

    controller = module.get<MediController>(MediController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
