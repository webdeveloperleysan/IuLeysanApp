# IuLeysanApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Test cases for my solution

Registration<br/>
•	Check routes path: http://localhost:4200/register<br/>
•	Backend errors during sign-up when data is wrong <br/>
•	Check that possible to register when everything is correct<br/>
Log In – Sign In<br/>
•	Check routes path: http://localhost:4200/login <br/>
•	Backend errors during sing-in when data is wrong <br/>
•	Check that possible to log in when everything is correct<br/>
Posting new article<br/>
•	Check routes path: http://localhost:4200/articles/new <br/>
•	Backend errors if article inputs empty› <br/>
•	Check that possible to post the article when everything is correct http://localhost:4200/articles/dfgdfg-57244 <br/>
•	Check that possible to edit and delete an article<br/>
User Settings update<br/>
•	Check routes path: http://localhost:4200/settings <br/>
•	Check that possible to upload a new picture, change faculty and update these settings pushing the button<br/>
•	Check that possible to logout<br/>
Like/dislike articles<br/>
•	Go to the home page: http://localhost:4200/ <br/>
•	Hit Global reading<br/>
•	Like article<br/>
•	Update the page and check that like didn’t disappear<br/>
•	Dislike article<br/>
•	Update the page and check that dislike didn’t disappear<br/>
 
Follow/unfollow other users<br/>
•	Go to the home page: http://localhost:4200/ <br/>
•	Click on the other user and go to his profile page http://localhost:4200/profiles/Username <br/>
•	Follow user<br/>
•	Update the page and check that following didn’t disappear<br/>
•	Unfollow user<br/>
•	Update the page and check that unfollowing didn’t disappear<br/>

## Challenges of this project
All these steps are possible to see on Github within all commits.

### Challenge1: 
Submission http post (for Article) and put (for User Settings) method returns  Status Code: 500. <br/>

<img width="451" alt="image" src="https://user-images.githubusercontent.com/72350744/179948059-a304d578-e13f-4ac6-8ad5-0f70acbc6cee.png">

I have spent more than a week rechecking my code according to different tutorials, but nothing helped and my code looked correct. <br/>

Then I found the advice to compare the Payload of my web application and the application of the example web application (https://angular.realworld.io/) because the <br/>same API is used in the backend.<br/>

I will show detailed steps for solving the article POST method here. <br/>
My Web application:<br/>

 <img width="421" alt="image" src="https://user-images.githubusercontent.com/72350744/179948415-8c6cdfbf-16da-4634-98f4-ec3cf6cf7f17.png">

 
RealWorld Web application:<br/>

<img width="455" alt="image" src="https://user-images.githubusercontent.com/72350744/179948574-360ce830-227f-4d88-a23e-2ec7d5c46902.png">


The problem is that this API takes value in a specific format.<br/>
I have sent values in a different format.<br/>

The solution is I need a wrapper with the name “article”<br/>

So my code solution looked like this:<br/>
initializeForm():void{<br/>
    this.form = this.fb.group({<br/>
      title: this.initialValuesProps.title,<br/>
      description: this.initialValuesProps.description,<br/>
      body: this.initialValuesProps.body,<br/>
      tagList: this.initialValuesProps.tagList.join(' ') <br/>
    })<br/>
  }<br/>

This is onSubmit with wrapper “article”<br/>

  onSubmit(): void {<br/>
    this.articleSubmitEvent.emit({article: this.form.value} as any)<br/>
  }<br/>

This is old not working code:<br/>
  ~~onSubmit(): void {<br/>
    this.articleSubmitEvent.emit(this.form.value)<br/>
   }<br/>
}~~


After this change, everything worked.<br/>
The same steps I took for the user PUT method and made changes to submit method. <br/>


### Challenge 2 
I have found an article about optimistic update. An optimistic update is UI update before calling backend API, hoping that update will go fine. It looked interesting and I have decided to try it. <br/>
I have used this approach for the follow/unfollow the other user, as well as like/dislike articles. Everything looked great.<br/>
In spite that I passed the wrong data to the backend, on the front end I was receiving requested feedback (follow or unfollow user in my case). So I couldn’t see my bug immediately and I mentioned it later when reloading the application. <br/>
The last commit in GitHub shows fixing that:<br/>
 <img width="328" alt="image" src="https://user-images.githubusercontent.com/72350744/179949052-ba0ba774-b97c-40fd-84e4-b1a03fd83608.png">



