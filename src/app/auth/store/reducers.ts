import {AuthStateInterface} from "src/app/auth/types/authState.interface";
import {createReducer, on, Action} from "@ngrx/store";
import {registerAction, registerFailureAction, registerSuccessAction} from "src/app/auth/store/actions/register.action";
import {loginAction, loginFailureAction, loginSuccessAction} from "src/app/auth/store/actions/login.action";
import {
  getCurrentUserAction,
  getCurrentUserFailureAction,
  getCurrentUserSuccessAction
} from "src/app/auth/store/actions/getCurrentUser.action";
import {updateCurrentUserSuccessAction} from "./actions/updateCurrentUser.action";
import {logoutAction} from "./actions/sync.action";

// describing initial state
const initialState: AuthStateInterface = {
  isSubmitting: false,
  isLoading: false,
  currentUser: null,
  isLoggedIn: null,
  validationErrors: null
}
//describing methods which change initial state
const authReducer = createReducer(
  initialState, // at the first state the input takes the initial state
  // registerAction started
  on(registerAction, // the second parameter is the function that change the initial state
    (state): AuthStateInterface => ({ //want to return AuthStateInterface
      //here returning a new object with overwriting isSubmitting
      ...state,
      isSubmitting: true,
      //if user try sing up after wrong inputs, old errors should be deleted
      validationErrors: null
    })
  ),
  // registerAction successful
  on(registerSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      currentUser: action.currentUser
    })
  ),
  // registerAction failed
  on(registerFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors
    })
  ),
  on(loginAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      validationErrors: null
    })
  ),
  on(loginSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      currentUser: action.currentUser
    })
  ),
  on(loginFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors
    })
  ),
  on(getCurrentUserAction, (state): AuthStateInterface => ({
    ...state,
    isLoading: true
  })),
  on(getCurrentUserSuccessAction, (state, action): AuthStateInterface => ({
    ...state,
    isLoading: false,
    isLoggedIn: true,
    currentUser: action.currentUser
  })),
  on(getCurrentUserFailureAction, (state): AuthStateInterface => ({
    ...state,
    isLoading: false,
    isLoggedIn: false,
    currentUser: null
  })),
  on(updateCurrentUserSuccessAction, (state, action): AuthStateInterface =>({
    ...state,
    currentUser: action.currentUser
  })
  ),
  on(logoutAction, (): AuthStateInterface =>({
    ...initialState,
    isLoggedIn: false
  }))
)

export function reducers(state: AuthStateInterface, action: Action){
  return authReducer(state, action)
}
