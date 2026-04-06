import { MachineMovedEvent } from '../../events';
import { IUserRepository } from '../../repositories/user.repository';
import { Notification } from '../types';

export function handleMachineMoved(
    event: MachineMovedEvent,
    users: IUserRepository
): Notification[] {
    const supervisors = users.getUsersByRoleInProject(
        event.detail.to_project_id,
        'site_supervisor'
    );

    return supervisors.map((user) => ({
        recipient_id: user.id,
        event_type: 'MachineMoved',
    }));
}