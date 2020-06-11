import { Component, OnInit } from '@angular/core';
import {ImagesService} from "../../services/images.service";

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
  imgName = 'Escolha uma Foto';
  checkEnviou = false;

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
      console.log(data);

      this.formData = new FormData();
 /*     this.userService.updateUser(user, thisUser._id).subscribe((data2: any) => {
        console.log(data2);
        this.imgPath = `http://34.95.248.144:3000/files/profile/${data2.user.picture}`;
        setTimeout(() => {
          this.buttomState = 'Concluído';
          this.styleConcluido = true;
          setTimeout(() => {
            this.buttomState = 'Enviar';
            this.styleConcluido = false;
          }, 2000);
        }, 100);
      });*/
    });
  }

}
