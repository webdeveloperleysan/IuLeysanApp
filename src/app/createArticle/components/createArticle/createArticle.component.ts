import {Component} from "@angular/core";

@Component({
  selector:'iula-create-article',
  templateUrl: './createArticle.component.html'
})

export class CreateArticleComponent{
  initialValues = {
    title: 'Foo',
    description: 'Bar',
    body:'Baz',
    tagList: ['123']
  }

  onSubmit(res: any): void {
    console.log('onSubmit in parent', res)
  }
}
