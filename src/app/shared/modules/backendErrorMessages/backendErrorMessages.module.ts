import {Input, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BackendErrorMessagesComponent} from "src/app/shared/modules/backendErrorMessages/components/backendErrorMessages/backendErrorMessages.component";


@NgModule({
  imports:[CommonModule],
  declarations: [BackendErrorMessagesComponent],
  exports: [BackendErrorMessagesComponent] // we need "exports" as we want to use this component out of this module
})
export class BackendErrorMessagesModule {}
