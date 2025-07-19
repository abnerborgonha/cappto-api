import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import { BadRequestError } from '@/errors/error-classes.ts';
import { cetesbService } from '@/services/cetesb/index.ts';

const selectedProvider = {
  cetesb: cetesbService,
};

export const searchCompanies: FastifyPluginCallbackZod = (app) => {
  app.get(
    '/search/:provider/companies',
    {
      schema: {
        params: z.object({
          provider: z.enum(['cetesb']),
        }),
        querystring: z.object({
          year: z.string(),
          month: z.string(),
        }),
      },
    },
    async (request, replay) => {
      const { params, query } = request;

      const executeProvider = selectedProvider[params.provider];

      if (!executeProvider) {
        throw new BadRequestError('Provider not found');
      }

      const result = await executeProvider({
        year: Number(query.year),
        month: Number(query.month),
      });

      return replay.status(201).send(result);
    }
  );
};
