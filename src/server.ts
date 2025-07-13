import { fastifyCors } from '@fastify/cors';
import { fastify } from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';

import { env } from '@/env.ts';
import { searchCompanies } from '@/http/routes/search-companies.ts';
import { globalErrorHandler } from './errors/global-error-api.ts';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: '*',
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.setErrorHandler(globalErrorHandler);

app.get('/health', () => {
  return { status: 'ok' };
});
app.register(searchCompanies);

app.listen({ port: env.PORT }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }

  if (env.NODE_ENV === 'development') {
    // biome-ignore lint/suspicious/noConsole: Dev only use
    console.log(`✨ Captto server is now listening on ${address}/health`);
  }
});
