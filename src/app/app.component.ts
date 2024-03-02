import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandler, ImageDto } from './app.model';
import { ProductService } from './product.service';
import { base64ToBlob, processSelectedFileList } from './util';

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
    this.productService.getProduct(1).subscribe( product => {
      this.productForm.patchValue(product);
      product.images.forEach(img => {
        const file = this.createFileFromImage(img);
        this.selectedFiles.push({
          file,
          url: this.sanitazier.bypassSecurityTrustUrl(URL.createObjectURL(file))
        })
       })
    });
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
        this.selectedFiles.forEach((fileHandler) => {
          formData.append(`images`, fileHandler.file);
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

  private createFileFromImage(image: ImageDto): File {
    const blob = base64ToBlob(image.base64, image.filetype);
    return new File([blob], image.filename, { type: image.filetype });
  }
}