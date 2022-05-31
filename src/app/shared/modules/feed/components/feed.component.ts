import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {getFeedAction} from "../store/actions/getFeed.action";
import {Observable, Subscription} from "rxjs";
import {GetFeedResponseInterface} from "../types/getFeedResponse.interface";
import {errorSelector, feedSelector, isLoadingSelector} from "../store/selectors";
import {environment} from "../../../../../environments/environment";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {parseUrl, stringify} from "query-string";


@Component({
  selector: 'iula-feed',
  templateUrl: './feed.component.html',
  styleUrls:['./feed.component.scss']
})
export class FeedComponent implements OnInit, OnDestroy {
  @Input('apiUrl')
  apiUrlProps!: string;

  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>
  feed$!: Observable<GetFeedResponseInterface | null>
  limit = environment.limit
  baseUrl !: string
  queryParamsSubscription !: Subscription
  currentPage!: number

  constructor(private store: Store, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.initializeValues()
    this.initializeListeners()
  }

  ngOnDestroy(): void{
    this.queryParamsSubscription.unsubscribe()
  }


  initializeValues(): void{
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.error$ = this.store.pipe(select(errorSelector))
    this.feed$ = this.store.pipe(select(feedSelector))
    this.baseUrl = this.router.url.split('?')[0]
  }

  initializeListeners(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(
      (params: Params) =>{
        // @ts-ignore
        this.currentPage = Number(params.page || '1')
        //this.currentPage = Number(params["page"] || '1')
        //this.currentPage = Number(page || '1')
        console.log('currentPage', this.currentPage)
        this.fetchFeed()
    })
  }

  fetchFeed(): void {
    const offset = this.currentPage * this.limit - this.limit
    const parsedUrl = parseUrl(this.apiUrlProps)
    const stringifiedParams = stringify({
      limit: this.limit,
      offset,
      ...parsedUrl.query
    })
    const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`
    this.store.dispatch(getFeedAction({url: apiUrlWithParams}))
  }

}
