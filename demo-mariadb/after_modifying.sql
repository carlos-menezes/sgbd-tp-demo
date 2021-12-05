SELECT state, inserted_at, deleted_at
FROM ticket_sv FOR SYSTEM_TIME ALL
WHERE id = 1;
