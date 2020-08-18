import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UrlService} from './url.service';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private url: UrlService) { }

  token = "";

  public getToken() {
    return this.token.toString();
  }

  public login(email, pass) {
    this.http.post(`${this.url.getUrl()}/users/login`, {email:email, password: pass}).subscribe((data: any ) => {

      if(data.token !== undefined){
        this.token = data.token;

        console.log(this.token);
      }

    });
  }
}
