import { Test, TestingModule } from '@nestjs/testing';
import { HeadertransactionService } from './headertransaction.service';

describe('HeadertransactionService', () => {
  let service: HeadertransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HeadertransactionService],
    }).compile();

    service = module.get<HeadertransactionService>(HeadertransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
