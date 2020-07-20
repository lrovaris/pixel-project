import { Component, OnInit} from '@angular/core';

import {Router} from "@angular/router";

import { FileService} from './services/file.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'front-end';

  constructor(private router: Router, private fileService: FileService) {

  }

  ngOnInit() {

    this.router.navigate([''])

  }

}
