import mysqlConn from '../util/DBHelp';

const userService = {
  // 查询最新的数据
  queryListDataPromise(data) {
    console.log(`获取传参===${data}`);
    const promiseObj = new Promise((resolve, reject) => {
      const sql = 'select * from user_info  where user_name= ?';
      const sqlParams = [data];
      mysqlConn.query(sql, sqlParams, (err, results) => {
        // 说明数据库错误
        if (err) {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({
            status: 501,
            msg: err.message,
          });
        } else {
          resolve({
            status: 200,
            msg: '查询成功',
            data: results,
          });
        }
      });
    });

    return promiseObj;
  },
};
export default userService;
