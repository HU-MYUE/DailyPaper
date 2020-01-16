/**
 * Des:连接mySql数据库
 * CreateBy：hangzt
 * Date:20200115
 */
import mysql from 'mysql';
import { Log } from '../logBack';

const pool = mysql.createPool({
  queueLimit: 5,
  connectionLimit: 10,
  host: '115.238.251.115',
  user: 'user',
  password: 'password',
  database: 'app',
});

function getConnect() {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        resolve(connection);
      }
    });
  });
}

export default function query(sql, sqlParams) {
  return new Promise((resolve, reject) => {
    getConnect().then((conn) => {
      conn.query(sql, sqlParams, (err, results, fields) => {
        if (err) {
          reject(err);
        } else {
          resolve({ results, fields });
        }
        // 释放连接
        if (conn) {
          conn.release();
        }
      });
    }).catch((reason) => {
      Log.error('get connection err from pool', reason);
    });
  });
}
