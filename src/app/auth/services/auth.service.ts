import {Injectable} from "@angular/core";
import {RegisterRequestInterface} from "src/app/auth/types/registerRequest.inteface";
import {map, Observable} from "rxjs";
import {CurrentUserInterface} from "src/app/shared/types/currentUser.interface";
import {HttpClient} from "@angular/common/http";
import {environment} from "src/environments/environment";
import {AuthResponseInterface} from "src/app/auth/types/authResponse.interface";
import {LoginRequestInterface} from "src/app/auth/types/loginRequest.interface";
import {CurrentUserInputInterface} from "src/app/shared/types/currentUserInput.interface";

@Injectable()
export class AuthService{
  constructor(private http: HttpClient) { // Here Http request is sent
  }

  getUser (response: AuthResponseInterface): CurrentUserInterface{
    return response.user
  }
  // this function is to register a user
  // RegisterRequestInterface is received as an input
  //from Backend I get a CurrentUserInterface as subscribe
  register(data: RegisterRequestInterface): Observable<CurrentUserInterface>{
    const url = environment.apiUrl + '/users'

    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUser))
  }

  login(data: LoginRequestInterface): Observable<CurrentUserInterface>{
    //this is the post request
    const url = environment.apiUrl + '/users/login'

    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUser))
  }
//this is the get request where access token is sent
  getCurrentUser(): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/user'
    return this.http.get(url).pipe(map(this.getUser))
  }

  updateCurrentUser(
    //get current user from backend
    currentUserInput: CurrentUserInputInterface
  ): Observable<CurrentUserInterface>{
    const url = environment.apiUrl + '/user'
    // feedback with a user field
    return this.http.put(url, currentUserInput).pipe(map(this.getUser))
  }
}
