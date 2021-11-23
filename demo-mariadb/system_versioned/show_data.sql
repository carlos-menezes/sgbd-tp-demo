-- Ver versão atual dos tuplos.
-- Os dados históricos não são visíveis.
SELECT *
FROM ticket_sv;

-- Ver histórico de um tuplo.
SELECT state, inserted_at, deleted_at
FROM ticket_sv FOR SYSTEM_TIME ALL
WHERE id = 2
ORDER BY deleted_at;

-- Ver estado de dos tuplos num ponto específico do tempo.
SELECT id, state
FROM ticket_sv FOR SYSTEM_TIME AS OF TIMESTAMP CURRENT_TIMESTAMP - INTERVAL 50 SECOND;
