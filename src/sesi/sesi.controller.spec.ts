import { Test, TestingModule } from '@nestjs/testing';
import { SesiController } from './sesi.controller';

describe('SesiController', () => {
  let controller: SesiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SesiController],
    }).compile();

    controller = module.get<SesiController>(SesiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
