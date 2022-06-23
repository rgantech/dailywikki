import { call, takeEvery, put } from "redux-saga/effects";
import Axios from "axios";
import { fetchArticle, fetchingArticle } from "../../Store";
import { SingleArticleAction, SingleArticleName } from "./SingleArticleAction";


let callAPI = async ({ url, method, data,params }) => {
  return await Axios({
    url,
    method,
    data,
    params
  });
};

export function* fetchArticleSaga(blogTitle) {
  try {
    let result = yield call(() =>
      callAPI({ url: `https://en.wikipedia.org/w/api.php?action=parse&format=json&page=${blogTitle.payload}&prop=text&origin=*&formatversion=2`,
    })
    );
    
    yield put(fetchArticle(result.data));
  } catch (e) {
    yield put({ type: "TODO_FETCH_FAILED" });
  }
}

export default function* SingleArticleSaga() {
  yield put(fetchingArticle(true));
  yield takeEvery("FETCH_SINGLE_DATA_SAGA", fetchArticleSaga);
  
}
