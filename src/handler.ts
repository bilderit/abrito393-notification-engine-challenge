import { parseEvent, DomainEvent } from './events';

// This is the entry point. It receives a raw payload (e.g. from EventBridge),
// parses and validates it, then passes the typed event to your implementation.
//
// How you fill the gap below is your decision.
// No specific class name, method signature, or pattern is required.

export function handler(rawEvent: unknown): unknown {
  const event: DomainEvent = parseEvent(rawEvent);

  // TODO: wire your solution here
  // Given `event`, return a list of notifications.
  // Each notification should describe who should be notified and what happened.
  throw new Error('Not implemented');
}
