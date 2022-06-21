import { Controller, Get, Req, Res } from '@nestjs/common';

@Controller('/aws')
export class AwsController {
  constructor() {}

  @Get('/health-check')
  getHealthCheck(@Req() req, @Res() res): any {
    return res.status(200).send('');
  }
}
