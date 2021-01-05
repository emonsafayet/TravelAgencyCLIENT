import { Pipe, PipeTransform } from '@angular/core';
import { Library } from '../library/library';
declare var moment :any;

@Pipe({name:'DaysFromDate'})
export class DaysFromDatePipe implements PipeTransform{
    transform(FromDate:string, CountAge: boolean):number{

        if(CountAge==true) return Library.valueInt( moment().diff(FromDate, 'days'));
        else return  Library.valueInt( moment(FromDate).diff(moment().today, 'days'));    

    }
}