import { Logger, Module } from '@nestjs/common';
import { MediService } from './medi.service';
import { MediController } from './medi.controller';

@Module({
  controllers: [MediController],
  providers: [MediService, Logger],
})
export class MediModule {}
