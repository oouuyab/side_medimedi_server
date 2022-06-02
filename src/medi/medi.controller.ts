import {
  Controller,
  Get,
  Inject,
  Req,
  Res,
  Query,
  LoggerService,
  Logger,
  Post,
  Param,
  Body,
} from '@nestjs/common';
import {
  SearchDURInfoReqDto,
  SearchMediReqDto,
  SearchMediResDto,
} from './dto/get-search-medi.dto';
import { MediService } from './medi.service';

@Controller('/medi')
export class MediController {
  // private printLoggerServiceLog(dto) {
  //   try {
  //   } catch (error) {
  //     this.logger.error('error: ' + JSON.stringify(dto), error.stack);
  //   }

  //   this.logger.warn('warn: ', dto);
  //   this.logger.log('log: ', dto);
  //   this.logger.verbose('verbose: ', dto);
  //   this.logger.debug('debug: ', dto);
  // }

  constructor(
    // @Inject(Logger) private readonly logger: LoggerService,
    private readonly mediService: MediService,
  ) {}

  @Get('/search')
  async findAll(
    @Req() req,
    @Res() res,
    @Query('keyword') keyword: SearchMediReqDto,
  ): Promise<SearchMediResDto[]> {
    // this.printLoggerServiceLog(keyword);
    const data = await this.mediService.getDrugInfo(keyword);

    return res.status(200).send(data);
  }

  @Post('/search/dur')
  async searchDURInfo(
    @Req() req,
    @Res() res,
    @Body() body: SearchDURInfoReqDto[],
  ): Promise<any> {
    // this.printLoggerServiceLog(params);
    return res.status(201).send(await this.mediService.searchDurInfo(body));
  }
}
