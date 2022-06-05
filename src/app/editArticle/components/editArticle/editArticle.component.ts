import {Component, OnInit} from "@angular/core";
import {ArticleInputInterface} from "src/app/shared/types/articleInput.interface";
import {filter, map, Observable} from "rxjs";
import {BackendErrorsInterface} from "src/app/shared/types/backendErrors.interface";
import {select, Store} from "@ngrx/store";
import {
  articleSelector,
  isLoadingSelector,
  isSubmittingSelector,
  validationErrorsSelector
} from "src/app/editArticle/store/selectors";
import {ActivatedRoute} from "@angular/router";
import {getArticleAction} from "src/app/editArticle/store/actions/getArticle.action";
import {ArticleInterface} from "src/app/shared/types/article.interface";
import {updateArticleAction} from "src/app/editArticle/store/actions/updateArticle.action";

@Component({
  selector:'iula-edit-article',
  templateUrl: './editArticle.component.html'
})

export class EditArticleComponent implements OnInit{
  initialValues$: Observable<ArticleInputInterface>
  isSubmitting$: Observable<boolean>
  isLoading$: Observable<boolean>
  backendErrors$: Observable<BackendErrorsInterface | null>
  slug: string

  constructor(private store: Store, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.initialValues()
    this.fetchData()
  }

  initialValues():void {
    this.slug = this.route.snapshot.paramMap.get('slug')
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))
    this.initialValues$ = this.store.pipe(select(articleSelector), filter(Boolean),
      map((article: ArticleInterface) => {
        return {
            title: article.title,
            description: article.description,
            body: article.body,
            tagList: article.tagList
        }
      })
    )
  }

  fetchData(): void{
    this.store.dispatch(getArticleAction({slug: this.slug}))
  }


  onSubmit(articleInput: ArticleInputInterface): void {
    this.store.dispatch(updateArticleAction({slug: this.slug, articleInput}))
  }
}
