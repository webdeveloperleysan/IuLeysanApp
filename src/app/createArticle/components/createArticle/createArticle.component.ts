import {Component, OnInit} from "@angular/core";
import {ArticleInputInterface} from "../../../shared/types/articleInput.interface";
import {Observable} from "rxjs";
import {BackendErrorsInterface} from "../../../shared/types/backendErrors.interface";
import {select, Store} from "@ngrx/store";
import {isSubmittingSelector, validationErrorsSelector} from "src/app/createArticle/store/selectors";
import {createArticleAction} from "../../store/actions/createArticle.action";


@Component({
  selector:'iula-create-article',
  templateUrl: './createArticle.component.html'
})

export class CreateArticleComponent implements OnInit{
  initialValues: ArticleInputInterface = {
    title: '',
    description: '',
    body:'',
    tagList: []
  }


  isSubmitting$: Observable<boolean>
  backendErrors$: Observable<BackendErrorsInterface | null>

  constructor(private store: Store) {
  }
//returns the stream the current state: when state updated - component can immediately react
  ngOnInit(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))
  }

//Here I add createArticleAction and title is articleInput
  onSubmit(articleInput: ArticleInputInterface): void {
    //dispatch and save article on back-end
    this.store.dispatch(createArticleAction({articleInput}))
  }


}
