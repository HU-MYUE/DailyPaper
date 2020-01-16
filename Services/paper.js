import query from '../util/sqlProcess';


// eslint-disable-next-line import/prefer-default-export
export function queryPaperListByGroup(data) {
  const sql = 'select * from daily_paper where user_id= ?';
  const sqlParams = [data];
  return query(sql, sqlParams);
}
