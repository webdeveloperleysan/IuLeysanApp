import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";
import {ArticleInterface} from "src/app/shared/types/article.interface";
import {environment} from "src/environments/environment";
import {HttpClient} from "@angular/common/http";
import {GetArticleResponseInterface} from "src/app/shared/types/getArticleResponse.interface";

@Injectable()
export class AddToFavoritesService {
  constructor(private http: HttpClient) {}

  addToFavorites(slug: string): Observable<ArticleInterface> {
    const url = this.getUrl(slug)

    return this.http.post(url, {}).pipe(map(this.getArticle))
  }

  removeFromFavorites(slug: string): Observable<ArticleInterface> {
    const url = this.getUrl(slug)

    return this.http.delete(url).pipe(map(this.getArticle))
  }

  getUrl(slug: string): string {
    return `${environment.apiUrl}/articles/${slug}/favorite`
  }

  getArticle(response: GetArticleResponseInterface): ArticleInterface {
    return response.article
  }
}
