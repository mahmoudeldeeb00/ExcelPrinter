import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDropzoneDirective]'
})
export class DropzoneDirective {

  
  @Output() fileDropped = new EventEmitter<File>();

  @HostBinding('class.fileover') fileOver: boolean = false;

  @HostListener('dragover', ['$event']) onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = true;
  }

  @HostListener('dragleave', ['$event']) onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
  }

  @HostListener('drop', ['$event']) ondrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;

    const file = evt.dataTransfer?.files?.[0];
    if (file) this.fileDropped.emit(file);
  }

}
