import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandler } from './app.model';
import { processSelectedFileList } from './util';
import { ProductService } from './product.service';

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
    private sanitazier: DomSanitizer,
    private productService: ProductService
  ){}
  
  ngOnInit() {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit(){
    if (this.productForm.valid) {
      const formData = new FormData();
      formData.append('productData', JSON.stringify(this.productForm.value));
      if(this.selectedFiles.length){
        this.selectedFiles.forEach((fileHandler, index) => {
          formData.append(`image${index}`, fileHandler.file);
        });
      }
      this.productService.addProduct(formData).subscribe();
    }
  }

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