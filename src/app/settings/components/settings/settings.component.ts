import {Component, OnDestroy, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import {CurrentUserInterface} from "src/app/shared/types/currentUser.interface";
import {filter, Observable, Subscription} from "rxjs";
import {currentUserSelector} from "src/app/auth/store/selectors";
import {BackendErrorsInterface} from "src/app/shared/types/backendErrors.interface";
import {isSubmittingSelector, validationErrorsSelector} from "src/app/settings/store/selectors";
import {CurrentUserInputInterface} from "../../../shared/types/currentUserInput.interface";
import {updateCurrentUserAction} from "../../../auth/store/actions/updateCurrentUser.action";
import {logoutAction} from "src/app/auth/store/actions/sync.action";


@Component({
  selector: 'iula-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  currentUser: CurrentUserInterface
  currentUserSubscription: Subscription
  form: FormGroup
  isSubmitting$: Observable<boolean>
  backendErrors$: Observable<BackendErrorsInterface | null>

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initializeListeners()
    this.initializeValues()

  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe()
  }
  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))
  }

  initializeListeners(): void {
    this.currentUserSubscription = this.store
      .pipe(select(currentUserSelector), filter(Boolean))  //to avoid null
      .subscribe((currentUser: CurrentUserInterface) => {
        this.currentUser = currentUser
        this.initializeForm()
      })
  }

  initializeForm(): void {
    this.form = this.fb.group({
      image: this.currentUser['image'],
      username: this.currentUser['username'],
      bio: this.currentUser['bio'],
      email: this.currentUser['email'],
      password: ''
    })
  }

  submit(): void {
    const currentUserInput: CurrentUserInputInterface = {
      ...this.currentUser,
      ...this.form.value,
      user: this.form.value
    }
    this.store.dispatch(updateCurrentUserAction({currentUserInput}))

  }



  logout(): void {
    this.store.dispatch(logoutAction())
  }
}
