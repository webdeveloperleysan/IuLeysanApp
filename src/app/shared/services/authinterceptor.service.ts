import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {PersistanceService} from "src/app/shared/services/persistance.service";

//AuthInterceptor is middleware between front-end and API request
@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  constructor(private persistanceService: PersistanceService) {
  }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.persistanceService.get('accessToken')
    request = request.clone({
      setHeaders:{
        //if token exists I get, if token does not exist - I get empty string
        Authorization: token ? `Token ${token}` : ''
      }
    })
    return next.handle(request)
  }
}
