import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: 'img',
})
export class LazyloadDirective {
  constructor({ nativeElement }: ElementRef<HTMLImageElement>) {
    const supports = 'loading' in HTMLImageElement.prototype;
    if (supports) {
      nativeElement.setAttribute('loading', 'lazy');
    } else {
      // fallback to IntersectionObserver
      console.log("Your browser does not support image lazyload. Check https://caniuse.com/?search=loading to get more info.")
    }
  }
}
