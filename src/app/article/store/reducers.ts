import {ArticleStateInterface} from "src/app/article/types/articleState.interface";
import {createReducer, on, Action} from "@ngrx/store";
import {getArticleAction, getArticleFailureAction, getArticleSuccessAction} from "src/app/article/store/actions/getArticle.action";
import { routerNavigationAction} from "@ngrx/router-store";

const initialState: ArticleStateInterface = {
  data: null,
  isLoading: false,
  error: null
}

const articleReducer = createReducer(
  initialState,
  on(
    getArticleAction,
    (state): ArticleStateInterface => ({
      ...state,
      isLoading: true
    })
  ),
  on(
    getArticleSuccessAction,
    (state, action): ArticleStateInterface => ({
      ...state,
      isLoading: false,
      data: action.article
    })
  ),
  on(
    getArticleFailureAction,
    (state): ArticleStateInterface => ({
      ...state,
      isLoading: false
    })
  ),
  on(routerNavigationAction, (): ArticleStateInterface => initialState) //clean all data and return initial state
)

export function reducers(state: ArticleStateInterface, action: Action){
  return articleReducer(state, action)
}
