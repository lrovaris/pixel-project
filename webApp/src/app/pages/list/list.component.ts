import { Component, OnInit } from '@angular/core';
import {ImagesService} from '../../services/images.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  imagesList = [];

  constructor(private images: ImagesService) { }

  ngOnInit() {

    this.images.getAllImages().subscribe((data: any) => {
      this.imagesList = data;
      console.log(data);
    });

  }

  deleteImage(id) {
    this.images.deleteImages(id).subscribe((data: any) => {
      alert(data.message);
      this.images.getAllImages().subscribe((data2: any) => {
        this.imagesList = data2;
      });
    });
  }

}
