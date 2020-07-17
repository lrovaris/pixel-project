import { Component, OnInit } from '@angular/core';
import {PaleteService} from '../../services/palete.service';

@Component({
  selector: 'app-paleta-page',
  templateUrl: './paleta-page.component.html',
  styleUrls: ['./paleta-page.component.scss']
})
export class PaletaPageComponent implements OnInit {

  PaleteList = [];
  private fileToUpload: any[];
  private imgName: any;
  private checkEnviou: boolean;
  private buttomState = 'Upload';
  private formData: FormData = new FormData();

  palletName;

  oldRgba: any;
  rgba: any;
  rgbaArray = [];

  paleteList = [];

  isUploading = false;

  constructor(private paleteService: PaleteService) { }

  ngOnInit() {
    this.paleteService.getAllPaletes().subscribe((data: any ) => {
      console.log(data);
      this.PaleteList = data;
    });
  }

  deletePalete(id) {
    this.paleteService.deletePalete(id).subscribe((data: any) => {
      alert(data.message);
      this.paleteService.getAllPaletes().subscribe((data2: any) => {
        this.PaleteList = data2;
      });
    });
  }

  onUpload() {
    this.isUploading = !this.isUploading;
    this.buttomState = this.buttomState === 'Upload' ? 'Lista' : 'Upload';
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

          const image = new Image();
          image.src = rs.currentTarget['src'];
          image.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;

            const context = canvas.getContext('2d');
            context.drawImage(image, 0, 0);

            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);


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

  uploadPalete(name) {

   const palete = {
      name,
      colors: this.rgbaArray
    };


   console.log(palete);

    this.paleteService.uploadPalete(palete).subscribe((data: any) => {
      console.log(data);
      alert(data.message);
      this.isUploading = false;
    });


  }


}
