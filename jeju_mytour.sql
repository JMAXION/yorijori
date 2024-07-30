use hrdb2019;

CREATE TABLE mytour_table (
    tid INT PRIMARY KEY AUTO_INCREMENT,
    user_id VARCHAR(30) NOT NULL,
    CONSTRAINT fk_mytour_table_user_id FOREIGN KEY (user_id) REFERENCES jeju_member(user_id)
);


select * from mytour_table;
drop table mytour_table;