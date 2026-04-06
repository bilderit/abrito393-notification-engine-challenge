import { handler } from '../handler';

// These tests assert on BEHAVIOR, not on specific class names or method signatures.
// Use them as your acceptance criteria. You may add more tests.

describe('MachineMoved', () => {
  it('notifies the site supervisor of the destination project', () => {
    const result = handler({
      source: 'core.company',
      'detail-type': 'MachineMoved',
      detail: {
        machine_id: 'm3',
        from_project_id: 'p2',
        to_project_id: 'p1',
      },
    }) as Array<{ recipient_id: string }>;

    // u1 is the site supervisor of p1
    expect(result).toHaveLength(1);
    expect(result[0].recipient_id).toBe('u1');
  });
});

describe('OOSReportBatchCreated', () => {
  it('notifies the project manager of each affected project — one notification per project', () => {
    const result = handler({
      source: 'core.reports',
      'detail-type': 'OOSReportBatchCreated',
      detail: {
        reports: [
          { machine_id: 'm1', project_id: 'p1', date: '2026-04-06' },
          { machine_id: 'm2', project_id: 'p1', date: '2026-04-06' }, // same project — only one notification
          { machine_id: 'm3', project_id: 'p2', date: '2026-04-06' },
        ],
      },
    }) as Array<{ recipient_id: string }>;

    // u2 is PM of p1, u3 is PM of p2 — 2 notifications total despite 3 machines
    expect(result).toHaveLength(2);
    expect(result.map((n) => n.recipient_id).sort()).toEqual(['u2', 'u3']);
  });
});

describe('DocumentsExpiring', () => {
  it('notifies company admin(s) — one notification per company with all documents in payload', () => {
    const result = handler({
      source: 'core.documentation',
      'detail-type': 'DocumentsExpiring',
      detail: {
        documents: [
          {
            machine_id: 'm1',
            document_type: 'insurance',
            expiry_date: '2026-04-30',
          },
          {
            machine_id: 'm3',
            document_type: 'inspection',
            expiry_date: '2026-05-01',
          },
        ],
      },
    }) as Array<{ recipient_id: string; payload: unknown }>;

    // u5 is company_admin of c1 — both machines belong to c1
    expect(result).toHaveLength(1);
    expect(result[0].recipient_id).toBe('u5');
    expect(result[0].payload).toMatchObject({
      documents: expect.arrayContaining([
        expect.objectContaining({ machine_id: 'm1' }),
        expect.objectContaining({ machine_id: 'm3' }),
      ]),
    });
  });
});
