/**
 * Des:板块项目组管理Controller
 * CreatrBy:humy
 * Date:20200116
 */
import groupService from '../Services/groupServices';

/**
 * 返回的状态信息
 */
const resultData = {
  status: '',
  msg: '',
  data: ''
};

// 处理数据库操作成功后
const handleResultSuccess = (response, result) => {
  resultData.status = result.status || null;
  resultData.msg = result.msg || null;
  resultData.data = result.data || null;
  response.end(JSON.stringify(resultData));
};

// 处理失败
const handleResultError = (response, error) => {
  resultData.status = error.status;
  resultData.data = '';
  resultData.msg = error.msg;
  response.end(JSON.stringify(resultData));
};

export function userList(req, res) {
  // 处理逻辑 ...
  res.send('NOT IMPLEMENTED: User list');
}

/**
 * 查询板块，项目组
 * @param request
 * @param response
 * @param next
 */
export function groupSearch(request, response) {
  const data = request.query.group_id;
  const rd = {};
  groupService
    .queryListDataPromise(data)
    .then((result) => {
      console.log(result.data);
      rd.status = result.status;
      rd.msg = result.msg;
      if (result.data.length > 0) {
        rd.data = result.data;
      } else {
        rd.data = '';
      }
      handleResultSuccess(response, rd);
    })
    .catch((err) => {
      rd.status = err.status;
      rd.msg = err.msg;
      handleResultError(response, rd);
    });
}

/**
 * 添加板块，项目组
 * @param request
 * @param response
 * @param next
 */
export function groupAdd(request, response) {
  //const data = request.query(group_name,project_name),
  const data = request.query;
  const rd = {};
  groupService
    .addDataPromise(data)
    .then((result) => {
      console.log(result.data);
      rd.status = result.status;
      rd.msg = result.msg;
      if (result.data.length > 0 ) {
        rd.data = result.data;
      } else {
         rd.data = '';
        //rd.data = result.data;
      }
      handleResultSuccess(response, rd);
    })
    .catch((err) => {
      rd.status = err.status;
      rd.msg = err.msg;
      handleResultError(response, rd);
    });
}
/**
 * 删除板块，项目组
 * @param request
 * @param response
 * @param next
 */
export function groupDelete(request, response) {
  const data = request.query.group_name;
  const rd = {};
  groupService
    .deleteDataPromise(data)
    .then((result) => {
      console.log(result.data);
      rd.status = result.status;
      rd.msg = result.msg;
      if (result.data.length > 0) {
        rd.data = result.data;
      } else {
        rd.data = '';
      }
      handleResultSuccess(response, rd);
    })
    .catch((err) => {
      rd.status = err.status;
      rd.msg = err.msg;
      handleResultError(response, rd);
    });
}

/**
 * 修改板块，项目组
 * @param request
 * @param response
 * @param next
 */
export function groupUpdate(request, response) {
  const data = request.query;
  const rd = {};
  groupService
    .updateDataPromise(data)
    .then((result) => {
      console.log(result.data);
      rd.status = result.status;
      rd.msg = result.msg;
      if (result.data.length > 0) {
        rd.data = result.data;
      } else {
        rd.data = '';
      }
      handleResultSuccess(response, rd);
    })
    .catch((err) => {
      rd.status = err.status;
      rd.msg = err.msg;
      handleResultError(response, rd);
    });
}
