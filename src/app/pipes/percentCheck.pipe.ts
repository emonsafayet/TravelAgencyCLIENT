import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name:'PercentCheck'})
export class PercentCheckPipe implements PipeTransform{
    transform(value:number):string{
        if(value==NaN || value==undefined) return "";
        if(value>100)  return "+100";
        else return value.toString();
    }
}