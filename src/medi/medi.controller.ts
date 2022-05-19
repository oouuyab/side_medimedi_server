import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Req,
  Res,
  Query,
  LoggerService,
  Logger,
} from '@nestjs/common';
import { getSearchResMediDto } from './dto/get-search-medi.dto';
import { MediService } from './medi.service';

@Controller('/medi')
export class MediController {
  private pringLoggerServiceLog(dto) {
    try {
    } catch (error) {
      this.logger.error('error: ' + JSON.stringify(dto), error.stack);
    }

    this.logger.warn('warn: ', dto);
    this.logger.log('log: ', dto);
    this.logger.verbose('verbose: ', dto);
    this.logger.debug('debug: ', dto);
  }

  constructor(
    @Inject(Logger) private readonly logger: LoggerService,
    private readonly mediService: MediService,
  ) {}

  @Get('/search')
  async findAll(
    @Req() req,
    @Res() res,
    @Query('keyword') keyword: string,
  ): Promise<getSearchResMediDto[]> {
    this.pringLoggerServiceLog(keyword);
    const data = await this.mediService.getDrugInfo(keyword);

    return res.status(200).send(data);
  }
}
