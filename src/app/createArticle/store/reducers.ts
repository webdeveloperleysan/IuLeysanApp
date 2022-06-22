import {CreateArticleStateInterface} from "../types/createArticleState.interface";
import {Action, createReducer, on} from "@ngrx/store";
import {
  createArticleAction,
  createArticleFailureAction,
  createArticleSuccessAction
} from "./actions/createArticle.action";


const initialState: CreateArticleStateInterface ={
  isSubmitting: false,
  validationErrors: null
}

const createArticleReducer = createReducer(
  // supply the initial state
  initialState,
  //add the action 'Create Article' and returning new state
  on(
    createArticleAction,
    (state): CreateArticleStateInterface =>({
      //spread operator taking existing state, duplicate it and adding necessary modification
      ...state,
      isSubmitting: true
    })
  ),
  //how to handle when success
  on(
    createArticleSuccessAction,
    (state): CreateArticleStateInterface =>({
      ...state,
      isSubmitting: false
    })
  ),
  //how to handle when failure
  on(
    createArticleFailureAction,
    (state, action): CreateArticleStateInterface =>({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors
    })
  )
)

export function reducers(state: CreateArticleStateInterface, action: Action) {
  return createArticleReducer(state, action)
}
