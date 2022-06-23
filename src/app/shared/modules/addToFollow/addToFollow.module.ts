import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {AddToFollowComponent} from "./components/addToFollow/addToFollow.component";
import {AddToFollowService} from "./services/addToFollow.service";
import {EffectsModule} from "@ngrx/effects";
import {AddToFollowingEffect} from "./store/effects/addToFollowing.effect";

@NgModule({
  imports: [CommonModule, EffectsModule.forFeature([AddToFollowingEffect])],
  declarations: [AddToFollowComponent],
  exports: [AddToFollowComponent], // enable to use outside the module
  providers:[AddToFollowService]

})
export class AddToFollowModule {}
