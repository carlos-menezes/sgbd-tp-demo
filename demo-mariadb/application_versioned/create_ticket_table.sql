CREATE TABLE ticket_av (
        id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
        valid_from DATETIME NOT NULL, -- DEFAULT NOW(),
        valid_to DATETIME NOT NULL DEFAULT '9999-12-31 23:59:59',
        title VARCHAR(200) NOT NULL,
        description TEXT NOT NULL,
        state ENUM("OPEN", "IN PROGRESS", "FIXED", "INVALID") NOT NULL DEFAULT("OPEN"),
        PERIOD FOR time_period(valid_from, valid_to)
);
