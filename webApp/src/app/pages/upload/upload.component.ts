import { Component, OnInit } from '@angular/core';
import {ImagesService} from '../../services/images.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  buttomState = 'Enviar';
  currentState = 'initial';
  inputState = 'initial';
  fileToUpload: Array<File> = [];
  formData: FormData = new FormData();
  user: any;
  imgPath = '';
  styleConcluido = false;
  imgName = 'Escolha uma foto';
  checkEnviou = false;
  animationArray = [];
  uploaded: boolean;
  path: any;
  height: any;
  width: any;
  animationSelect: any;
  frameWidth: any;
  id: any;
  colors = [];
  baseSelect: any;

  checkBase: boolean;

  form: FormGroup;

  constructor(private imageService: ImagesService, private formBuild: FormBuilder) {
   this.form = this.formBuild.group({
      name: [null],
      frames: [null],
      category: [null]
    });
  }

  ngOnInit() {
    this.uploaded = false;
    this.baseSelect = true;
  }

  addPicutre(event) {
    this.fileToUpload = [];
    const newFile = event.target.files[0];
    this.imgName = event.target.files[0].name;
    this.checkEnviou = true;
    this.fileToUpload = [newFile];
  }

  log() {
    this.checkBase = this.baseSelect === 'base';
  }

  uploadPhoto() {

    this.checkEnviou = false;
    this.imgName = 'Escolha uma foto';
    this.buttomState = 'Enviando';
    for (let i = 0; i < this.fileToUpload.length; i++) {
      this.formData.append('docs', this.fileToUpload[i]);
    }
    this.imageService.uploadPhoto(this.formData).subscribe((data: any) => {

      this.path = data.info_files[0].path;
      this.width = data.info_files[0].metadata.width;
      this.height = data.info_files[0].metadata.height;
      this.formData = new FormData();
      this.uploaded = true;

      this.colors = data.info_files[0].metadata.colors;

      console.log(data);

    });
  }

  insercaoMetadados(name, framesQuantity) {

    const metadata = {
      colors: this.colors,
      name,
      height: this.height,
      width: this.frameWidth,
      spriteWidth: this.width,
      framesQuantity,
      animations: this.animationArray,
      imgBase: this.baseSelect,
      category: this.form.value.category
    };

    console.log(metadata);
    this.imageService.createImage(metadata, this.path).subscribe((data2: any) => {
      console.log(data2);
      alert(data2.message);
      this.uploaded = false;
    });
  }

  adicionarAnimation( name, frames ) {
   if (!this.frameWidth) {
     this.frameWidth =  this.width / this.form.value.frames ;
     this.animationSelect = 0;
   }
   if (name === '' || frames === '') {
     return;
   } else {
     this.animationArray.push({name, frames});
   }
  }

  alteraCoresData(value, index) {
   this.colors[index]['name'] = value;
   console.log(this.colors[index]);
  }

  removeFile(nome) {
    const index = this.animationArray.indexOf(nome);
    if (index !== -1) {this.animationArray.splice(index, 1); }
  }

}
