import { Component, OnInit } from '@angular/core';
import {ImagesService} from '../../services/images.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  imagesList = [];

  constructor(private images: ImagesService, private router: Router) { }

  navigateEdit(image) {
    this.router.navigate(['edit'], {state: image});
  }

  ngOnInit() {

    this.images.getAllImages().subscribe((data: any) => {
      console.log(data);

      this.imagesList = data;
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
