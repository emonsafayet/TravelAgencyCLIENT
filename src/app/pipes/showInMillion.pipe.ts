import { Pipe, PipeTransform } from '@angular/core';
import { Library } from '../library/library';

@Pipe({name:'InMillion'})
export class showInMillion implements PipeTransform{
    transform(value:number):string{      
        if(Library.isNullOrZero(value)) return "";  
        return (Math.round((value/100000.0) * 100) / 100).toFixed(2) ;        
    }
}