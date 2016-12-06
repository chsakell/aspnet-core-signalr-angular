import { Directive, ElementRef, HostListener, Input, Renderer } from '@angular/core';

@Directive({
  selector: '[feedHighlight]'
})
export class HighlightDirective {
  constructor(private el: ElementRef, private renderer: Renderer) {
    let self = this;
    self.renderer.setElementClass(this.el.nativeElement, 'feed-highlight', true);
    let horn = document.getElementById('horn');
    horn.className += ' orange';
    setTimeout(function () {
      self.renderer.setElementClass(self.el.nativeElement, 'feed-highlight-light', true);

      document.getElementById("horn").className = document.getElementById("horn").className.replace(/(?:^|\s)orange(?!\S)/g, '')
    }, 1000);
  }

  private highlight(color: string) {
    this.renderer.setElementStyle(this.el.nativeElement, 'backgroundColor', color);
  }
}