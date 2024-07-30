use hrdb2019;

CREATE TABLE mytour_table (
    tid INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(30) NOT NULL
);

select * from mytour_table;
drop table mytour_table;