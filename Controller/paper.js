import { queryPaperListByGroup } from '../Services/paper';
import { handleResultError, handleResultSuccess } from '../util/processResp';
import { Log } from '../logBack';

export function getPaperListByGroup(request, response) {
  Log.info('come in paper');
  const data = request.query.user_id;
  const rd = {};
  queryPaperListByGroup(data)
    .then((result) => {
      rd.status = result.status;
      rd.msg = result.msg;
      if (result.data) {
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

export function others() {}
