import db from './DBHelp';

export function query(sql, sqlParams) {
  return new Promise((resolve, reject) => {
    db.query(sql, sqlParams, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

export function insert() {}
