import { Module } from '@nestjs/common';
import { DetailtransactionController } from './detailtransaction.controller';
import { DetailtransactionService } from './detailtransaction.service';

@Module({
  controllers: [DetailtransactionController],
  providers: [DetailtransactionService]
})
export class DetailtransactionModule {}
