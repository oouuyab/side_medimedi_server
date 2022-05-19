import { Injectable } from '@nestjs/common';
import { CreateMediDto } from './dto/create-medi.dto';
import { UpdateMediDto } from './dto/update-medi.dto';
import axios from 'axios';
import { getSearchResMediDto } from './dto/get-search-medi.dto';

@Injectable()
export class MediService {
  async getDrugInfo(keyword: string) {
    let url =
      'http://apis.data.go.kr/1471000/DrugPrdtPrmsnInfoService02/getDrugPrdtPrmsnDtlInq01';

    let queryParams =
      '?' +
      encodeURIComponent('serviceKey') +
      '=' +
      process.env.API_ENCODING_KEY;
    queryParams +=
      '&' +
      encodeURIComponent('pageNo') +
      '=' +
      encodeURIComponent('1') +
      '&' +
      encodeURIComponent('numOfRows') +
      '=' +
      encodeURIComponent('10');
    queryParams +=
      '&' + encodeURIComponent('type') + '=' + encodeURIComponent('json');
    queryParams +=
      '&' + encodeURIComponent('item_name') + '=' + encodeURIComponent(keyword);

    const res = await axios({
      method: 'get',
      url: url + queryParams,
    });

    let data: getSearchResMediDto[] = [];

    for (const item of res.data.body.items) {
      data.push(new getSearchResMediDto(item));
    }

    return data;
  }
}
