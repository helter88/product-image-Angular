import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandler } from './app.model';

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
      productImages: ['', Validators.required] 
    });
  }

  onSubmit(){}

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }
  
    // Pętla przez wszystkie nowo wybrane pliki
    for (let i = 0; i < input.files.length; i++) {
      if (this.selectedFiles.length >= 4) {
        // Przekroczenie limitu plików
        alert("Można przesłać maksymalnie 4 zdjęcia.");
        break;
      }
  
      const file = input.files[i];
  
      // Sprawdź typ pliku (opcjonalnie można dodać dodatkowe walidacje, np. rozmiar pliku)
      if (file.type.match(/image\/*/) && !this.selectedFiles.some(f => f.file.name === file.name)) {
        const fileHandler: FileHandler = {
          file: file,
          url: this.sanitazier.bypassSecurityTrustUrl(
            URL.createObjectURL(file)
          )
        }
        this.selectedFiles.push(fileHandler);
     
      } else {
        alert("Dozwolone są tylko pliki obrazów.");
      }
    }
  }

  onUploadButtonClick() {
    this.fileInput.nativeElement.click();
  }
  
  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
  }
}

