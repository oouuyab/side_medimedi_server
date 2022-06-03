import { IsNumber, IsString } from 'class-validator';

export interface DrugInfoInterface {
  drugName: string;
  drugCompany: string;
  drugCode: number;
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
    this.drugCode = item.drugCode;
  }
}

export class SearchInfoReqDto implements DrugInfoInterface {
  @IsString()
  drugName: string;

  @IsString()
  drugCompany: string;

  @IsNumber()
  drugCode: number;
}

export class SearchDURInfoReqDto implements DrugInfoInterface {
  drugName: string;
  drugCompany: string;
  drugCode: number;
}

export class SearchDURInfoResDto implements DrugInfoInterface {
  drugName: string;
  drugCompany: string;
  drugCode: number;
  durInfo: DrugInfoWithSideEffectInterface[];
}
