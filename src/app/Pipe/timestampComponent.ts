import {Pipe, PipeTransform} from "@angular/core";

@Pipe({ name: 'timestamp' })

export class timestampComponent implements PipeTransform{

  transform(value: any): any {

    value=new Date(value * 1000).toISOString().substr(11, 8);
    return value;
  }

}

