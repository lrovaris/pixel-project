import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ImagesService} from "../../services/images.service";
import {isArray} from "util";

@Component({
  selector: 'app-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.scss']
})
export class MetadataComponent implements OnInit {


  imgPath = '';
  uploaded: boolean;

  @Input() image;

  animationSelect: any;
  frameWidth: any;
  id: any;
  @Input() colors = [];
  baseSelect: any;


  // INPUTS
  @Input() path;
  @Input() name;
  @Input() frames;
  @Input() category;
  @Input() imgBase;
  @Input() baseId;
  @Input() animationArray: Array<any>;
  @Input() height: any;
  @Input() width: any;
  @Input() spriteType;
  @Input() spriteView;
  @Input() theme;

  @Output() saveMetadata = new EventEmitter();

  checkBase: boolean;
  allImages = [];
  @Input() categoryArray = [];

  form: FormGroup;

  constructor(private imageService: ImagesService, private formBuild: FormBuilder) {
    this.form = this.formBuild.group({
      name: [this.name],
      frames: [this.frames],
      category: [this.category],
      theme: [this.theme],
      spriteType: [this.spriteType],
      spriteView: [this.spriteView]
    });
  }

  ngOnInit() {

    console.log(this.baseId);

    setTimeout( () => {
      if (this.category !== undefined) {
        if (isArray(this.category)) {
          this.categoryArray = this.category;
          this.category = undefined;
          this.baseSelect = 'base';
          this.checkBase = true;
        } else {
          console.log(this.category);
          this.baseSelect = 'acessorio';
          this.checkBase = false;
          this.categoryArray = [];
          this.imgBase = this.allImages.find(img => img._id === this.imgBase);
          this.allImages = [];
          this.allImages.push(this.imgBase);
          this.categoryArray = this.imgBase.metadata.category;
          console.log(this.category);
          console.log(this.allImages);
        }
      }
    }, 1000);

    this.animationSelect = 0;
    this.imageService.getAllImages().subscribe((data: any) => {
      this.allImages = data;
    });
    console.log(this.spriteType, this.spriteView, this.theme, this.image);


  }

  changeBase() {
    this.checkBase = this.baseSelect === 'base';
  }

  insercaoMetadados(name, framesQuantity) {

    console.log(this.form.value.theme, this.form.value.spriteType);
    console.log(this.theme, this.spriteView);

    if (!this.checkBase) {
      this.baseSelect = this.baseId;
    } else {
      this.baseSelect = true;
      this.category = this.categoryArray;
    }

    const metadata = {
      colors: this.colors,
      name,
      height: this.height,
      width: this.frameWidth,
      spriteWidth: this.width,
      framesQuantity,
      animations: this.animationArray,
      imgBase: this.baseSelect,
      category: this.category,
      theme: this.form.value.theme,
      spriteType: this.form.value.spriteType,
      spriteView: this.form.value.spriteView
    };

    return this.saveMetadata.emit(metadata);

  }

  adicionarAnimation( name, frames ) {
    if (!this.frameWidth) {
      this.frameWidth =  this.width / this.form.value.frames ;
      this.animationSelect = 0;
    }
    if (name === '' || frames === '') {
      return;
    } else {
      this.animationArray.push({name, frames});
    }
  }

  alteraCoresData(value, index) {
    this.colors[index]['name'] = value;
  }

  removeFile(nome) {
    const index = this.animationArray.indexOf(nome);
    if (index !== -1) {this.animationArray.splice(index, 1); }
  }

  adicionarCategoria(category) {
    if (category === '') {
      alert('nao adicione categorias vazias');
      return;
    }
    this.categoryArray.push(category);

  }

  removeCategoria(nome) {
    const index = this.categoryArray.indexOf(nome);
    if (index !== -1) {this.categoryArray.splice(index, 1); }
  }

  selectBase(id) {
    this.baseId = id;
    this.imgBase = this.allImages.find(img => img._id === id);
    this.animationArray = this.imgBase.metadata.animations 
    this.categoryArray = this.imgBase.metadata.category;
    this.category = this.categoryArray[0];
  }

  selectCategory(category) {
    this.category = category;
    console.log(this.category);
    console.log(category);
  }

}
