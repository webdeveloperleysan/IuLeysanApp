import {FeedStateInterface} from "../types/feedState.interface";
import {createFeatureSelector, createSelector} from "@ngrx/store";



export const feedFeatureSelector = createFeatureSelector<
  //AppStateInterface,
  FeedStateInterface
  >('feed')

export const isLoadingSelector = createSelector(
  feedFeatureSelector,
  (feedState:FeedStateInterface) =>feedState.isLoading
)

export const errorSelector = createSelector(
  feedFeatureSelector,
  (feedState:FeedStateInterface) =>feedState.error
)

export const feedSelector = createSelector(
  feedFeatureSelector,
  (feedState:FeedStateInterface) =>feedState.data
)
