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
