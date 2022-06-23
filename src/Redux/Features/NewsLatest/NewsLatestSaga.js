import { call, takeEvery, put } from "redux-saga/effects";
import Axios from "axios";
import { fetchedNews } from "../../Store";
import { NewsLatestAction } from "./NewsLatestAction";


let callAPI = async ({ url, method, data,params }) => {
  return await Axios({
    url,
    method,
    data,
    params
  });
};

export function* fetchNewsLatestSaga(blogTitle) {
  try {
    const today = new Date();
    const month = ("0" + Math.floor(today.getMonth()+1)).slice(-2) 
    let result = yield call(() =>
    callAPI({url: `https://api.wikimedia.org/feed/v1/wikipedia/en/featured/${today.getFullYear()}/${month}/${Math.floor(today.getDate())}`})
    );
    yield put(fetchedNews(result.data));
  } catch (e) {
    yield put({ type: "TODO_FETCH_FAILED" });
  }
}

export default function* NewsLatestSaga() {
  yield takeEvery("FETCH_FEATURED_DATA_SAGA", fetchNewsLatestSaga);
  
}
