-- Ver versão atual dos tuplos.
-- Os dados históricos não são visíveis.
SELECT *
FROM ticket_sv;

-- Ver dados atuais e respetivos tempos de inserção/eliminação.
SELECT *, inserted_at, deleted_at
FROM ticket_sv;

-- Todos os dados (atuais e históricos).
SELECT *, inserted_at, deleted_at
FROM ticket_sv FOR SYSTEM_TIME ALL;

-- Ver histórico de um tuplo.
SELECT id, state, inserted_at, deleted_at
FROM ticket_sv FOR SYSTEM_TIME ALL
WHERE id = 2
ORDER BY deleted_at;

-- Ver estado de uma linha num ponto específico do tempo.
SELECT id, state
FROM ticket_sv FOR SYSTEM_TIME AS OF TIMESTAMP CURRENT_TIMESTAMP
WHERE id = 3;
