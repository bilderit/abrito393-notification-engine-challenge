import { parseEvent, DomainEvent } from './events';
import { FakeUserRepository } from './repositories/user.repository';
import { FakeProjectRepository } from './repositories/project.repository';
import { FakeMachineRepository } from './repositories/machine.repository';
import { processEvent } from './notifications/engine';

const users = new FakeUserRepository();
const projects = new FakeProjectRepository();
const machines = new FakeMachineRepository();

// This is the entry point. It receives a raw payload (e.g. from EventBridge),
// parses and validates it, then passes the typed event to your implementation.
//
// How you fill the gap below is your decision.
// No specific class name, method signature, or pattern is required.

export function handler(rawEvent: unknown): unknown {
  const event: DomainEvent = parseEvent(rawEvent);
  return processEvent(event, users, projects, machines);
}
