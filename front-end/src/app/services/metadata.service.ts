import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MetadataService {

  metadata: any;

  baseArray: any;

  constructor() { }

  setMetadata(metadata) {
    this.metadata = metadata;

    let _baseArray = [];

    for (let i = 0; i < this.metadata.length; i++) {
      if (this.metadata[i].metadata.imgBase === true) {
        _baseArray.push(this.metadata[i]);

      }
    }

    this.setBaseArray(_baseArray);
  }

  getMetadata() {
    return this.metadata;
  }

  setBaseArray (_baseArray){

    this.baseArray = _baseArray;

  }

  getBaseArray(){
    return this.baseArray;
  }

}
