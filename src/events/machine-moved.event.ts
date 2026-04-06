import { z } from 'zod';

export const MachineMovedEventSchema = z.object({
  source: z.literal('core.company'),
  'detail-type': z.literal('MachineMoved'),
  detail: z.object({
    machine_id: z.string(),
    from_project_id: z.string(),
    to_project_id: z.string(),
  }),
});

export type MachineMovedEvent = z.infer<typeof MachineMovedEventSchema>;
