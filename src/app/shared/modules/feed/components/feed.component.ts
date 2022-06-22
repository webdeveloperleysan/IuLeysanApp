import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {getFeedAction} from "src/app/shared/modules/feed/store/actions/getFeed.action";
import {Observable, Subscription} from "rxjs";
import {GetFeedResponseInterface} from "src/app/shared/modules/feed/types/getFeedResponse.interface";
import {errorSelector, feedSelector, isLoadingSelector} from "src/app/shared/modules/feed/store/selectors";
import {environment} from "src/environments/environment";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ParsedUrl, ParseOptions, parseUrl, stringify} from "query-string";




@Component({
  selector: 'iula-feed',
  templateUrl: './feed.component.html',
  styleUrls:['./feed.component.scss']
})
export class FeedComponent implements OnInit, OnDestroy, OnChanges {
  // outside apiUrl, inside apiUrlProps
  @Input('apiUrl') apiUrlProps: string

  isLoading$: Observable<boolean>
  error$: Observable<string | null>
  feed$: Observable<GetFeedResponseInterface | null>
  limit = environment.limit
  baseUrl: string
  queryParamsSubscription: Subscription
  currentPage: number

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    console.log('initialized feed', ['apiUrlProps'])
    this.initializeValues()
    this.initializeListeners()
  }

  ngOnChanges(changes: SimpleChanges) {
    //here is logic for the case when we don't change route, but we want to change slug
    const isApiUrlChanged =
      !changes.apiUrlProps.firstChange &&
      changes.apiUrlProps.currentValue !==
      changes.apiUrlProps.previousValue
    if(isApiUrlChanged){
      this.fetchFeed()
    }
  }

  ngOnDestroy(): void{
    this.queryParamsSubscription.unsubscribe()
  }


  initializeListeners(): void {

    this.queryParamsSubscription = this.route.queryParams.subscribe(
      (params: Params) => {
        //converting string page to number
        //when params['page'] is not exist, I will take string with the value 1
        this.currentPage = Number(params['page'] || '1')
        console.log('fetchFeed')
        this.fetchFeed()
      }
    )
  }

  initializeValues(): void{
    this.feed$ = this.store.pipe(select(feedSelector))
    this.error$ = this.store.pipe(select(errorSelector))
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.baseUrl = this.router.url.split('?')[0]
  }


  fetchFeed(): void {
    const offset = this.currentPage * this.limit - this.limit
    //get parameters from url
    const parsedUrl = parseUrl(this['apiUrlProps'])
    const stringifiedParams = stringify({
      limit: this.limit,
      offset,
      ...parsedUrl.query
    })
    const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`
    this.store.dispatch(getFeedAction({url: apiUrlWithParams}))
  }
}
