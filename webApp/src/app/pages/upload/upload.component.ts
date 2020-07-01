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
  fileToUpload: Array<File> = [];
  formData: FormData = new FormData();
  imgPath = '';
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
  category: any;
  imgBase: any;
  baseId: any;

  checkBase: boolean;
  allImages = [];
  categoryArray = [];

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
    this.imageService.getAllImages().subscribe((data: any) => {
      console.log(data);
      this.allImages = data;
    });
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

    if (!this.checkBase) {
      this.baseSelect = this.baseId;
    } else {
      this.baseSelect = true;
      this.category = this.categoryArray;
    }

    const metadata = {
      colors: this.colors,
      name,
      height: this.height,
      width: this.frameWidth,
      spriteWidth: this.width,
      framesQuantity,
      animations: this.animationArray,
      imgBase: this.baseSelect,
      category: this.category
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

  adicionarCategoria(category) {
    if (category === '') {
      alert('nao adicione categorias vazias');
      return;
    }
    this.categoryArray.push(category);
  }

  removeCategoria(nome) {
    const index = this.categoryArray.indexOf(nome);
    if (index !== -1) {this.categoryArray.splice(index, 1); }
  }

  selectBase(id) {
    this.baseId = id;
    this.imgBase = this.allImages.find(img => img._id === id);
    this.categoryArray = this.imgBase.metadata.category;
  }

  selectCategory(category) {
    this.category = category;
  }

}
