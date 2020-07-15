import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ImagesService} from "../../services/images.service";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  constructor(private router: Router, private imageService: ImagesService) { }

  image: any;

  ngOnInit() {
    this.image = history.state;
  }

  saveMetadata(metadata) {
    this.imageService.updateImage(this.image._id, metadata).subscribe((data: any) => {
      alert(data.message);
      this.router.navigate(['']);
    });
  }

}
