import {Component, Input} from "@angular/core";
import {PopularTagType} from "../../../../types/popularTag.type";

@Component({
  selector: 'iula-tag-list',
  templateUrl: './tagList.component.html'
})
export class TagListComponent {
  @Input('tags') tagsProps!: PopularTagType[];
}
