import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'pixel-export-modal',
  templateUrl: './export-modal.component.html',
  styleUrls: ['./export-modal.component.scss']
})
export class ExportModalComponent implements OnInit {

  constructor(private formBuild: FormBuilder) {

    this.exportParamsForm = this.formBuild.group({
      exportAs: ['spritesheet'],
      scale: ['x1'],
      layersAsSeparateFiles: [false],
      animationAsNewRow: [false],
      animationAsSeparateFile: [false],
      path: [''],
      fileName: [''],
      fileFormat: ['']
    })

  }

  ngOnInit() { }

  exportParamsForm: FormGroup;

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

  exportButton(){
    this.modalOutput.emit({ message: 'export', exportParams: this.getFormValues()})
  }

  cancelButton(){
    this.modalOutput.emit({ message: 'close'})
  }

  pathDialog(){
    this.modalOutput.emit({ message: 'path_dialog'})
  }

  exportAs(){
    return this.exportParamsForm.value.exportAs;
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
