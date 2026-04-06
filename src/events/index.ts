import { z } from 'zod';
import { MachineMovedEventSchema } from './machine-moved.event';
import { OOSReportBatchCreatedEventSchema } from './oos-report-batch.event';
import { DocumentsExpiringEventSchema } from './documents-expiring.event';

export * from './machine-moved.event';
export * from './oos-report-batch.event';
export * from './documents-expiring.event';

const DomainEventSchema = z.discriminatedUnion('detail-type', [
  MachineMovedEventSchema,
  OOSReportBatchCreatedEventSchema,
  DocumentsExpiringEventSchema,
]);

export type DomainEvent = z.infer<typeof DomainEventSchema>;

export function parseEvent(raw: unknown): DomainEvent {
  return DomainEventSchema.parse(raw);
}
