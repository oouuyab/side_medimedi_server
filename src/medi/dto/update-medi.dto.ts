import { PartialType } from '@nestjs/mapped-types';
import { CreateMediDto } from './create-medi.dto';

export class UpdateMediDto extends PartialType(CreateMediDto) {}
