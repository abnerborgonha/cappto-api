import { downloadCetesbCompanies } from './download-cetesb-companies.ts';
import { extractCetesbCompanies } from './extract-cetesb-companies.ts';

export type CetesbService = {
  month: number;
  year: number;
};

export async function cetesbService({ month, year }: CetesbService) {
  const storage = await downloadCetesbCompanies({ month, year });

  if (!storage) {
    throw new Error('storage not found');
  }

  const { bucketName, path } = storage;
  const bruteDate = await extractCetesbCompanies({
    bucketName,
    path,
  });

  // biome-ignore lint/suspicious/noConsole: test
  console.log(bruteDate);
}
