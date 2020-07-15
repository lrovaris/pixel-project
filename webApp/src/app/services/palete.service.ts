import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class PaleteService {

  constructor(private http: HttpClient, private url: UrlService) { }

  getAllPaletes() {
    return this.http.get('');
  }

  deletePalete(id) {
    return this.http.get('');
  }

  uploadPhoto(photo) {
    return this.http.post(`${this.url.getUrl()}/images/upload`, photo);
  }

}
