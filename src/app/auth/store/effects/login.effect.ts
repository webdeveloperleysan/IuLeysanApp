import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {switchMap, map, catchError, tap} from "rxjs";
import {AuthService} from "src/app/auth/services/auth.service";
import {CurrentUserInterface} from "src/app/shared/types/currentUser.interface";
import {of} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {PersistanceService} from "src/app/shared/services/persistance.service";
import {Router} from "@angular/router";
import {loginAction, loginFailureAction, loginSuccessAction} from "src/app/auth/store/actions/login.action";

@Injectable()
export class LoginEffect{
  login$ = createEffect(()=>this.actions$.pipe(
    ofType(loginAction),
    //i get request from loginRequestInterface
    switchMap(({request}) => {
      return this.authService.login(request).pipe(
        //login request get current user
        map((currentUser: CurrentUserInterface) => {
          //I get token of current user
          this.persistanceService.set('accessToken', currentUser.token)
          return loginSuccessAction({currentUser})
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(loginFailureAction({errors:errorResponse.error.errors}))
        })
      )
    })
  ))

  //redirect to home page after success login
  redirectAfterSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccessAction),
        tap(()=> {
          this.router.navigateByUrl('/')
        })
      ),
    {dispatch: false}
  )

  constructor(private actions$: Actions,
              private authService: AuthService,
              private persistanceService: PersistanceService,// write token after success login
              private router: Router) {}
}
