import {Component, OnDestroy, OnInit} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {getArticleAction} from "../../store/actions/getArticle.action";
import {ActivatedRoute} from "@angular/router";
import {ArticleInterface} from "../../../shared/types/article.interface";
import {combineLatest, map, Observable, Subscription} from "rxjs";
import {articleSelector, errorSelector, isLoadingSelector} from "src/app/article/store/selectors";
import {currentUserSelector} from "../../../auth/store/selectors";
import {CurrentUserInterface} from "../../../shared/types/currentUser.interface";
import {deleteArticleAction} from "../../store/actions/deleteArticle.action";

@Component({
  selector: 'iula-article',
  templateUrl: './article.component.html',
  styleUrls:['./article.component.scss']
})
export class ArticleComponent implements OnInit, OnDestroy{
  slug: string
  article: ArticleInterface | null
  articleSubscription: Subscription //to store and destroy subscription
  isLoading$: Observable<boolean>
  error$: Observable<string | null>
  isAuthor$: Observable<boolean> //true when current user is author of the article

  // route: ActivatedRoute - read slug when initialize component
  constructor(private store: Store, private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.initializeValues()
    this.initializeListeners()  //add subscription
    this.fetchData()
  }

  //to avoid memory leak
  ngOnDestroy(): void {
    this.articleSubscription.unsubscribe()
  }


  initializeValues(): void{
    this.slug = this.route.snapshot.paramMap.get('slug')
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.error$ = this.store.pipe(select(errorSelector))
    //combineLatest - for a combination of the streams, When any observable emits a value, emit the last emitted value from each.
    this.isAuthor$ = combineLatest([
      this.store.pipe(select(articleSelector)),
      this.store.pipe(select(currentUserSelector))
    ]).pipe(
      map(([article, currentUser]:[
        ArticleInterface | null,
          CurrentUserInterface | null
        ]) => {
        if (!article || !currentUser) {
          return false
        }
        return currentUser.username === article.author.username
        }
      ))
  }

  initializeListeners(): void{
    this.articleSubscription = this.store
      .pipe(select(articleSelector)) // this gives stream and possible to subscribe
      .subscribe((article: ArticleInterface | null) =>{
        this.article = article
      })
  }

  fetchData():void{
    this.store.dispatch(getArticleAction({slug: this.slug}))
  }


  deleteArticle(): void {
    this.store.dispatch(deleteArticleAction({slug: this.slug}))
  }
}
