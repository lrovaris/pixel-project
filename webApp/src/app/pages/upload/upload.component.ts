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

  uploadPhoto() {

    this.checkEnviou = false;
    this.imgName = 'Escolha uma foto';
    this.buttomState = 'Enviando';
    for (let i = 0; i < this.fileToUpload.length; i++) {
      this.formData.append('docs', this.fileToUpload[i]);
    }
    this.imageService.uploadPhoto(this.formData).subscribe((data: any) => {

      this.buttomState = 'Finalizado';

      this.path = data.info_files[0].path;
      this.width = data.info_files[0].metadata.width;
      this.height = data.info_files[0].metadata.height;
      this.formData = new FormData();
      this.uploaded = true;

      this.colors = data.info_files[0].metadata.colors;
    });
  }

  saveMetadata(metadata){

    console.log(metadata);
    console.log(this.path);


  }

}
