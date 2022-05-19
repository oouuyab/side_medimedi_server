import { Test, TestingModule } from '@nestjs/testing';
import { MediService } from './medi.service';

describe('MediService', () => {
  let service: MediService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MediService],
    }).compile();

    service = module.get<MediService>(MediService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
