import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  url = '';

  constructor() { }

  getUrl() {
    return this.url;
  }

}
