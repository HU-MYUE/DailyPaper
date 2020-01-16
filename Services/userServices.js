import query from '../util/sqlProcess';

const userService = {
  // 查询最新的数据
  queryListDataPromise(data) {
    console.log(`获取传参===${data}`);
    const sql = 'select * from user_info  where user_name= ?';
    const sqlParams = [data];
    return query(sql, sqlParams);
  },
};
export default userService;
