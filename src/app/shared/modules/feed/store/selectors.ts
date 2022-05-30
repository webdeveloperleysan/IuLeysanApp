import {FeedStateInterface} from "../types/feedState.interface";
import {AuthStateInterface} from "../../../../auth/types/authState.interface";
import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AppStateInterface} from "../../../types/appState.interface";


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
