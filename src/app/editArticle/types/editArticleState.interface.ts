import {BackendErrorsInterface} from "src/app/shared/types/backendErrors.interface";
import {ArticleInterface} from "src/app/shared/types/article.interface";

export interface EditArticleStateInterface {
  isLoading: boolean
  article: ArticleInterface | null //  article after fetch - ArticleInterface
  isSubmitting: boolean
  validationErrors: BackendErrorsInterface | null
}
