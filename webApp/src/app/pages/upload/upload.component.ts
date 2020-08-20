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
  rgba: any;
  checkBase: boolean;
  allImages = [];
  categoryArray = [];
  oldRgba: any;

  rgbaArray = [];

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



 async addPicutre(event) {
    this.fileToUpload = [];
    const newFile = event.target.files[0];
    this.imgName = event.target.files[0].name;
    this.checkEnviou = true;
    this.fileToUpload = [newFile];



   if (event.target.files && event.target.files[0]) {

     const reader = new FileReader();
     reader.onload = (e: any) => {
       const image = new Image();
       image.src = e.target.result;
       image.onload = rs => {
         const imgHeight = rs.currentTarget['height'];
         const imgWidth = rs.currentTarget['width'];

         console.log(imgHeight, imgWidth);

         console.log(rs);

         const image = new Image();
         image.src = rs.currentTarget['src'];
         image.onload = () => {
           const canvas = document.createElement('canvas');
           canvas.width = image.width;
           canvas.height = image.height;

           const context = canvas.getContext('2d');
           context.drawImage(image, 0, 0);

           const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

           console.log(imageData);

           // Now you can access pixel data from imageData.data.
           // It's a one-dimensional array of RGBA values.
           // Here's an example of how to get a pixel's color at (x,y)
        //   const index = (1*imageData.width + i) * 4;

           let oldRgba;

           for (let y = 0; y < canvas.height; y++) {
             for (let x = 0; x < canvas.width; x++) {
               const idx = (canvas.width * y + x) << 2;



               this.rgba = {
                 r: imageData.data[idx],
                 g: imageData.data[idx + 1],
                 b: imageData.data[idx + 2],
                 a: imageData.data[idx + 3]
               };


               if (this.oldRgba === undefined) {
                 this.rgbaArray.push(this.rgba);
                 this.oldRgba = this.rgba;
               }

               if (this.rgba !== this.oldRgba) {

                 console.log();

                 if (!this.rgbaArray.find((id) => {
                   return ((id.r === this.rgba.r) && (id.g === this.rgba.g) && (id.b === this.rgba.b) && (id.a === this.rgba.a));
                 })) {
                   this.rgbaArray.push(this.rgba);
                 }
                } else {
                this.oldRgba = this.rgba;
                }

             }
           }
           console.log(this.rgba);
           console.log(this.rgbaArray);
         };




       };
     };

     console.log(reader.readAsDataURL(event.target.files[0]));
   }


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

      console.log(data.info_files[0]);

      this.path = data.info_files[0].path;
      this.width = data.info_files[0].metadata.width;
      this.height = data.info_files[0].metadata.height;
      this.formData = new FormData();
      this.uploaded = true;

      this.colors = data.info_files[0].metadata.colors;

    });
  }

  saveMetadata(metadata) {
    console.log(metadata);

    console.log(this.path);

    this.imageService.createImage(metadata, this.path).subscribe((data: any) => {
      console.log(metadata);
      alert(metadata.name + ' Foi adicionado a lista!');
      this.uploaded = false;
    });

  }

}
