import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'pixel-acessory-modal',
  templateUrl: './acessory-modal.component.html',
  styleUrls: ['./acessory-modal.component.scss']
})
export class AcessoryModalComponent implements OnInit {

  @Output() modalOutput = new EventEmitter();

  @Input() spriteList = [];

  constructor() { }

  ngOnInit() {
    console.log(this.spriteList);
  }

  cancelButton() {
    this.modalOutput.emit({ message: 'close'})
  }

}
