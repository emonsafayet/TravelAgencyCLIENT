import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "sort"
})
export class ArraySortPipe implements PipeTransform {
    //   transform(array: any[], field: string): any[] {
    //     array.sort((a: any, b: any) => {
    //       if (a[field] < b[field]) {
    //         return -1;
    //       } else if (a[field] > b[field]) {
    //         return 1;
    //       } else {
    //         return 0;
    //       }
    //     });
    //     return array;
    //   }

    transform(array: Array<any>, orderField: string, orderType: boolean): Array<string> {
        array.sort((a: any, b: any) => {
            let ae = a[orderField];
            let be = b[orderField];
            if (ae == undefined && be == undefined) return 0;
            if (ae == undefined && be != undefined) return orderType ? 1 : -1;
            if (ae != undefined && be == undefined) return orderType ? -1 : 1;
            if (ae == be) return 0;
            return orderType ? (ae.toString().toLowerCase() > be.toString().toLowerCase() ? -1 : 1) : (be.toString().toLowerCase() > ae.toString().toLowerCase() ? -1 : 1);
        });
        return array;
    }
}