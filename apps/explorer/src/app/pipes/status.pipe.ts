import { Pipe, PipeTransform } from '@angular/core';
import { Status } from '../models/status';

@Pipe({
  name: 'status',
})
export class StatusPipe implements PipeTransform {
  transform(value: Status): string {
    return value == Status.ALIVE ? 'Alive' : 'Dead';
  }
}
