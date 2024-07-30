use hrdb2019;
/*
요리죠리 프로젝트 관련 테이블
1) jeju_member : 회원가입, 로그인, 아이디중복체크
*/
-- 입력폼의 name = 서버 = 테이블의 column 이름

-- jeju_member
drop table jeju_member;
create table jeju_member(
uid INT auto_increment primary key,
user_id varchar(30) not null,
user_pass varchar(80) not null,
user_name varchar(10) not null,
email_id varchar(20) not null,
email_domain varchar(20) not null,
phone char(13) not null,
zipcode char(5),
address  varchar(40),
signup_date datetime
);
insert into jeju_member(user_id, user_pass, user_name, email_id, email_domain, phone) values('test', '1234', 'test', 'test','naver.com','01012341234'); 
drop table jeju_member;
show tables;
-- shoppy 시작하는 모든 테이블 조회 : information)schema.tables
select * from information_schema.tables where table_name like 'jeju%';

desc jeju_member;
select * from jeju_member;
select count(user_id) user_id from jeju_member where user_id = 'test';

-- shoppy_member의 user_pass column 사이즈를 varchar(80)으로 변경
desc jeju_member;

-- 아이디 중복체크
select count(user_id) cnt from jeju_member where user_id = 'alter';

select user_id from jeju_member
where user_id = 'test123';


-- 로그인 (any_value(user_pass) user_pass 라고 예전에는 사용했음)
select count(user_id) cnt, any_value(user_pass) user_pass, any_value(user_name) user_name from jeju_member where user_id = 'test';

delete from jeju_member where user_id = "test";

