CREATE TABLE ticket_av (
        id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
        valid_from DATETIME NOT NULL DEFAULT NOW(),
        valid_to DATETIME NOT NULL DEFAULT '2038-01-19 03:14:07.999999',
        title VARCHAR(200) NOT NULL,
        description TEXT NOT NULL,
        state ENUM("OPEN", "IN PROGRESS", "FIXED", "INVALID") NOT NULL DEFAULT("OPEN"),
        PERIOD FOR time_period(valid_from, valid_to)
);
