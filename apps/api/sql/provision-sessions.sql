DROP TABLE IF EXISTS user;

CREATE TABLE user (
    id TEXT NOT NULL PRIMARY KEY
);

INSERT INTO user (id) VALUES ('1');

DROP TABLE IF EXISTS session;

CREATE TABLE session (
    id TEXT NOT NULL PRIMARY KEY,
    expires_at INTEGER NOT NULL,
    user_id TEXT NOT NULL,
    chainId INTEGER,
    FOREIGN KEY (user_id) REFERENCES user(id)
);
