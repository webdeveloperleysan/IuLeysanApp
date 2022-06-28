import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {switchMap, map, catchError} from "rxjs";
import {of} from "rxjs";
import {
  addToFollowingAction,
  addToFollowingFailureAction,
  addToFollowingSuccessAction
} from "../actions/addToFollowing.action";
import {ProfileInterface} from "../../../../types/profile.interface";
import {AddToFollowService} from "../../services/addToFollow.service";


@Injectable()
export class AddToFollowingEffect {

  addToFollowing$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(addToFollowingAction),
        switchMap(({isFollowing, slug}) => {
          //here check which method we want to call
          const profile$ = isFollowing
            ? this.addToFollowService.removeFromFollowing(slug)
            : this.addToFollowService.addToFollowing(slug)

          return profile$.pipe(
            map((profile: ProfileInterface) => {
              return addToFollowingSuccessAction({profile})
            }),
            catchError(() => {
              return of(addToFollowingFailureAction())
            })
          )
        })
      )
    }
  )

  constructor(
    private actions$: Actions,
    private addToFollowService: AddToFollowService
  ) {}
}
