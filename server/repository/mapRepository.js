import { db } from "../database/database_mysql80.js";

export const getMap = async () => {
  const sql = `
  select 
  id, name, latitude, longitude, province, city, address,category, detailed_category, information, img 
  from jeju_tour_table
  `;
  return db.execute(sql).then((result) => result[0]);
};
