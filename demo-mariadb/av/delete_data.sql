-- Os dados não são propriamente removidos.
-- O que acontece na realidade é que o valor `ticket.valid_to` é atualizado para `NOW()`.
UPDATE ticket_av
SET ticket_av.valid_to = NOW()
WHERE ticket_av.id = 2 AND ticket_av.valid_to > NOW();

-- O histórico é "apagado".
DELETE FROM ticket_av 
FOR PORTION OF time_period FROM '1990-01-01' TO '2021-11-14 23:11:11'
WHERE ticket_av.id = 1; -- Desnecessário aqui mas serve apenas para mostrar
