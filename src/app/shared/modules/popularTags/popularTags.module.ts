import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PopularTagsService} from "./services/popularTags.service";
import {GetPopularTagsEffect} from "./store/effects/getPopularTags.effect";
import {EffectsModule} from "@ngrx/effects";
import {StoreModule} from "@ngrx/store";
import {reducers} from "src/app/shared/modules/popularTags/store/reducers";
import {PopularTagsComponent} from "./components/popularTags/popularTags.component";
import {LoadingModule} from "../loading/loading.module";
import {RouterModule} from "@angular/router";
import {ErrorMessageModule} from "../errorMessage/errorMessage.module";

@NgModule({
  imports: [CommonModule,
    StoreModule.forFeature('popularTags', reducers),
    EffectsModule.forFeature([GetPopularTagsEffect]),
    RouterModule,
    LoadingModule,
    ErrorMessageModule
  ],
  declarations: [PopularTagsComponent],
  exports: [PopularTagsComponent],
  providers: [PopularTagsService]
  })
export class PopularTagsModule{}
