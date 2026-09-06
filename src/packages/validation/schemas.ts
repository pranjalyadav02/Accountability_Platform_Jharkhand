import { z } from 'zod';

export const PaginationSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(50),
});

export const SeedDemoDataSchema = z.object({
  districtCode: z.string().min(2).default('JH-RNC'),
  districtName: z.string().min(2).default('Ranchi'),
  adminEmail: z.string().email().default('admin@jharkhand.gov.in'),
});

export const AIModelQuerySchema = PaginationSchema.extend({
  status: z.enum(['EVALUATION', 'PRODUCTION', 'ARCHIVED']).optional(),
});
