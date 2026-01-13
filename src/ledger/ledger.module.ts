import { Module } from '@nestjs/common';
import { LedgerController } from './api/controller/ledger.controller';
import { LedgerDomainService } from './domain/ledger-domain.service';
import { LedgerRepository } from './domain/ledger.repository';
import { LedgerRepositoryImpl } from './infrastructure/repository/ledger.repository.impl';

const domain = [LedgerDomainService];
const infrastructure = [
  {
    provide: LedgerRepository,
    useClass: LedgerRepositoryImpl,
  },
];

@Module({
  controllers: [LedgerController],
  providers: [
    LedgerDomainService,
    {
      provide: LedgerRepository,
      useClass: LedgerRepositoryImpl,
    },
  ],
  exports: [LedgerDomainService],
})
export class LedgerModule {}
