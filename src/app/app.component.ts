import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandler } from './app.model';
import { processSelectedFileList } from './util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'photo-form';

  productForm!: FormGroup;
  @ViewChild('fileInput') fileInput!: ElementRef;
  selectedFiles: FileHandler[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private sanitazier: DomSanitizer
  ){}
  
  ngOnInit() {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      productPrice: ['', Validators.required],
      productDescription: ['', Validators.required],
    });
  }

  onSubmit(){}

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    const fileList = input.files;
    if(fileList){
      this.selectedFiles = processSelectedFileList(fileList, this.selectedFiles, this.sanitazier);
    }
  }

  onUploadButtonClick() {
    this.fileInput.nativeElement.click();
  }
  
  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
  }

  onDropped(event: FileList) {
    this.selectedFiles = processSelectedFileList(event, this.selectedFiles, this.sanitazier);
  }
}