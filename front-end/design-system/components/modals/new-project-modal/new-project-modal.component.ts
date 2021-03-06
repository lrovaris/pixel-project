import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import {FormBuilder, FormGroup} from "@angular/forms";


@Component({
  selector: 'pixel-new-project-modal',
  templateUrl: './new-project-modal.component.html',
  styleUrls: ['./new-project-modal.component.scss']
})
export class NewProjectModalComponent implements OnInit {

  constructor(private formBuild: FormBuilder) {

    this.newProjectForm = this.formBuild.group({
      projectView: ['platformer'],
      name: [''],
      palette: ['']
    });
  }

  _colorPalettes = [];
  currentPalette: any;

  currentStateConfirm = 'initial';
  currentStateCancel = 'initial';

  @Input() set colorPalettes(palettes){

    if(palettes === undefined){
      return
    }

    this._colorPalettes = palettes
  }

  getColor(color){
    return `rgba(${color.r},${color.g},${color.b},${color.a})`
  }

  @Output() modalOutput = new EventEmitter();

  newProjectForm: FormGroup;

  ngOnInit() {
    console.log(this._colorPalettes);
  }

  cancelButton() {

    this.currentStateCancel = 'final';
    setTimeout(() => {
      this.currentStateCancel = 'initial';
      setTimeout(() => {
        this.modalOutput.emit({message: 'close'});
      }, 50);
    }, 250);
  }

  confirm() {

    this.currentStateConfirm = 'final';
    setTimeout(() => {
      this.currentStateConfirm = 'initial';
      setTimeout(() => {

        if(this.newProjectForm.value.name === ''){
          return;
        }

        if(this.newProjectForm.value.palette === ''){
          return;
        }


        this.modalOutput.emit({ message: 'new-project', projectInfo: this.getFormValues()})

        this.resetForm();

        this.modalOutput.emit({ message: 'close'});

      }, 50);
    }, 250);


  }

  pickPalette(palette,index){
    this.currentPalette = palette;

    this.newProjectForm.controls['palette'].setValue(palette);

  }

  getFormValues(){
    return{
      projectView: this.newProjectForm.value.projectView,
      name: this.newProjectForm.value.name,
      palette: this.newProjectForm.value.palette,
    }
  }

  resetForm(){

    this.newProjectForm.controls['projectView'].setValue('platformer');
    this.newProjectForm.controls['name'].setValue('');
    this.newProjectForm.controls['palette'].setValue('');

  }


}
