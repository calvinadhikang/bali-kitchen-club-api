import { Test, TestingModule } from '@nestjs/testing';
import { HeadertransactionController } from './headertransaction.controller';

describe('HeadertransactionController', () => {
  let controller: HeadertransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HeadertransactionController],
    }).compile();

    controller = module.get<HeadertransactionController>(HeadertransactionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
