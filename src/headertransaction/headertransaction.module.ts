import { Module } from '@nestjs/common';
import { HeadertransactionController } from './headertransaction.controller';
import { HeadertransactionService } from './headertransaction.service';

@Module({
  controllers: [HeadertransactionController],
  providers: [HeadertransactionService]
})
export class HeadertransactionModule {}
