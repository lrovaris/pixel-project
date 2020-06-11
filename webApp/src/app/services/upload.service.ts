import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UrlService} from "./url.service";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient, private url: UrlService) { }

  uploadPhoto() {
    return this.http.post(`${this.url}/upload`, {});
  }

}
