import { supabase } from '@/lib/supabase.ts';
import { xlsxToJson } from '@/lib/xlsx.ts';

export type BruteCetesbData = {
  __EMPTY: number;
  __EMPTY_1: number;
  __EMPTY_2: string;
  __EMPTY_3: string;
  __EMPTY_4: number;
  __EMPTY_5: string;
  __EMPTY_6: string;
  __EMPTY_7: string;
  __EMPTY_8: string;
};

export async function extractCetesbCompanies({
  bucketName,
  path,
}: {
  bucketName: string;
  path: string;
}): Promise<BruteCetesbData[]> {
  try {
    const { data } = await supabase.storage.from(bucketName).download(path);
    if (!data) {
      throw new Error('Not found file');
    }

    const buffer = Buffer.from(await data.arrayBuffer());

    const jsonData = xlsxToJson<BruteCetesbData>(buffer);

    return jsonData;
  } catch (error) {
    throw error as Error;
  }
}
