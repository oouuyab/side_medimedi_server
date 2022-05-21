export class getSearchMediDto {
  drugName: string;
}

export class getSearchResMediDto {
  private drugNameA: string;
  private drugCompanyA: string;
  private drugCodeA: string;

  constructor(item: any) {
    this.drugNameA = item.ITEM_NAME
      .replace(/\(수출명:.*$/, '')
      .replace(/\(/,' (',);
    this.drugCompanyA = item.ENTP_NAME;
    this.drugCodeA = item.ITEM_SEQ;
  }
}
