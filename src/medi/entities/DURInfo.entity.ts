import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('tb_dur_info')
export class DURInfoEntity {
  @PrimaryColumn({ name: 'dur_info_no' })
  durInfoNo: number;

  @Column({ name: 'ingr_name_a' })
  ingrNameA: string;

  @Column({ name: 'ingr_code_a' })
  ingrCodeA: string;

  @Column({ name: 'drug_code_a' })
  drugCodeA: number;

  @Column({ name: 'drug_name_a' })
  drugNameA: string;

  @Column({ name: 'drug_company_a' })
  drug_company_a: string;

  @Column({ name: 'drug_fm_code_a' })
  drugFMCodeA: string;

  @Column({ name: 'ingr_name_b' })
  ingrNameB: string;

  @Column({ name: 'ingr_code_b' })
  ingrCodeB: string;

  @Column({ name: 'drug_code_b' })
  drugCodeB: number;

  @Column({ name: 'drug_name_b' })
  drugNameB: string;

  @Column({ name: 'drug_company_b' })
  drugCompanyB: string;

  @Column({ name: 'drug_fm_code_b' })
  drugFMCodeB: string;

  @Column({ name: 'side_effect_desc' })
  sideEffectDesc: string;
}
