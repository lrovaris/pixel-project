import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UrlService} from './url.service';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private http: HttpClient, private url: UrlService) { }

  uploadPhoto(photo) {
    return this.http.post(`${this.url.getUrl()}/images/upload`, photo);
  }

  getAllImages() {

    return this.http.get(`${this.url.getUrl()}/images/all`);
  }

  deleteImages(id) {
    return this.http.delete(`${this.url.getUrl()}/images/${id}`);
  }

}
