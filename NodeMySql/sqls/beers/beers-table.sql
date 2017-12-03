CREATE TABLE IF NOT EXISTS beers (
    id          INT UNSIGNED AUTO_INCREMENT,
    name        VARCHAR(120) NOT NULL,
    style       VARCHAR(120) NOT NULL,
    abv         DOUBLE NOT NULL,
    ibu         DOUBLE NOT NULL,
    description BLOB,

    PRIMARY KEY ( id )
);