import {
  createSlice,
  configureStore,
  combineReducers,
} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import PopularArticlesSaga from "./Features/PopularArticles/PopularArticlesSaga";
import SingleArticleSaga from "./Features/SingleArticle/SingleArticleSaga";
import NewsLatestSaga from "./Features/NewsLatest/NewsLatestSaga";
import SideBarSaga from "./Features/SideBar/SideBarSaga";



const popularSlice = createSlice({
  name: "popular",
  initialState: {
    popular: [],
    isActive:false
  },
  reducers: {
    fetchedData: (state) => {
      return{
        isActive:true
      }
    },
    fetchData: (state, action) => {
      return {
        popular: action.payload,
        isActive:false
      };
    }
  }
});

const singleSlice = createSlice({
  name: "single",
  initialState: {
    single: [],
    isActive: false
  },
  reducers: {
    fetchingArticle: (state) => {
      return{
        isActive:true
      }
       
    },
    fetchArticle: (state, action) => {
      return {
        single: action.payload,
        isActive:false
      };
    }

  }
});

const newsSlice = createSlice({
  name: "news",
  initialState: {
    news: [],
    isActive: false
  },
  reducers: {
    fetchingNews: (state) => {
     return{ isActive: true }
    },    
    fetchedNews: (state, action) => {
      return {
        news: action.payload,
        isActive: false
      };
    }
  }
});

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    sidebar: [],
    isActive: false
  },
  reducers: {
    fetchingSidebar: (state) => {
     return{ isActive: true }
    },    
    fetchedSidebar: (state, action) => {
      return {
        sidebar: action.payload,
        isActive: false
      };
    }
  }
});

export const { fetchedData,fetchData } = popularSlice.actions;
export const { fetchArticle,fetchingArticle } = singleSlice.actions;
export const { fetchingNews,fetchedNews  } = newsSlice.actions;
export const { fetchingSidebar,fetchedSidebar  } = sidebarSlice.actions;


const saga = createSagaMiddleware();

const reducer = combineReducers({
  popular: popularSlice.reducer,
  single: singleSlice.reducer,
  news:newsSlice.reducer,
  sidebar:sidebarSlice.reducer
})

const Store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: reducer,
  middleware: [saga]
});

saga.run(PopularArticlesSaga);
saga.run(SingleArticleSaga)
saga.run(NewsLatestSaga)
saga.run(SideBarSaga)


export default Store;
