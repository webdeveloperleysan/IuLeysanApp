import {Component, OnInit} from '@angular/core'
import {FormGroup, FormBuilder} from '@angular/forms'
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {isSubmittingSelector, validationErrorsSelector} from "src/app/auth/store/selectors";
import {BackendErrorsInterface} from "src/app/shared/types/backendErrors.interface";
import {loginAction} from "src/app/auth/store/actions/login.action";
import {LoginRequestInterface} from "src/app/auth/types/loginRequest.interface";

@Component({
  selector: 'iula-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  form: FormGroup;
  isSubmitting$: Observable<boolean>
  backendErrors$: Observable<BackendErrorsInterface | null>

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.initializeForm()
    this.initializeValues()
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))
  }

  initializeForm(): void {
    this.form = this.fb.group({
      email: '',
      password: ''
    })
  }

  onSubmit(): void {
    const request: LoginRequestInterface = {
      user: this.form.value
    }
    this.store.dispatch(loginAction({request}))
  }
}
