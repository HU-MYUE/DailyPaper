import mysqlConn from '../util/DBHelp';

const groupService = {
  // 查询最新的数据
  queryListDataPromise(data) {
    console.log(`获取传参===${data}`);
    const promiseObj = new Promise((resolve, reject) => {
      const sql = 'select * from group_info where group_id = ?';
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

  // 添加group数据
  addDataPromise(data) {
    //console.log(`获取传参===${data}`);
    console.log(`获取传参===${data}`);
    const jsonData = JSON.stringify(data);// 转成JSON格式
    console.log(jsonData);
    const promiseObj = new Promise((resolve, reject) => {
      //const sql = 'select * from group_info  where group_name= ?';
      const sql = `insert into group_info(group_name,project_name) values (${data.group_name},${data.project_name})`;
      console.log(sql);
      // const sqlParams = [jsonData];
      mysqlConn.query(sql, (err, results) => {
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
            msg: '添加成功',
            data: results,
          });
        }
      });
    });

    return promiseObj;
  },


// 删除数据
deleteDataPromise(data) {
  console.log(`获取传参===${data}`);
  const promiseObj = new Promise((resolve, reject) => {
    const sql = 'delete from group_info  where group_name= ?';
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
          msg: '删除成功',
          data: results,
        });
      }
    });
  });

  return promiseObj;
},

  // 修改数据
  updateDataPromise(data) {
    console.log(`获取传参===${data}`);
    const jsonData = JSON.stringify(data);// 转成JSON格式
    console.log(jsonData)
    const promiseObj = new Promise((resolve, reject) => {
      const sql = `update  group_info  set  group_name = ${data.group_name}, project_name = ${data.project_name} where group_id = ${data.group_id}`

     // const sqlParams = [data];
      mysqlConn.query(sql,(err, results) => {
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
            msg: '修改成功',
            data: results,
          });
        }
      });
    });

    return promiseObj;
  },
};
module.exports = groupService;
