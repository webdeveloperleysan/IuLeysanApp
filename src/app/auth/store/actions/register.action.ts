import {createAction, props} from '@ngrx/store'
import {ActionTypes} from 'src/app/auth/store/actionTypes'
import {RegisterRequestInterface} from "src/app/auth/types/registerRequest.inteface";
import {CurrentUserInterface} from "src/app/shared/types/currentUser.interface";
import {BackendErrorsInterface} from "src/app/shared/types/backendErrors.interface";

export const registerAction = createAction(
  ActionTypes.REGISTER,
  props<{request: RegisterRequestInterface}>()
)

export const registerSuccessAction = createAction(
  ActionTypes.REGISTER_SUCCESS,
  props<{currentUser: CurrentUserInterface}>()
)

export const registerFailureAction = createAction(
  ActionTypes.REGISTER_FAILURE,
  props<{errors: BackendErrorsInterface}>()
)
