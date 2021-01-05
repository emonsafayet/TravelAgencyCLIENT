import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name:'ValueInShort'})
export class ValueInShort implements PipeTransform{
    transform(Value:number):string{
        if(Value==undefined) return "";                
        if(Value==0) return "";

        var newVal = "";

        //return (Value/100000.0) + " lacs";  
        if(Value>=1000 && Value<100000) 
        {
            newVal = (Value/1000.0).toString(); 
            return newVal.substr(0, newVal.indexOf(".") + 3 )+ " T";
        }
        else if(Value>=100000 && Value<10000000)         
        {
            newVal = (Value/100000.0).toString(); 
            return newVal.substr(0, newVal.indexOf(".") + 3 )+ " L";
        } 
        else if(Value>=10000000)        
        {
            newVal = (Value/10000000.0).toString(); 
            return newVal.substr(0, newVal.indexOf(".") + 3 )+ " C";
        } 
       
        else return Value.toString();
    }
}