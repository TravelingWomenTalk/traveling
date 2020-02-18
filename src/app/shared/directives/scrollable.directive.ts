import { Directive, HostListener, EventEmitter, Output, ElementRef } from '@angular/core';

@Directive({
  selector: '[scrollable]'
})
export class ScrollableDirective {

  @Output() scrollPosition = new EventEmitter()
  
  constructor(public el: ElementRef) { 
    console.log(el);}

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    try {

      const top = event.target.scrollTop
      const innerHeight = event.target.defaultView.innerHeight;
      const scrollY = event.target.defaultView.scrollY;
      const height = this.el.nativeElement.scrollHeight
      const offset = this.el.nativeElement.offsetHeight
      
      // emit bottom event
      if (innerHeight + scrollY >= offset) {
        this.scrollPosition.emit('bottom')
      }
      // emit bottom event
      if (top > height - offset - 1) {
        this.scrollPosition.emit('bottom')
      }

      // emit top event
      if (top === 0) {
        this.scrollPosition.emit('top')
      }

    } catch (err) {
      console.log(err);}
  }

}