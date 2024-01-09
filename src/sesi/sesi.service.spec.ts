import { Test, TestingModule } from '@nestjs/testing';
import { SesiService } from './sesi.service';

describe('SesiService', () => {
  let service: SesiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SesiService],
    }).compile();

    service = module.get<SesiService>(SesiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
