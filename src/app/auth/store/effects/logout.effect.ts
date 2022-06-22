import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {logoutAction} from 'src/app/auth/store/actions/sync.action'
import {PersistanceService} from 'src/app/shared/services/persistance.service'
import {tap} from "rxjs";
import {Router} from "@angular/router";


@Injectable()
export class LogoutEffect {
  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logoutAction),
        tap(() => {
          this.persistanceService.set('accessToken', '') // rewrite token as empty string - when log out no token
          this.router.navigateByUrl('/') // after logout user automatically jumps to the Homepage
        })
      ),
    {dispatch: false}
  )
  constructor(
    private actions$: Actions,
    private persistanceService: PersistanceService,
    private router: Router
  ) {}
}
