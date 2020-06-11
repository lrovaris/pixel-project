import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  url = 'http://localhost:3000';

  constructor() { }

  getUrl() {
    return this.url;
  }

}
