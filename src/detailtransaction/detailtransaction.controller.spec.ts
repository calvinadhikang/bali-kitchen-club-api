import { Test, TestingModule } from '@nestjs/testing';
import { DetailtransactionController } from './detailtransaction.controller';

describe('DetailtransactionController', () => {
  let controller: DetailtransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetailtransactionController],
    }).compile();

    controller = module.get<DetailtransactionController>(DetailtransactionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
