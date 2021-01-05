import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name:'FormatPercentage'})

export class Format_Percentage implements PipeTransform{

    transform(value:number):string{
        if(value==NaN || value==undefined || value==null) return "";
        if(value<1000) return Math.round(value).toLocaleString('en-IN');
        else {
            return "999+";
        }        
    }
}