DROP DATABASE IF EXISTS life_guardian;
CREATE DATABASE life_guardian;
USE life_guardian;

DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users(
    user_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(60) NOT NULL,
    email VARCHAR(60) NOT NULL,
    password longtext NOT NULL,
    PRIMARY KEY (user_id)
);
DROP TABLE IF EXISTS monitors;
CREATE TABLE IF NOT EXISTS monitors(
    monitor_id INT NOT NULL,
    user_id INT NOT NULL,
    title VARCHAR(60) NOT NULL,
    PRIMARY KEY (monitor_id)
);
DROP TABLE IF EXISTS info;
CREATE TABLE IF NOT EXISTS info(
    info_id INT NOT NULL AUTO_INCREMENT,
    monitor_id INT NOT NULL,
    temperature INT NOT NULL,
    humidity INT NOT NULL,
    movement BOOLEAN DEFAULT(0) NOT NULL,
    currentdate TIMESTAMP DEFAULT(CURRENT_TIMESTAMP) NOT NULL,
    PRIMARY KEY (info_id)
);

ALTER TABLE monitors ADD CONSTRAINT FK_UsersMonitors FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE info ADD CONSTRAINT FK_MonitorsData FOREIGN KEY (monitor_id) REFERENCES monitors(monitor_id) ON DELETE NO ACTION ON UPDATE CASCADE;