import {Component, Input} from "@angular/core";

@Component({
  selector: 'iula-error-message',
  template: '<div>{{messageProps}}</div>'
})
export class ErrorMessageComponent {
  //when custom error from back-end, possible to pass it and render
  //when nothing is passed, it will be message 'Something went wrong'
  @Input('message') messageProps: string = 'Something went wrong'
}
