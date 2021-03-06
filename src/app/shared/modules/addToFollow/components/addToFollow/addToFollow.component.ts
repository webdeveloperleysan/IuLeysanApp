import {Component, Input, OnInit, Output} from "@angular/core";
import {ProfileInterface} from "../../../../types/profile.interface";
import {Store} from "@ngrx/store";
import {addToFollowingAction} from "../../store/actions/addToFollowing.action";

@Component({
  selector: 'iula-follow-button',
  templateUrl: './addToFollow.component.html'
})
export class AddToFollowComponent implements OnInit {
  @Input('isFollowing') isFollowingProps: boolean
  @Input('profile') profile: ProfileInterface

  isFollowing: boolean

  constructor(private store: Store) {
  }

  ngOnInit() {

    this.isFollowing = this.isFollowingProps
  }

  toggleFollowing() {
    this.store.dispatch(
      addToFollowingAction({
        isFollowing: this.isFollowing,
        slug: this.profile.username
        }
      ))


    this.isFollowing = !this.isFollowing

  }
  }






