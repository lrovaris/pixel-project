import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  // url = 'http://161.35.10.72:3000';
  url = 'http://localhost:3000';

  constructor() { }

  getUrl() {
    return this.url;
  }

}
