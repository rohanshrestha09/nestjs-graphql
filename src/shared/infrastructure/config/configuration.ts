import { z } from 'zod';

const validationSchema = z.object({
  PORT: z
    .string()
    .default('3000')
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().int().positive()),
  MONGODB_URI: z.url(),
  RABBITMQ_URI: z.url(),
  RABBITMQ_QUEUE: z.string(),
  SENDGRID_API_KEY: z.string(),
  THROTTLE_TTL: z
    .string()
    .default('60000')
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().int().positive()),
  THROTTLE_LIMIT: z
    .string()
    .default('100')
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().int().positive()),
});

export function validateConfiguration(config: Record<string, unknown>) {
  const result = validationSchema.safeParse(config);
  if (!result.success) {
    throw new Error(z.prettifyError(result.error));
  }

  const data = result.data;

  return {
    port: data.PORT,
    database: {
      mongodb: {
        uri: data.MONGODB_URI,
      },
    },
    messaging: {
      rabbitmq: {
        uri: data.RABBITMQ_URI,
        queue: data.RABBITMQ_QUEUE,
      },
    },
    email: {
      sendgrid: {
        apiKey: data.SENDGRID_API_KEY,
      },
    },
    throttling: {
      ttl: data.THROTTLE_TTL,
      limit: data.THROTTLE_LIMIT,
    },
  };
}

export type Configuration = ReturnType<typeof validateConfiguration>;
