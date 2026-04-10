import { DomainEvent } from '../events';
import { IUserRepository } from '../repositories/user.repository';
import { IProjectRepository } from '../repositories/project.repository';
import { IMachineRepository } from '../repositories/machine.repository';
import { Notification } from './types';
import { handleMachineMoved } from './handlers/machine-moved.handler';
import { handleOOSReportBatchCreated } from './handlers/oos-report-batch.handler';
import { handleDocumentsExpiring } from './handlers/documents-expiring.handler';

const handlers = {
    MachineMoved: (event: DomainEvent, users: IUserRepository, _projects: IProjectRepository, machines: IMachineRepository) =>
        handleMachineMoved(event as any, users),
    OOSReportBatchCreated: (event: DomainEvent, users: IUserRepository) =>
        handleOOSReportBatchCreated(event as any, users),
    DocumentsExpiring: (event: DomainEvent, users: IUserRepository, _projects: IProjectRepository, machines: IMachineRepository) =>
        handleDocumentsExpiring(event as any, machines, users),
};

export function processEvent(
    event: DomainEvent,
    users: IUserRepository,
    projects: IProjectRepository,
    machines: IMachineRepository
): Notification[] {
    const handler = handlers[event['detail-type']];
    return handler(event, users, projects, machines);
}