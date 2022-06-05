import {Component} from "@angular/core";


@Component({
  selector: 'iula-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {}
//   form: FormGroup
//   currentUser: CurrentUserInterface
//   currentUserSubscription: Subscription
//   isSubmitting$: Observable<boolean>
//   backendErrors$: Observable<BackendErrorsInterface | null>
//
//   constructor(private fb: FormBuilder, private store: Store) {}
//
//   ngOnInit(): void {
//     this.initializeValues()
//     this.initializeListeners()
//   }
//
//   ngOnDestroy(): void {
//     this.currentUserSubscription.unsubscribe()
//   }
//   initializeValues(): void {
//     this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
//     this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))
//   }
//
//   initializeListeners(): void {
//     this.currentUserSubscription = this.store
//       .pipe(select(currentUserSelector), filter(Boolean))
//       .subscribe((currentUser: CurrentUserInterface) => {
//         this.currentUser = currentUser
//         this.initializeForm()
//       })
//   }
//
//   initializeForm(): void {
//     this.form = this.fb.group({
//       image: this.currentUser.image,
//       username: this.currentUser.username,
//       bio: this.currentUser.bio,
//       email: this.currentUser.email,
//       password: ''
//     })
//   }
//
//   submit(): void {
//     const currentUserInput: CurrentUserInputInterface = {
//       ...this.currentUser,
//       ...this.form.value
//     }
//     this.store.dispatch(updateCurrentUserAction({currentUserInput}))
//   }
//
//   logout(): void {
//     this.store.dispatch(logoutAction())
//   }
// }
