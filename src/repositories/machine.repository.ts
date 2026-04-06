import { Machine } from './types';

export interface IMachineRepository {
  getById(id: string): Machine | undefined;
}

const SEED_MACHINES: Machine[] = [
  { id: 'm1', name: 'Excavator A', project_id: 'p1', company_id: 'c1' },
  { id: 'm2', name: 'Bulldozer B', project_id: 'p1', company_id: 'c1' },
  { id: 'm3', name: 'Crane C', project_id: 'p2', company_id: 'c1' },
  { id: 'm4', name: 'Grader D', project_id: 'p2', company_id: 'c1' },
  { id: 'm5', name: 'Loader E', project_id: 'p3', company_id: 'c1' },
];

export class FakeMachineRepository implements IMachineRepository {
  getById(id: string): Machine | undefined {
    return SEED_MACHINES.find((m) => m.id === id);
  }
}
