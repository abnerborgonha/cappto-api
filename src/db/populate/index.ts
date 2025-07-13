import { db, sql } from '../../db/connection.ts';
import { schema } from '../../db/schema/index.ts';

export async function populate() {
  await db.insert(schema.providers).values({
    fullName: 'CETESB - Comanhia Ambiental do Estado de São Paulo',
    acronym: 'cetesb',
    stateCode: 'sp',
    status: 'ACTIVE',
    websiteUrl: 'https://cetesb.sp.gov.br/',
    apiBaseUrl: 'https://cetesb.sp.gov.br/wp-content/uploads',
    metadata: {
      bucket_name: 'cappto-prod-cetesb-brute-files',
      path_file_template: 'cetesb-brute-file-{date}',
      url_template: '{baseUrl}/{year}/{month}/Licencas-Solicitadas-{monthName}-{year}.xlsx'
    }
  });
  sql.end();
}

populate();

