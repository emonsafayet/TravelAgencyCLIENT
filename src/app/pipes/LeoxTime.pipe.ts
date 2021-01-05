import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name:'LeoxTime'})
export class LeoxTimePipe implements PipeTransform{
    transform(value:string):string{
        if(value==undefined || value=='') return "";        
        value = value.substr(0,2) + ":" + value.substr(2,2) + " " + value.substr(4);
        return value;        
    }
}