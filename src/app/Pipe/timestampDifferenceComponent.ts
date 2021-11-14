import {Pipe, PipeTransform} from "@angular/core";

@Pipe({ name: 'timestampDifference' })

export class timestampDifferenceComponent implements PipeTransform{

  transform(value: any): any {
    let difference = value.getTime() - new Date().getTime();
    let daysDifference = Math.floor(difference/1000/60/60/24);

    return daysDifference;
  }

}

