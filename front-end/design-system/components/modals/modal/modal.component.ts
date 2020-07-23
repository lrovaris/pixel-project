import {
  Component,
  OnInit,
  ElementRef,
  Output,
  EventEmitter,
  Input
} from '@angular/core';

@Component({
  selector: 'pixel-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  currentState = 'initial';

  constructor(private el: ElementRef) {
    this.title = 'modal'
  }

  ngOnInit() { }

  @Output() modalOutput = new EventEmitter();

  _title;

  @Input() set title(new_title){
    this._title = new_title
  };

  close() {

    this.currentState = 'final';
    setTimeout(() => {
      this.currentState = 'initial';
      setTimeout(() => {
        this.modalOutput.emit({ message: 'close'});
      }, 50);
    }, 250);



  }

}
