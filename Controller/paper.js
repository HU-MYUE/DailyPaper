import { queryPaperListByGroup } from '../Services/paper';
import { handleResultError, handleResultSuccess } from '../util/processResp';
import { Log } from '../logBack';

// eslint-disable-next-line import/prefer-default-export
export function getPaperListByGroup(request, response) {
  const rd = {};
  queryPaperListByGroup(2)
    .then((result) => {
      if (result) {
        rd.data = result;
      }
      handleResultSuccess(response, rd);
    })
    .catch((err) => {
      Log.error('[PAPER] queryPaperListByGroup error', err);
      rd.status = err.status;
      rd.msg = err.msg;
      handleResultError(response, rd);
    });
}
