import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name:'ShortName'})
export class ShortNamePipe implements PipeTransform{
    transform(FullName:string):string{
        if(FullName==undefined || FullName=='') return "";                
        FullName =  FullName.replace('Mr.','').replace('Md','').replace('Md.','').replace('Mrs.','').replace('.','').replace('M ','');
        return FullName;
    }
}