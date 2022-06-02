import { IsString } from 'class-validator';

export interface DrugInfoInterface {
  drugName: string;
  drugCompany: string;
  drugCode: string;
}
export interface DrugInfoWithSideEffectInterface extends DrugInfoInterface {
  sideEffect: string;
}
export class SearchMediReqDto {
  @IsString()
  keyword: string;
}

export class SearchMediResDto {
  private drugName: string;
  private drugCompany: string;
  private drugCode: string;

  constructor(item: any) {
    this.drugName = item.drugName
      .replace(/\(수출명:.*$/, '')
      .replace(/\(/, ' (');
    this.drugCompany = item.drugCompany;
    this.drugCode = item.newCode;
  }
}

export class SearchInfoReqDto implements DrugInfoInterface {
  @IsString()
  drugName: string;

  @IsString()
  drugCompany: string;

  @IsString()
  drugCode: string;
}

export class SearchDURInfoReqDto implements DrugInfoInterface {
  drugName: string;
  drugCompany: string;
  drugCode: string;
}

export class SearchDURInfoResDto implements DrugInfoInterface {
  drugName: string;
  drugCompany: string;
  drugCode: string;
  durInfo: DrugInfoWithSideEffectInterface[];
}
