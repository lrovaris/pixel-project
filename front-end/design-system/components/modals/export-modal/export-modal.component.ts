import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'pixel-export-modal',
  templateUrl: './export-modal.component.html',
  styleUrls: ['./export-modal.component.scss']
})
export class ExportModalComponent implements OnInit {

  currentStateExport = 'initial';
  currentStateCancel = 'initial';
  currentStatePath = 'initial';
  exportParamsForm: FormGroup;


  constructor(private formBuild: FormBuilder) {

    this.exportParamsForm = this.formBuild.group({
      exportAs: ['spritesheet'],
      scale: ['x1'],
      layersAsSeparateFiles: [false],
      animationAsNewRow: [false],
      animationAsSeparateFile: [false],
      path: [''],
      fileName: [''],
      fileFormat: ['png']
    })

  }

  ngOnInit() { }


  @Input() set filePath(_path){
    this.exportParamsForm.controls['path'].setValue(_path)
  }

  @Input() set fileName(_name){
    this.exportParamsForm.controls['fileName'].setValue(_name)
  }

  @Input() set fileExtension(_extension){
    this.exportParamsForm.controls['fileFormat'].setValue(_extension)
  }


  @Output() modalOutput = new EventEmitter();

  exportButton() {

    this.currentStateExport = 'final';
    setTimeout(() => {
      this.currentStateExport = 'initial';
      setTimeout(() => {

        if (this.exportParamsForm.value.path === '') {
          return
        }

        if (this.exportParamsForm.value.fileName === '') {
          return
        }

        this.modalOutput.emit({message: 'export', exportParams: this.getFormValues()})

        this.resetForm();

        this.modalOutput.emit({message: 'close'})

      }, 50);
    }, 250);

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

  pathDialog(){
    this.currentStatePath = 'final';
    setTimeout(() => {
      this.currentStatePath = 'initial';
      setTimeout(() => {
        this.modalOutput.emit({ message: 'path_dialog'})
      }, 50);
    }, 250);
  }

  exportAs(){
    return this.exportParamsForm.value.exportAs;
  }

  exportAsChanged(newValue){

    this.resetForm();

  }

  resetForm(){

    this.exportParamsForm.controls['scale'].setValue('x1');
    this.exportParamsForm.controls['layersAsSeparateFiles'].setValue(false);
    this.exportParamsForm.controls['animationAsNewRow'].setValue(false);
    this.exportParamsForm.controls['animationAsSeparateFile'].setValue(false);
    this.exportParamsForm.controls['path'].setValue('');
    this.exportParamsForm.controls['fileName'].setValue('');
    this.exportParamsForm.controls['fileFormat'].setValue('png');

  }

  getFormValues(){
    return{
      exportAs: this.exportParamsForm.value.exportAs,
      scale: this.exportParamsForm.value.scale,
      layersAsSeparateFiles: this.exportParamsForm.value.layersAsSeparateFiles,
      animationAsNewRow: this.exportParamsForm.value.animationAsNewRow,
      animationAsSeparateFile: this.exportParamsForm.value.animationAsSeparateFile,
      path: this.exportParamsForm.value.path,
      fileName: this.exportParamsForm.value.fileName,
      fileFormat: this.exportParamsForm.value.fileFormat
    }
  }

}
