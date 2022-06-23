import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";
import {CurrentUserInterface} from "../../../types/currentUser.interface";
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {GetUserProfileResponseInterface} from "../../../../userProfile/types/getUserProfileResponse.interface";
import {ProfileInterface} from "../../../types/profile.interface";

@Injectable()
export class AddToFollowService {
  constructor(private http: HttpClient) {}

  addToFollowing(slug: string): Observable<ProfileInterface> {
    const url = this.getUrl(slug)
    return this.http.post(url, {}).pipe(map(this.getUserProfile))
  }

  removeFromFollowing(slug: string): Observable<ProfileInterface> {
    const url = this.getUrl(slug)
    return this.http.delete(url ).pipe(map(this.getUserProfile))
  }

  getUrl(slug: string): string{
    return `${environment.apiUrl}/profiles/${slug}/follow`
  }
  getUserProfile (response: GetUserProfileResponseInterface ): ProfileInterface  {
    return response.profile
  }


}
