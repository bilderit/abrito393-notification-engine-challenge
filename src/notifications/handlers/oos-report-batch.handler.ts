import { OOSReportBatchCreatedEvent } from '../../events';
import { IUserRepository } from '../../repositories/user.repository';
import { Notification } from '../types';

export function handleOOSReportBatchCreated(
    event: OOSReportBatchCreatedEvent,
    users: IUserRepository
): Notification[] {
    const uniqueProjectIds = [
        ...new Set(event.detail.reports.map((report) => report.project_id)),
    ];

    return uniqueProjectIds.flatMap((projectId) => {
        const managers = users.getUsersByRoleInProject(projectId, 'project_manager');
        return managers.map((user) => ({
            recipient_id: user.id,
            event_type: 'OOSReportBatchCreated',
        }));
    });
}