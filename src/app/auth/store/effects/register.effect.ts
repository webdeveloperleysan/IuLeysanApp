import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {registerAction, registerFailureAction, registerSuccessAction} from "src/app/auth/store/actions/register.action";
import {switchMap, map, catchError, tap} from "rxjs";
import {AuthService} from "src/app/auth/services/auth.service";
import {CurrentUserInterface} from "src/app/shared/types/currentUser.interface";
import {of} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {PersistanceService} from "src/app/shared/services/persistance.service";
import {Router} from "@angular/router";

@Injectable()
export class RegisterEffect{
  register$ = createEffect(()=>this.actions$.pipe( //here I get all actions
    ofType(registerAction), //here I filter only register action
    switchMap(({request}) => {
      return this.authService.register(request).pipe(
        map((currentUser: CurrentUserInterface) => {
          //save token in the local storage after registration
          this.persistanceService.set('accessToken', currentUser.token)
          return registerSuccessAction({currentUser})
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          // extract errors and returning errors object
          return of(registerFailureAction({errors:errorResponse.error.errors}))
        })
      )
    })
  ))

  redirectAfterSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        //if register successfully redirect will happen
    ofType(registerSuccessAction),
    tap(()=> {
      this.router.navigateByUrl('/')
    })
    ),
    {dispatch: false}
  )

  constructor(private actions$: Actions,
              private authService: AuthService,
              private persistanceService: PersistanceService,
              private router: Router) {}
}
