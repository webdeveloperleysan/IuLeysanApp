import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PopularTagsService} from "src/app/shared/modules/popularTags/services/popularTags.service";
import {GetPopularTagsEffect} from "src/app/shared/modules/popularTags/store/effects/getPopularTags.effect";
import {EffectsModule} from "@ngrx/effects";
import {StoreModule} from "@ngrx/store";
import {reducers} from "src/app/shared/modules/popularTags/store/reducers";
import {PopularTagsComponent} from "src/app/shared/modules/popularTags/components/popularTags/popularTags.component";
import {LoadingModule} from "src/app/shared/modules/loading/loading.module";
import {RouterModule} from "@angular/router";
import {ErrorMessageModule} from "src/app/shared/modules/errorMessage/errorMessage.module";

@NgModule({
  imports: [
    CommonModule,
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
