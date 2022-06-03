import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DrugInfoEntity } from '../entities/DrugInfo.entity';
import { DURInfoEntity } from '../entities/DURInfo.entity';

@Injectable()
export class MediModel {
  constructor(
    @InjectRepository(DrugInfoEntity)
    private drugInfoRepository: Repository<DrugInfoEntity>,
    @InjectRepository(DURInfoEntity)
    private durInfoRepository: Repository<DURInfoEntity>,
  ) {}

  async getDrugInfo(keyword: string): Promise<DrugInfoEntity[]> {
    return await this.drugInfoRepository
      .createQueryBuilder('drug')
      .select('drug.drugName')
      .addSelect('drug.drugCompany')
      .addSelect('drug.drugCode')
      .where('drug.drugName like concat("%", :keyword, "%")', { keyword })
      .andWhere('drug.drugCode is not null')
      .groupBy('drug.drugCode')
      .orderBy('drug.searchCnt', 'DESC')
      .getMany();
  }

  async getDurInfo(
    drugCodeA: number,
    drugCodeB: number,
  ): Promise<DURInfoEntity> {
    return await this.durInfoRepository.findOne({
      where: { drugCodeA, drugCodeB },
    });
  }

  async updateDrugSearchCnt(drugCode: number): Promise<void> {
    await this.drugInfoRepository
      .createQueryBuilder('drug')
      .update()
      .set({ searchCnt: () => 'search_cnt + 1' })
      .where('drugCode = :drugCode', { drugCode })
      .execute();
  }
}
