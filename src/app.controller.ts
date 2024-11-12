import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('API Information')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get API information' })
  @ApiResponse({ status: 200, description: 'Returns basic API information' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  getApiInfo() {
    try {
      return this.appService.getApiInfo();
    } catch (error: any) {
      throw new HttpException(
        `Failed to retrieve API information: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('health')
  @ApiOperation({ summary: 'Check API health' })
  @ApiResponse({ status: 200, description: 'Returns health check information' })
  async getHealthCheck() {
    try {
      return await this.appService.getHealthCheck();
    } catch (error: any) {
      throw new HttpException(
        `Health check failed: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('docs')
  @ApiOperation({ summary: 'Get API documentation' })
  @ApiResponse({ status: 200, description: 'Returns API documentation' })
  getApiDocumentation() {
    try {
      return this.appService.getApiDocumentation();
    } catch (error: any) {
      throw new HttpException(
        `Failed to retrieve API documentation: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
