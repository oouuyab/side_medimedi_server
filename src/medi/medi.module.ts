import { Logger, Module } from '@nestjs/common';
import { MediService } from './medi.service';
import { MediController } from './medi.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DURInfoEntity } from './entities/DURInfo.entity';
import { DrugInfoEntity } from './entities/DrugInfo.entity';

@Module({
  controllers: [MediController],
  providers: [MediService],
  imports: [TypeOrmModule.forFeature([DrugInfoEntity, DURInfoEntity])],
})
export class MediModule {}
