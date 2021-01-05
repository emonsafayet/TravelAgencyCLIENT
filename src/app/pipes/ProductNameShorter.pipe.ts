import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name:'ProductNameShorter'})
export class ProductNameShorter implements PipeTransform{
    transform(value:string):string{
        if(value==undefined || value=='') return "";        
        value = value.replace("Finished Goods","");
        return value;        
    }
}