import { db } from "../database/database_mysql80.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getIdCheck = async (userId) => {
  const sql = `
  select count(user_id) cnt from jeju_member where user_id = ?
  `;
  return db.execute(sql, [userId]).then((result) => result[0][0]);
};
export const getSignup = async (formData) => {
  console.log(formData);
  let result_rows = 0;
  const phone1 = formData.phoneNumber1;
  let phone2 = "";
  let phone3 = "";
  if (formData.phoneNumber2.length === 8) {
    phone2 = formData.phoneNumber2.slice(0, 4);
    phone3 = formData.phoneNumber2.slice(4);
  } else {
    phone2 = formData.phoneNumber2.slice(0, 3);
    phone3 = formData.phoneNumber2.slice(3);
  }
  console.log(formData);
  console.log(phone1.concat("-", phone2, "-", phone3));

  const params = [
    formData.userId,
    bcrypt.hashSync(formData.userPass, 7),
    formData.userName,
    formData.emailId,
    formData.emailDomain,
    phone1.concat("-", phone2, "-", phone3),
    formData.zipcode,
    formData.address.concat("", formData.detailAddress),
  ];
  const sql = `
  insert into jeju_member(
    user_id,
    user_pass,
    user_name,
    email_id,
    email_domain,
    phone,
    zipcode,
    address,
    signup_date
  ) 
    values(
      ?, 
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      now()
    )
  `;
  try {
    const [result] = await db.execute(sql, params);
    result_rows = result.affectedRows;
    console.log("rows -->", result.affectedRows);
  } catch (error) {
    console.log(error);
  }

  return { cnt: result_rows };
};
export const getLogin = async (userId, userPass) => {
  let login_result = 0;
  let login_token = "";
  const sql = `
  select count(user_id) cnt, any_value(user_pass) user_pass
  from jeju_member where user_id = ?
  `;
  try {
    const [result] = await db.execute(sql, [userId]);
    console.log("result-->", result);
    if (result[0].cnt === 1) {
      if (bcrypt.compareSync(userPass, result[0].user_pass)) {
        login_result = 1;
        login_token = jwt.sign({ userId: userId }, "dGVzdA==");
      }
    }
  } catch (error) {}
  return { cnt: login_result, token: login_token };
};
