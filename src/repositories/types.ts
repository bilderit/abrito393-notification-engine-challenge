export type Role = 'site_supervisor' | 'project_manager' | 'company_admin';

export type User = {
  id: string;
  email: string;
  roles: Role[];
  company_id: string;
  project_ids: string[];
};

export type Project = {
  id: string;
  name: string;
  company_id: string;
};

export type Machine = {
  id: string;
  name: string;
  project_id: string;
  company_id: string;
};
