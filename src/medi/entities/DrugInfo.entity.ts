import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('tb_drug_info')
export class DrugInfoEntity {
  @PrimaryColumn({ name: 'drug_info_no' })
  drugInfoNo: number;

  @Column({ name: 'drug_name' })
  drugName: string;

  @Column({ name: 'drug_company' })
  drugCompany: string;

  @Column({ name: 'drug_code' })
  drugCode: number;

  @Column({ name: 'search_cnt' })
  searchCnt: number;
}
