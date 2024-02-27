import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';
import { FileHandler } from './app.model';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector: '[appDrag]'
})
export class DragDirective {

  @Output() files: EventEmitter<FileList> = new EventEmitter();

  @HostBinding("style.background") private bg = "#eee";

  @HostListener("dragover", ["$event"])
  public onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.bg = "#999";
  }

  @HostListener("dragleave", ["$event"])
  public onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.bg = "#eee";
  }
  
  @HostListener("drop", ["$event"])
  public onDrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.bg = "#eee";

    const fileList = evt.dataTransfer?.files ;
    this.files.emit(fileList);
  }
}
