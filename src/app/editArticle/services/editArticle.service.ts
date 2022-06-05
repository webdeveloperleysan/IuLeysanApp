import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ArticleInputInterface} from "src/app/shared/types/articleInput.interface";
import {map, Observable} from "rxjs";
import {environment} from "src/environments/environment";
import {ArticleInterface} from "src/app/shared/types/article.interface";
import {SaveArticleResponseInterface} from "src/app/shared/types/saveArticleResponse.interface";

@Injectable ()
export class EditArticleService {
  constructor(private http: HttpClient) {}

  updateArticle(
    slug: string,
    articleInput: ArticleInputInterface
  ): Observable<ArticleInterface>{
    const fullUrl = `${environment.apiUrl} /articles/${slug}`

    return this.http
      .put<SaveArticleResponseInterface>(fullUrl, articleInput)
      .pipe(
        map((response: SaveArticleResponseInterface) => {
          return response.article
        }))
  }
}
