import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {ArticleInputInterface} from "src/app/shared/types/articleInput.interface";
import {BackendErrorsInterface} from "src/app/shared/types/backendErrors.interface";
import {FormBuilder, FormGroup} from "@angular/forms";


@Component({
  selector:'iula-article-form',
  templateUrl: './articleForm.component.html'
})

export class ArticleFormComponent implements OnInit {
  //default values of the form if it will be edit article
  @Input('initialValues') initialValuesProps: ArticleInputInterface
  // as it is stateless form without any API request and service, no async data
  //when dispatch happens - possible to see when dispatch is finished
  @Input('isSubmitting') isSubmittingProps: boolean
  @Input('errors') errorsProps: BackendErrorsInterface | null
// to send data outside
  @Output('articleSubmit') articleSubmitEvent = new EventEmitter<ArticleInputInterface>()

  form: FormGroup

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm()
  }
  initializeForm():void{
    this.form = this.fb.group({
      title: this.initialValuesProps.title,
      description: this.initialValuesProps.description,
      body: this.initialValuesProps.body,
      tagList: this.initialValuesProps.tagList.join(' ') //to get string with spaces from Array
    })
  }

  onSubmit(): void{
    this.articleSubmitEvent.emit(this.form.value)

  }
}
