import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'pixel-left-image-list',
  templateUrl: './left-image-list.component.html',
  styleUrls: ['./left-image-list.component.scss'],
  animations: [
    trigger('changeSize', [
      state('initial', style({
        transform: 'scale(0.1)'
      })),
      state('final', style({
        transform: 'scale(1)'
      })),
      transition('initial=>final', animate('150ms')),
      transition('final=>initial', animate('500ms'))
    ]),
    trigger('opacity', [
      state('initial', style({
        opacity: 0,
      })),
      state('final', style({
        opacity: 100
      })),
      transition('initial=>final', animate('600ms')),
      transition('final=>initial', animate('500ms'))
    ])
  ]
})
export class LeftImageListComponent implements OnInit {

  currentState = 'initial';
  inputState = 'initial';
  isSearching = false;

  onSwitch() {
    this.currentState = this.currentState === 'initial' ? 'final' : 'initial';
    setTimeout(() => this.secondSwitch(), 150);
  }

  secondSwitch() {
    this.inputState = this.inputState === 'initial' ? 'final' : 'initial';
  }

  onClickSearch() {
    this.isSearching = !this.isSearching;
    setTimeout(() => {
      this.onSwitch();
    });
  }

  constructor(private cdRef: ChangeDetectorRef, private router: Router) { }

  @Input() set metadata(_metadata){



    if(_metadata === undefined){
      return
    }

    if(this.arrayMetadata === _metadata){
      return
    }


    if(_metadata.length > 0){
      this.arrayMetadata = _metadata;
      this.toggleImages = true;
      for (let i = 0; i < this.arrayMetadata.length; i++) {
        if (this.arrayMetadata[i].metadata.imgBase === true) {
          this.arrayBases.push(this.arrayMetadata[i]);

        }
      }

      this.setBase.emit(this.arrayBases[0]);

    }
  }

  arrayBases = [];
  arrayCategorias = [];

  arrayMetadata = [];
  toggleImages: boolean;

  @Output() image = new EventEmitter();
  @Output() setBase = new EventEmitter();
  @Output() removeAcessory = new EventEmitter();


  _activeBase;
  @Input() set activeBase(baseId){

    if(baseId === undefined){
      return;
    }

    this._activeBase = baseId;

    this.cdRef.detectChanges();
  };



  ngOnInit() {
    this.toggleImages = false;
  }


  emitImage(image) {
    this.image.emit(image);
  }


  changeCategoryArray(index) {

    this.arrayCategorias = this.arrayBases[index].metadata.category;

    this.arrayCategorias = this.arrayCategorias.map((category) => {

      const objsOfCategory = this.arrayMetadata.filter( (image) => {

        if (image.metadata.category === undefined) {
          return false;
        }

        return image.metadata.category.toString() === category.toString();
      });

      return {
        category,
        objsOfCategory
      };

    });

    this.setBase.emit(this.arrayBases[index]);
  }

  functionRemoveAcessory(acessory){
    this.removeAcessory.emit(acessory);
  }

  navigateBack() {
    this.router.navigate(['management']);
  }

}
