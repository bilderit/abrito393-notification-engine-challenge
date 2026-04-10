import { DocumentsExpiringEvent } from '../../events';
import { IMachineRepository } from '../../repositories/machine.repository';
import { IUserRepository } from '../../repositories/user.repository';
import { Notification } from '../types';

export function handleDocumentsExpiring(
    event: DocumentsExpiringEvent,
    machines: IMachineRepository,
    users: IUserRepository
): Notification[] {
    const documentsByCompany = new Map<string, typeof event.detail.documents>();

    for (const document of event.detail.documents) {
        const machine = machines.getById(document.machine_id);
        if (!machine) continue;

        const existing = documentsByCompany.get(machine.company_id) ?? [];
        documentsByCompany.set(machine.company_id, [...existing, document]);
    }

    return [...documentsByCompany.entries()].flatMap(([companyId, documents]) => {
        const admins = users.getUsersByRoleInCompany(companyId, 'company_admin');
        return admins.map((user) => ({
            recipient_id: user.id,
            event_type: 'DocumentsExpiring',
            payload: { documents },
        }));
    });
}