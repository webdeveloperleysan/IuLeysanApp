import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TagFeedComponent} from "./components/taglFeed/tagFeed.component";
import {RouterModule} from "@angular/router";
import {FeedModule} from "../shared/modules/feed/feed.module";
import {BannerModule} from "../shared/modules/banner/banner.module";
import {PopularTagsModule} from "../shared/modules/popularTags/popularTags.module";
import {FeedTogglerModule} from "../shared/modules/feedToggler/feedToggler.module";

const routes = [
  {
    path:'tags/:slug', // :slug - dynamic variable
    component: TagFeedComponent
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
  declarations: [TagFeedComponent]
})
export class TagFeedModule {}
