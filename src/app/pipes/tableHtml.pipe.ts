import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name:'TableHtml'})
export class TableHtmlPipe implements PipeTransform{
    transform(value:string):string{
        var html = "<table class='table table-borderless'>";
        html += "<tbody>";

        var vl = value.split(',');
        for(var x=0;x<vl.length;x++){
            var tds = vl[x].split(':');
            html+= "<tr><td>" + tds[0] + "</td><td>" + tds[1] + "</td></tr>";
        }

        html +="</tbody></table>";
        return html;
    }
}