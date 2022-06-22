import {Injectable} from "@angular/core";

@Injectable()
export class UtilsService{
  //range - to get array from start till the end
  range(start: number, end: number): number[]{
    //...Array - deploys array
    return [...Array(end).keys()].map(el => el+ start)
  }
}
