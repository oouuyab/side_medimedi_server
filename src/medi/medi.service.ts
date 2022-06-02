import { Injectable } from '@nestjs/common';
import {
  SearchDURInfoReqDto,
  SearchDURInfoResDto,
  SearchMediReqDto,
  SearchMediResDto,
} from './dto/get-search-medi.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DrugInfoEntity } from './entities/DrugInfo.entity';
import { Repository } from 'typeorm';
import { DURInfoEntity } from './entities/DURInfo.entity';
import * as _ from 'lodash';

@Injectable()
export class MediService {
  constructor(
    @InjectRepository(DrugInfoEntity)
    private drugInfoRepository: Repository<DrugInfoEntity>,
    @InjectRepository(DURInfoEntity)
    private durInfoRepository: Repository<DURInfoEntity>,
  ) {}

  async getDrugInfo(keyword: SearchMediReqDto): Promise<SearchMediResDto[]> {
    const data = await this.drugInfoRepository
      .createQueryBuilder('drug')
      .select('drug.drugName')
      .addSelect('drug.drugCompany')
      .addSelect('drug.newCode')
      .where('drug.drugName like concat("%", :keyword, "%")', { keyword })
      .andWhere('drug.newCode is not null')
      .groupBy('drug.newCode')
      .orderBy('drug.searchCnt', 'DESC')
      .getMany();

    return data.map((el) => new SearchMediResDto(el));
  }

  async searchDurInfo(
    data: SearchDURInfoReqDto[],
  ): Promise<SearchDURInfoResDto[]> {
    const res: SearchDURInfoResDto[] = [];

    for (let i = 0; i < data.length; i++) {
      const drugWithDurInfo: SearchDURInfoResDto = {
        ...data[i],
        durInfo: [],
      };

      for (let j = 0; j < data.length; j++) {
        if (i === j) {
          continue;
        }

        const durInfo = await this.durInfoRepository.findOne({
          where: {
            drugCodeA: parseInt(data[i].drugCode),
            drugCodeB: parseInt(data[j].drugCode),
          },
        });

        if (!_.isEmpty(durInfo)) {
          drugWithDurInfo.durInfo.push({
            drugName: durInfo.drugNameB,
            drugCompany: durInfo.drugCompanyB,
            drugCode: '' + durInfo.drugCodeB,
            sideEffect: durInfo.sideEffectDesc,
          });
        }
      }

      res.push(drugWithDurInfo);
    }

    return res;
  }
}
