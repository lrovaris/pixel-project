import { Component, OnInit } from '@angular/core';
import {ImagesService} from '../../services/images.service';

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

  constructor(private imageService: ImagesService) { }

  ngOnInit() {
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
      console.log(data.info_files[0]);
      alert(data.message);
      const metadata = {name: data.info_files[0].nome};
      this.formData = new FormData();

      this.imageService.createImage(metadata, data.info_files[0].path).subscribe((data2: any) => {
        console.log(data2);
        alert(data2.message);
        setTimeout(() => {
          this.buttomState = 'Concluído';
          this.styleConcluido = true;
          setTimeout(() => {
            this.buttomState = 'Enviar';
            this.styleConcluido = false;
          }, 2000);
        }, 100);
      });
    });
  }

  adicionarAnimation( name, frames ) {
   if (name === '' || frames === '') {
     return;
   } else {
     this.animationArray.push({name, frames});
   }
  }

  removeFile(nome) {
    const index = this.animationArray.indexOf(nome);
    if (index !== -1) {this.animationArray.splice(index, 1); }
  }

}
