import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name:'ChangeStatus'})
export class ChangeStatusPipe implements PipeTransform{
    transform(value:number, value2: number):string{
        if(value==NaN || value==undefined) return "";
        var changeVal = value-value2;

        if(changeVal>0) return "text-success";
        else if(changeVal<0) return "text-danger";
        else return "";        
    }
}