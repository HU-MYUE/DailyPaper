/**
 * Des:用户管理Controller
 * CreatrBy:hangzt
 * Date:20200115
 */
import md5 from 'md5-node';
import userService from '../Services/userServices';
import JwtUtil from '../util/jwt';
/**
 * 返回的状态信息
 */
const resultData = { status: '', msg: '', data: '' };

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

// 生成Token
export function userToken(req, res) {
  const id = '1111111';
  // 将用户id传入并生成token
  const jwt = new JwtUtil(id);
  const token = jwt.generateToken();
  console.log(token);
  // 处理逻辑 ...
  res.send(`Token:${token}`);
}

// Md5进行密码加密
export function userPassword(req, res) {
  const id = '1111111';
  console.log(md5(id));
  // 处理逻辑 ...
  res.send(`Password:${md5(id)}`);
}

/**
 * 查询用户
 * @param request
 * @param response
 * @param next
 */
export function userSearch(request, response) {
  console.log(`获取传参===${request}`);
  const data = request.query.user_name;
  const rd = {};
  userService
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
