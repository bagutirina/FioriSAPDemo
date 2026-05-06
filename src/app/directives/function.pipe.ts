import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'appFunctionPipe' })
export class FunctionPipe implements PipeTransform {
  transform(date: string, fn): string {
    return fn(date);
  }
}

@Pipe({ name: 'prettyJson' })
export class PrettyJsonPipe implements PipeTransform {
  transform(value: any): string {
    return JSON.stringify(
      value,
      (k, v) => {
        // dacă este un array scurt, îl întoarcem pe o singură linie
        if (
          Array.isArray(v) &&
          v.length <= 4 &&
          v.every((x) => typeof x === 'number')
        ) {
          return '[' + v.join(', ') + ']';
        }
        return v;
      },
      2
    );
  }
}
