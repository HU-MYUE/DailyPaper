/**
 * 返回的状态信息
 */
const resultData = { status: '', msg: '', data: '' };

/**
 * 处理成功请求
 * @param response
 * @param result
 */
export function handleResultSuccess(response, result) {
  resultData.status = result.status || null;
  resultData.msg = result.msg || null;
  resultData.data = result.data || null;
  response.end(JSON.stringify(resultData));
}

/**
 * 处理失败请求
 * @param response
 * @param error
 */
export function handleResultError(response, error) {
  resultData.status = error.status;
  resultData.data = '';
  resultData.msg = error.msg;
  response.end(JSON.stringify(resultData));
}
