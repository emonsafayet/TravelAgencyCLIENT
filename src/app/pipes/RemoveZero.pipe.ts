import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name:'RemoveZero'})
export class RemoveZeroPipe implements PipeTransform{
    transform(Value:number):string{
        if(Value==undefined) return "";                
        if(Value==0) return "";        
        return Value.toString();
    }
}