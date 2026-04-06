import { z } from 'zod';

export const DocumentsExpiringEventSchema = z.object({
  source: z.literal('core.documentation'),
  'detail-type': z.literal('DocumentsExpiring'),
  detail: z.object({
    documents: z.array(
      z.object({
        machine_id: z.string(),
        document_type: z.string(),
        expiry_date: z.string(),
      })
    ),
  }),
});

export type DocumentsExpiringEvent = z.infer<
  typeof DocumentsExpiringEventSchema
>;
