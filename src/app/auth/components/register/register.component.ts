import {Component, OnInit} from '@angular/core'
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
import {select, Store} from "@ngrx/store";
import { registerAction } from 'src/app/auth/store/actions/register.action'
import {Observable} from "rxjs";
import {isSubmittingSelector, validationErrorsSelector} from "src/app/auth/store/selectors";
import {RegisterRequestInterface} from "src/app/auth/types/registerRequest.inteface";
import {BackendErrorsInterface} from "src/app/shared/types/backendErrors.interface";

//Decorator that marks a class as an Angular component and provides configuration metadata that determines
// how the component should be processed, instantiated, and used at runtime
@Component({
  //A selector is used to identify each component uniquely into the component tree,
  // and it also defines how the current component is represented in the HTML DOM
  selector: 'iula-register',
  //templateUrl - the relative path  of a template file for an Angular component
  templateUrl: './register.component.html',
  //styleUrls - relative paths for files containing CSS stylesheets to use in this component.
  styleUrls: ['./register.component.scss']
})
//ngOnInit: is called once after setting the component properties that are involved in binding.
// Performs component initialization
export class RegisterComponent implements OnInit {
  //This is the variable where the form is located
  form: FormGroup; // from  ReactiveFormsModule, enables bind fields of the register form to the reactive object and get data from it
  isSubmitting$: Observable<boolean>
  backendErrors$: Observable<BackendErrorsInterface | null>

  //this constructor needed to use reactive forms
  //we use various methods from it to create this form
  constructor(
    private fb: FormBuilder,
    private store: Store) {} // store from ngrx

  ngOnInit(): void {
    //the methods that need to be called are prescribed
    this.initializeForm()
    this.initializeValues()
  }
//all necessary functions
  initializeValues(): void {
    //using this.store to subscribe to this values
    //choosing data from selector
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))
  }

  initializeForm(): void {
    console.log('initializeForm')
    this.form = this.fb.group({
      // Group accepts an object as input, which is the fields of register form
      username: ['', Validators.required], //by default, it is an empty string with a validation
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  // checking if register form is valid
  onSubmit(): void {
    console.log('submit', this.form.value, this.form.valid)
    const request: RegisterRequestInterface = {
      user: this.form.value //enables to read all fields of the register form
    }
    this.store.dispatch(registerAction({request}))
  }
}
