import { months } from '@/utils/months.pt.ts';
import { supplant } from '@/utils/supplant.ts';

export type CetesbProviderParams = {
  baseUrl: string;
  urlTemplate: string;
  year: number;
  month: number;
};

export class CetesbProvider {
  private baseUrl: string;
  private urlTemplate: string;
  private month: number;
  private year: number;
  static months: typeof months = months;

  constructor({ baseUrl, urlTemplate, month, year }: CetesbProviderParams) {
    this.baseUrl = baseUrl;
    this.urlTemplate = urlTemplate;
    this.month = month;
    this.year = year;
  }

  #generateCetesbUrl(): string {
    const nameOfMonth = CetesbProvider.months[this.month - 1];
    const publicationMonth = String(this.month + 1).padStart(2, '0');

    return supplant(this.urlTemplate, {
      baseUrl: this.baseUrl,
      year: String(this.year),
      month: publicationMonth,
      monthName: nameOfMonth,
    });
  }

  getUrl(): string {
    return this.#generateCetesbUrl();
  }
}
