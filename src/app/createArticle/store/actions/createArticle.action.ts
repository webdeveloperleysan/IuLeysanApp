import {createAction, props} from "@ngrx/store";
import {ActionTypes} from "../actionTypes";
import {ArticleInputInterface} from "src/app/shared/types/articleInput.interface";
import {ArticleInterface} from "src/app/shared/types/article.interface";
import {BackendErrorsInterface} from "src/app/shared/types/backendErrors.interface";

export const createArticleAction = createAction(
  ActionTypes.CREATE_ARTICLE,
  props<{articleInput: ArticleInputInterface}>()
)

//here is what happening when article created successfully
export const createArticleSuccessAction = createAction(
  ActionTypes.CREATE_ARTICLE_SUCCESS,
  props<{article: ArticleInterface}>()
)
//here is what happening when article creation is failed
export const createArticleFailureAction = createAction(
  ActionTypes.CREATE_ARTICLE_FAILURE,
  props<{errors: BackendErrorsInterface}>()
)
