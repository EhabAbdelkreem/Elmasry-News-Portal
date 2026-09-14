import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeHtml, SafeUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safe',
  standalone: true
})
export class SafePipe implements PipeTransform {
  private sanitizer = inject(DomSanitizer);

  transform(value: string | undefined | null, type: 'resourceUrl' | 'url' | 'html' = 'resourceUrl'): SafeResourceUrl | SafeHtml | SafeUrl | string {
    if (!value) return '';
    switch (type) {
      case 'resourceUrl':
        return this.sanitizer.bypassSecurityTrustResourceUrl(value);
      case 'url':
        return this.sanitizer.bypassSecurityTrustUrl(value);
      case 'html':
        return this.sanitizer.bypassSecurityTrustHtml(value);
      default:
        return this.sanitizer.bypassSecurityTrustResourceUrl(value);
    }
  }
}
