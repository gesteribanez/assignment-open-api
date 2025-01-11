import { Controller, Get, Query } from '@nestjs/common';
import { ExchangeRatesService } from './exchange-rates.service';

@Controller('exchange-rates')
export class ExchangeRatesController {
    constructor(private readonly exchangeRatesService: ExchangeRatesService) {}

    @Get('latest')
    async getLatestRates(
      @Query('base') base: string,
      @Query('symbols') symbols: string,
    ) {
      return this.exchangeRatesService.getLatestRates(base, symbols);
    }

    @Get('historical')
    async getHistoricalRates(
        @Query('date') date: string,
        @Query('base') base: string,
        @Query('symbols') symbals: string,
    ) {
        return this.exchangeRatesService.getHistoricalRate(date, base, symbals)
    }
}
