import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class PaleteService {

  constructor(private http: HttpClient, private url: UrlService) { }

  getAllPaletes() {
    return this.http.get(`${this.url.getUrl()}/colors/all`);
  }

  deletePalete(id) {
    return this.http.get('');
  }

  uploadPalete(palete) {
    return this.http.post(`${this.url.getUrl()}/colors/new`, palete);
  }

}
