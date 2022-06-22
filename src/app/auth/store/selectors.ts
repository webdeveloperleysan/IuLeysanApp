import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AuthStateInterface} from "src/app/auth/types/authState.interface";

export const authFeatureSelector = createFeatureSelector<
  AuthStateInterface
>('auth')

//isSubmittingSelector - how we want to receive data in the component
export const isSubmittingSelector = createSelector(
  authFeatureSelector,
  (authState:AuthStateInterface) =>authState.isSubmitting
  )

export const validationErrorsSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface)=>authState.validationErrors
)

export const isLoggedInSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface)=>authState.isLoggedIn
)

//isAnonymous shows that user is not logged in
export const isAnonymousSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface)=>authState.isLoggedIn === false
)

export const currentUserSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface)=>authState.currentUser
)
