import { Role, User } from './types';

export interface IUserRepository {
  getUsersByRoleInProject(projectId: string, role: Role): User[];
  getUsersByRoleInCompany(companyId: string, role: Role): User[];
  getById(id: string): User | undefined;
}

const SEED_USERS: User[] = [
  {
    id: 'u1',
    email: 'supervisor@example.com',
    roles: ['site_supervisor'],
    company_id: 'c1',
    project_ids: ['p1'],
  },
  {
    id: 'u2',
    email: 'pm1@example.com',
    roles: ['project_manager'],
    company_id: 'c1',
    project_ids: ['p1'],
  },
  {
    id: 'u3',
    email: 'pm2@example.com',
    roles: ['project_manager'],
    company_id: 'c1',
    project_ids: ['p2'],
  },
  {
    id: 'u4',
    email: 'multi@example.com',
    roles: ['site_supervisor', 'project_manager'],
    company_id: 'c1',
    project_ids: ['p3'],
  },
  {
    id: 'u5',
    email: 'admin@example.com',
    roles: ['company_admin'],
    company_id: 'c1',
    project_ids: [],
  },
];

export class FakeUserRepository implements IUserRepository {
  getUsersByRoleInProject(projectId: string, role: Role): User[] {
    return SEED_USERS.filter(
      (u) => u.roles.includes(role) && u.project_ids.includes(projectId)
    );
  }

  getUsersByRoleInCompany(companyId: string, role: Role): User[] {
    return SEED_USERS.filter(
      (u) => u.roles.includes(role) && u.company_id === companyId
    );
  }

  getById(id: string): User | undefined {
    return SEED_USERS.find((u) => u.id === id);
  }
}
