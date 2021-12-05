CREATE TABLE ticket_sv (
        id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
        inserted_at TIMESTAMP(6) GENERATED ALWAYS AS ROW START,
        deleted_at TIMESTAMP(6) GENERATED ALWAYS AS ROW END,
        title VARCHAR(200) NOT NULL,
        description TEXT NOT NULL,
        state ENUM("OPEN", "IN PROGRESS", "FIXED", "INVALID") NOT NULL DEFAULT("OPEN"),
        PERIOD FOR SYSTEM_TIME(inserted_at, deleted_at)
) WITH SYSTEM VERSIONING;

INSERT INTO ticket_sv(title, description)
VALUES
        ('Test Ticket 1', 'Right now something is not working'),
        ('Test Ticket 2', 'Right now something is not working'),
        ('Test Ticket 3', 'Right now something is not working')
;
