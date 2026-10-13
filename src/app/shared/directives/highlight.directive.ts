import { Directive, ElementRef, HostListener, Input, inject } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  @Input() appHighlight = '';          // optional hover color

  private el = inject(ElementRef<HTMLElement>);
  private originalColor = '';

  @HostListener('mouseenter')
  onMouseEnter() {
    this.originalColor = this.el.nativeElement.style.backgroundColor;
    this.el.nativeElement.style.backgroundColor = this.appHighlight || '#fef9c3';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.el.nativeElement.style.backgroundColor = this.originalColor;
  }
}