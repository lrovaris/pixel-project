import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ImagesService} from "../../services/images.service";

@Component({
  selector: 'app-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.scss']
})
export class MetadataComponent implements OnInit {


  imgPath = '';
  uploaded: boolean;
  path: any;
  height: any;
  width: any;
  animationSelect: any;
  frameWidth: any;
  id: any;
  colors = [];
  baseSelect: any;



  // INPUTS
  @Input() name;
  @Input() frames;
  @Input() category;
  @Input() imgBase;
  @Input() baseId;
  @Input() animationArray: Array<any>;

  checkBase: boolean;
  allImages = [];
  categoryArray = [];

  form: FormGroup;

  constructor(private imageService: ImagesService, private formBuild: FormBuilder) {
    this.form = this.formBuild.group({
      name: [this.name],
      frames: [this.frames],
      category: [this.category]
    });
  }

  ngOnInit() {
    this.uploaded = false;
    this.baseSelect = true;
    this.imageService.getAllImages().subscribe((data: any) => {
      console.log(data);
      this.allImages = data;
    });
  }

  changeBase() {
    this.checkBase = this.baseSelect === 'base';
  }

  insercaoMetadados(name, framesQuantity) {

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
      category: this.category
    };

    console.log(metadata);
    this.imageService.createImage(metadata, this.path).subscribe((data2: any) => {
      console.log(data2);
      alert(data2.message);
      this.uploaded = false;
    });
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
    console.log(this.colors[index]);
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
    this.categoryArray = this.imgBase.metadata.category;
  }

  selectCategory(category) {
    this.category = category;
  }

}
