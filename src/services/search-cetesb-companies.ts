import { and, eq } from 'drizzle-orm';
import { db } from '@/db/connection.ts';
import { schema } from '@/db/schema/index.ts';
import { BadRequestError } from '@/errors/error-classes.ts';
import { axiosClient } from '@/lib/axios.ts';
import { supabase } from '@/lib/supabase.ts';
import { CetesbProvider } from '@/providers/cetesb.provider.ts';
import { supplant } from '@/utils/supplant.ts';

export type SearchCetesbCompaniesParams = {
  month: number;
  year: number;
};

export async function searchCetesbCompanies({
  month,
  year,
}: SearchCetesbCompaniesParams) {
  const result = await db
    .select({
      acronym: schema.providers.acronym,
      status: schema.providers.status,
      apiBaseUrl: schema.providers.apiBaseUrl,
      metadata: schema.providers.metadata,
    })
    .from(schema.providers)
    .where(
      and(
        eq(schema.providers.status, 'ACTIVE'),
        eq(schema.providers.acronym, 'cetesb')
      )
    );

  if (!result[0]) {
    throw new BadRequestError('Provider not found');
  }

  const provider = result[0];

  if (provider.apiBaseUrl && provider.metadata) {
    const cetesbProvider = new CetesbProvider({
      month,
      year,
      baseUrl: provider.apiBaseUrl,
      urlTemplate: provider.metadata.url_template,
    });

    const cetesbUrl = cetesbProvider.getUrl();

    const response = await axiosClient.downloadStream({ url: cetesbUrl });
    const bucketName = provider.metadata.bucket_name;
    const path = supplant(provider.metadata.path_file_template, {
      date: Date.now(),
    });

    const downloadStream = response.data;
    const contentType = response.headers['content-type'];

    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(path, downloadStream, {
        contentType: contentType || 'application/octet-stream',
        upsert: true,
        duplex: 'half',
      });

    if (error) {
      throw error;
    }

    const { data: publicUrlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(data.path);

    return publicUrlData.publicUrl;
  }
}
