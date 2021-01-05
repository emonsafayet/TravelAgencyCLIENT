import { Pipe, PipeTransform } from '@angular/core';
import { Library } from '../library/library';

@Pipe({name:'ShortName2'})
export class ShortNamePipe2 implements PipeTransform{
    transform(FullName:string):string{
        if(FullName==undefined || FullName=='') return "";                
        FullName =  FullName.replace('Mr.','').replace('Md','').replace('Md.','').replace('Mrs.','').replace('Mst.','').replace('Miss','').replace('Ms','').replace('.','');

        var fullName = FullName.split(" ");
        for(let x=0; x<fullName.length; x++){
            if(Library.isNullOrEmpty(fullName[x]) || fullName[x] == '.') fullName.splice(x,1);
        }

        if(Library.getLength(fullName) == 0) return "";
        if(Library.getLength(fullName) == 1) return fullName[0];
        if(Library.getLength(fullName) == 2) return fullName[0] + " " + fullName[1];
        
        FullName = "";
        for(let x=0; x<fullName.length-2; x++){
            if(!Library.isNullOrEmpty(fullName[x])) FullName += fullName[x][0] + " ";
        }
        FullName += fullName[fullName.length - 2] + " " + fullName[fullName.length - 1];

        return FullName;
    }
}