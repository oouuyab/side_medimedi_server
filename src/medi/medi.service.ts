import { Inject, Injectable } from '@nestjs/common';
import {
  SearchDURInfoReqDto,
  SearchDURInfoResDto,
  SearchMediResDto,
} from './dto/get-search-medi.dto';
import * as _ from 'lodash';
import { MediModel } from './model/medi.model';
import { ERR_MSG } from 'src/common/constant/err-msg';

@Injectable()
export class MediService {
  constructor(
    @Inject(MediModel)
    private mediModel: MediModel,
  ) {}

  async getDrugInfo(keyword: string): Promise<SearchMediResDto[]> {
    if (keyword === '') {
      throw new Error(ERR_MSG.KEYWORD_EMPTY);
    }

    const data = await this.mediModel.getDrugInfo(keyword);

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

        const durInfo = await this.mediModel.getDurInfo(
          data[i].drugCode,
          data[j].drugCode,
        );

        if (!_.isEmpty(durInfo)) {
          drugWithDurInfo.durInfo.push({
            drugName: durInfo.drugNameB,
            drugCompany: durInfo.drugCompanyB,
            drugCode: durInfo.drugCodeB,
            sideEffect: durInfo.sideEffectDesc,
          });
        }
      }

      res.push(drugWithDurInfo);
    }

    // * 검색 결과 순위를 위해 searchCnt 업데이트
    // . lock wait timeout exceeded 발생
    for (const drug of res) {
      await this.mediModel.updateDrugSearchCnt(drug.drugCode);
    }

    return res;
  }
}
