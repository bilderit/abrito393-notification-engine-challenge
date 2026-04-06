import { z } from 'zod';

export const OOSReportBatchCreatedEventSchema = z.object({
  source: z.literal('core.reports'),
  'detail-type': z.literal('OOSReportBatchCreated'),
  detail: z.object({
    reports: z.array(
      z.object({
        machine_id: z.string(),
        project_id: z.string(),
        date: z.string(),
      })
    ),
  }),
});

export type OOSReportBatchCreatedEvent = z.infer<
  typeof OOSReportBatchCreatedEventSchema
>;
