import { query } from '../util/sqlProcess';


export function queryPaperListByGroup(data) {
  const sql = 'select * from daily_paper where user_id= ?';
  const sqlParams = [data];
  return query(sql, sqlParams);
}

export function getPaperByUserId() {}
