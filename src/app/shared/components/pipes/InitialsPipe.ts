import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {

  transform(value: string | null | undefined): string {
    if (!value  || !value?.trim()) {
      return '?';
    }

    return value
      .trim()
      .split(/\s+/)          // split on one or more spaces
      .slice(0, 2)           // only the first two words
      .map(word => word.charAt(0).toUpperCase())
      .join('');
  }
}