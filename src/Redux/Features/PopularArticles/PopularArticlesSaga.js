import { call, takeEvery, put } from "redux-saga/effects";
import Axios from "axios";
import { fetchData, fetchedData } from "../../Store";
import { PopularArticlesSagaAction } from "./PopularArticlesSagaAction";

let callAPI = async ({ url, method, data }) => {
  return await Axios({
    url,
    method,
    data
  });
};

export function* fetchDataSaga() {

  try {
    const today = new Date();
    const month = ("0" + Math.floor(today.getMonth()+1)).slice(-2) 
    let result = yield call(() =>
      //callAPI({ url: `https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/${today.getFullYear()}/${month}/${Math.floor(today.getDate()-2)}` })
        callAPI({url: `https://api.wikimedia.org/feed/v1/wikipedia/en/featured/${today.getFullYear()}/${month}/${Math.floor(today.getDate())}`})
      );
    yield put(fetchData(result.data));
  } catch (e) {
    yield put({ type: "TODO_FETCH_FAILED" });
  }
}

export default function* PopularArticlesSaga() {
  yield put(fetchedData(true));
  yield takeEvery("FETCH_DATA_SAGA", fetchDataSaga);
}
