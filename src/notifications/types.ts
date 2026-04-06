export type Notification = {
    recipient_id: string;
    event_type: string;
    payload?: unknown;
};