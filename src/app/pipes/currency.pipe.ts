import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name:'LeoxCurrency'})
export class Leox_CurrencyPipe implements PipeTransform{
    transform(value:number):string{
        if(value==NaN || value==undefined) return "";
        // if(value<1000) return value.toString();
        // else {
        //     if(value<1000000) return Math.round(value/1000).toString() + " k";
        //     else return Math.round(value/100000).toString() + " m";
        // }

        return Math.round(value).toLocaleString('en-IN');
        
    }
}