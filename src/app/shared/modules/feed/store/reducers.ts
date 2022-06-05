import {FeedStateInterface} from "src/app/shared/modules/feed/types/feedState.interface";
import {createReducer, on, Action} from "@ngrx/store";
import {getFeedAction, getFeedFailureAction, getFeedSuccessAction} from "src/app/shared/modules/feed/store/actions/getFeed.action";
import { routerNavigationAction} from "@ngrx/router-store";

const initialState: FeedStateInterface = {
  isLoading: false,
  error: null,
  data: null
}

const feedReducer = createReducer(
  initialState,
  on(
    getFeedAction,
    (state): FeedStateInterface => ({
      ...state,
      isLoading: true
    })
  ),
  on(
    getFeedSuccessAction,
    (state, action): FeedStateInterface => ({
      ...state,
      isLoading: false,
      data: action.feed
    })
  ),
  on(
    getFeedFailureAction,
    (state): FeedStateInterface => ({
      ...state,
      isLoading: false
    })
  ),
  on(routerNavigationAction, (): FeedStateInterface => initialState)
)

export function reducers(state: FeedStateInterface, action: Action){
  return feedReducer(state, action)
}
