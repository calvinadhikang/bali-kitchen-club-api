import { Test, TestingModule } from '@nestjs/testing';
import { DetailtransactionService } from './detailtransaction.service';

describe('DetailtransactionService', () => {
  let service: DetailtransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetailtransactionService],
    }).compile();

    service = module.get<DetailtransactionService>(DetailtransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
