import { Directive, ElementRef, HostListener, Input, OnDestroy, Renderer2, inject, isStandalone } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: true
})
export class TooltipDirective implements OnDestroy {
  @Input() appTooltip = '';   // text to display

  private el = inject(ElementRef<HTMLElement>);
  private renderer = inject(Renderer2);
  private tooltipEl: HTMLElement | null = null;

  @HostListener('mouseenter')
  show(): void {
    if (!this.appTooltip || this.tooltipEl) return;

    this.tooltipEl = this.renderer.createElement('span');
    const text = this.renderer.createText(this.appTooltip);
    this.renderer.appendChild(this.tooltipEl, text);

    this.renderer.setAttribute(
      this.tooltipEl,
      'class',
      'absolute left-0 top-full mt-1 z-10 w-64 rounded bg-slate-800 px-2 py-1 text-xs text-white shadow'
    );

    this.renderer.addClass(this.el.nativeElement, 'relative');
    this.renderer.appendChild(this.el.nativeElement, this.tooltipEl);
  }

  @HostListener('mouseleave')
  hide(): void {
    if (this.tooltipEl) {
      this.renderer.removeChild(this.el.nativeElement, this.tooltipEl);
      this.tooltipEl = null;
    }
  }

  ngOnDestroy(): void {
    this.hide();
  }
}