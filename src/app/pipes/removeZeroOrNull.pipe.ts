import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name:'RemoveZero'})
export class RemoveZeroOrNullPipe implements PipeTransform{
    transform(value:number):string{
        if(value==NaN || value==undefined || value==0) return null;
        else return value.toString();             
    }
}