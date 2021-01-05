import { Pipe, PipeTransform } from '@angular/core';
import { Library } from '../library/library';

@Pipe({name:'InCrore'})
export class showInCrore implements PipeTransform{
    transform(value:number):string{      
        if(Library.isNullOrZero(value)) return "";  
        return (Math.round((value/10000000.0) * 100) / 100).toFixed(2) + " C";        
    }
}