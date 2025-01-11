import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { format } from 'date-fns';

@Injectable()
export class ExchangeRatesService {
    private baseUrl = 'http://api.exchangeratesapi.io/v1';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getLatestRates(base: string, symbols: string): Promise<any> {
    const url = `${this.baseUrl}/latest`;
    const params = {
      access_key: this.configService.get<string>('EXCHANGERATES_API_KEY'),
      base,
      symbols,
    };

    const response = this.httpService.get(url, { params });
    const result = await lastValueFrom(response).then((res) => res.data);
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Exchange Rates</title>
    </head>
    <body>
      <h1>Latest Exchange Rates</h1>
      <p>Base: ${base}</p>
      <p>Date: ${format(new Date(result.date), 'MMMM d, yyyy')}</p>
      <p>Rates:</p>
        <ul>
            ${Object.keys(result.rates)
            .map((key) => `<li>${key}: ${result.rates[key]}</li>`)
            .join('')}
        </ul>
    </body>
    </html>
    `;
  }
}
