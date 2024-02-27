import { DomSanitizer } from "@angular/platform-browser";
import { FileHandler } from "./app.model";

export const processSelectedFileList = (fileList: FileList, selectedFiles: FileHandler[], sanitizer: DomSanitizer): FileHandler[] => {
    if (!fileList || fileList.length === 0) {
        return [];
    }

       // Pętla przez wszystkie nowo wybrane pliki
    for (let i = 0; i < fileList.length; i++) {
        if (selectedFiles.length >= 4) {
          // Przekroczenie limitu plików
          alert("Można przesłać maksymalnie 4 zdjęcia.");
          break;
        }
    
        const file = fileList[i];
    
        // Sprawdź typ pliku (opcjonalnie można dodać dodatkowe walidacje, np. rozmiar pliku)
        if (file.type.match(/image\/*/) && !selectedFiles.some(f => f.file.name === file.name)) {
          const fileHandler: FileHandler = {
            file: file,
            url: sanitizer.bypassSecurityTrustUrl(
              URL.createObjectURL(file)
            )
          }
          selectedFiles.push(fileHandler);
        } else {
          alert("Dozwolone są tylko pliki obrazów.");
        }
    }
    return selectedFiles;
}