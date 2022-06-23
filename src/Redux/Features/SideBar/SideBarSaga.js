import { call, takeEvery, put } from "redux-saga/effects";
import Axios from "axios";
import {  fetchingSidebar, fetchedSidebar } from "../../Store";
import { SideBarAction } from "./SideBarAction";

let callAPI = async ({ url, method, data }) => {
  return await Axios({
    url,
    method,
    data
  });
};

export function* fetchSideBarSaga(blogTitle) {

  try {
    let result = yield call(() =>
      callAPI({url: `https://en.wikipedia.org/w/api.php?action=parse&format=json&page=${blogTitle.payload}&prop=sections&origin=*`})
      );
    yield put(fetchedSidebar(result.data));
  } catch (e) {
    yield put({ type: "TODO_FETCH_FAILED" });
  }
}

export default function* SideBarSaga() {
  yield put(fetchingSidebar(true));
  yield takeEvery("FETCH_SIDEBAR_SAGA", fetchSideBarSaga);
}
