import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {GlobalFeedComponent} from "./components/globalFeed/globalFeed.component";
import {RouterModule} from "@angular/router";
import {FeedModule} from "../shared/modules/feed/feed.module";
import {BannerModule} from "../shared/modules/banner/banner.module";
import {PopularTagsModule} from "../shared/modules/popularTags/popularTags.module";
import {FeedTogglerComponent} from "../shared/modules/feedToggler/components/feedToggler/feedToggler.component";
import {FeedTogglerModule} from "../shared/modules/feedToggler/feedToggler.module";

const routes = [
  {
    path:'',
    component: GlobalFeedComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FeedModule,
    BannerModule,
    PopularTagsModule,
    FeedTogglerModule
  ],
  declarations: [GlobalFeedComponent]
})
export class GlobalFeedModule{}
