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
  private buttomState: string;
  private formData: FormData = new FormData();

  constructor(private paleteService: PaleteService) { }

  ngOnInit() {
  }

  deletePalete(id) {
    this.paleteService.deletePalete(id).subscribe((data: any) => {
      alert(data.message);
      this.paleteService.getAllPaletes().subscribe((data2: any) => {
        this.PaleteList = data2;
      });
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
    this.paleteService.uploadPhoto(this.formData).subscribe((data: any) => {

      this.buttomState = 'Finalizado';

    });
  }


}
