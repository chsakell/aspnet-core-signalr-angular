import { Directive, ElementRef, HostListener, Input, Renderer } from '@angular/core';

@Directive({
  selector: '[feedHighlight]'
})
export class HighlightDirective {
  constructor(private el: ElementRef, private renderer: Renderer) {
      this.renderer.setElementClass(this.el.nativeElement, 'feed-highlight', true);
   }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('white');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.renderer.setElementStyle(this.el.nativeElement, 'backgroundColor', color);
  }
}