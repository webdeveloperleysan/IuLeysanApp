import {Injectable} from "@angular/core";

//here I have set and get methods from localStorage
@Injectable()
export class PersistanceService {
  set (key: string, data: any): void {
    try{
      localStorage.setItem(key, JSON.stringify(data))
    } catch (e){
      console.error('Error saving to localStorage', e)
    }
  }

  get(key:string): any{
    try {
      return JSON.parse(localStorage.getItem(key) )
    }catch (e){
      console.error('Error getting data from localStorage', e)
      //after error application continue to work with null
      return null
    }
  }
}
