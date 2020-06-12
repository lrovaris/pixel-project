import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MetadataService {

  metadata: any;

  constructor() { }

  setMetadata(metadata) {
    this.metadata = metadata;
  }

  getMetadata() {
    return this.metadata;
  }

}
