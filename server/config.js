import mysql from "mysql2";

export const db = mysql.createPool({
  host: "lordnl69.beget.tech",
  user: "lordnl69_dota2",
  password: "111Dota2",
  database: "lordnl69_dota2"
});