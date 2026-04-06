import { Project } from './types';

export interface IProjectRepository {
  getById(id: string): Project | undefined;
}

const SEED_PROJECTS: Project[] = [
  { id: 'p1', name: 'Highway Extension', company_id: 'c1' },
  { id: 'p2', name: 'Bridge Repair', company_id: 'c1' },
  { id: 'p3', name: 'Tunnel Phase 2', company_id: 'c1' },
];

export class FakeProjectRepository implements IProjectRepository {
  getById(id: string): Project | undefined {
    return SEED_PROJECTS.find((p) => p.id === id);
  }
}
