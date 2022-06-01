import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'iula-tag-feed',
  templateUrl: './tagFeed.component.html',
  styleUrls:['./tagFeed.component.scss']
})
export class TagFeedComponent implements OnInit{
  apiUrl: string
  tagName: string
  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) =>{
      console.log('params in tagFeed', params)

      //this.tagName = this.route.snapshot.paramMap.get('slug') // here we can read our dynamic slug from tagFeed.module.ts
      this.tagName = params["slug"]
      this.apiUrl = `/articles?tag=${this.tagName}`
    })
  }
}
