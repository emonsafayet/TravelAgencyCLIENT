import { Library } from './library';
//import { AlertMessage } from './AlertMessage';

import { from, of, zip } from 'rxjs';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';

declare var $: any;
declare var moment: any;

export class Common {
    public static SQLDateFormat = 'YYYY-MM-DD';

    public static ExcelReportTitle: string = "";
    public static ExcelData: any[] = [];


    public static generateNextMonths(num: number) {

        var months: {
            MonthNo: number,
            MonthName: string,
        }[] = [];

        for (var x = 1; x <= num; x++) {
            months.push({
                MonthNo: x,
                MonthName: moment().add(x - 1, 'months').format('MMM YY')
            });
        }
        return months;
    }

    public static previousMonthFirstDay(fromDate: string) {
        var previousMonthFirstDate = moment(fromDate).subtract(1, 'months').endOf('month').format('YYYY-MM-DD');
        return previousMonthFirstDate;
    }
    public static generate12Months() {
        var months: {
            MonthNo: number,
            MonthName: string,
        }[] = [];

        for (var x = 1; x <= 12; x++) {
            months.push({
                MonthNo: x,
                MonthName: moment().startOf('year').add(x - 1, 'months').format('MMM YY')
            });
        }
        return months;
        //return moment.monthsShort();
    }

    public static generateLast_N_Months(N: number) {
        var months: {
            MonthNo: number,
            MonthName: string,
            IsSelected: boolean
        }[] = [];

        for (var x = 0; x <= N; x++) {
            months.push({
                MonthNo: x,
                MonthName: moment().subtract(x, 'months').format('MMM YYYY'),
                IsSelected: false
            });
        }
        return months;
        //return moment.monthsShort();
    }

    public static getMonthRange(DateFrom: string, DateTo: string) {

        var totalMonth = moment(DateTo).diff(moment(DateFrom), 'months', true) + 1;

        var months: {
            MonthNo: number,
            MonthStartDate: string,
            MonthEndDate: string,
            MonthName: string,
            IsSelected: boolean,
        }[] = [];

        for (var x = 1; x <= totalMonth; x++) {
            var date = moment(DateFrom).add(x - 1, 'months');
            months.push({
                MonthNo: x,
                MonthStartDate: date.format('YYYY-MM-DD'),
                MonthEndDate: moment(date).endOf('month').format('YYYY-MM-DD'),
                MonthName: date.format('MMM YYYY'),
                IsSelected: false
            });
        }
        return months;
    }




    public static removeDuplicates(myArr, prop) {
        return myArr.filter((obj, pos, arr) => {
            return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
        });
    }



    public static removeNull(myArr, prop) {
        for (var x = 0; x < myArr.length; x++) {
            if (myArr[x].prop == null) myArr.splice(x, 1);
        }
        return myArr;
    }



    public static generateParameterName(parameterName: string, num: number) {
        var parameterName = parameterName + num;
        return parameterName;
    }


    public static calculateTotal(Data: any[], parameterName: string) {
        var total = 0;
        if (Library.getLength(Data) == 0) return 0;
        for (var x = 0; x < Data.length; x++) {
            total += Library.valueDouble(Data[x][parameterName]);
        }
        return total;
    }



    public static getDatepickerValue(datepicker: string) {
        return Library.getDatePart($(datepicker).val(), 0);
    }


    public static setGroupRowReturnTotal(Data: any[], PropertyName: string, TotalPropertyName: string): number {
        Data = Library.sortArray(Data, PropertyName);
        var TotalValue = 0;
        var ColumnValue = "";
        for (var x = 0; x < Data.length; x++) {
            TotalValue += Library.valueDouble(Data[x][TotalPropertyName]);
            Data[x][PropertyName] != ColumnValue ? ColumnValue = Data[x][PropertyName] : Data[x][PropertyName] = "";
        }
        return TotalValue;
    }


    public static setGroupRow(Data: any[], PropertyName: string) {
        Data = Library.sortArrayAsc(Data, PropertyName);
        var ColumnValue = "";
        for (var x = 0; x < Data.length; x++) Data[x][PropertyName] != ColumnValue ? ColumnValue = Data[x][PropertyName] : Data[x][PropertyName] = "";
    }

    public static groupBy(xs, f) {
        return xs.reduce((r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), {});
    }

    public static GroupByProperty(Data: any[], Propertyname: string) {
        var groupedData = [];
        if (Library.getLength(Data) == 0) return groupedData;
        Data = Library.sortArrayAsc(Data, Propertyname);
        from(Data).pipe(
            groupBy(item => item[Propertyname]),
            mergeMap(group => group.pipe(toArray()))
        ).subscribe(val => groupedData.push(val));
        return groupedData;
    }

    public static getActualFreeStock(CurrentFreeStock: number, QuarantineQuantity: number, BookingQuantity: number) {
        if (CurrentFreeStock == null) CurrentFreeStock = 0;
        if (QuarantineQuantity == null) QuarantineQuantity = 0;
        if (BookingQuantity == null) BookingQuantity = 0;
        return (CurrentFreeStock + QuarantineQuantity) - BookingQuantity;
    }

    public static getAvailableQuantity(ActualFreeStock: number, BatchRequiredQuantity: number) {
        if (ActualFreeStock == null) ActualFreeStock = 0;
        if (BatchRequiredQuantity == null) BatchRequiredQuantity = 0;
        return ActualFreeStock - BatchRequiredQuantity;
    }

    public static getNewRequisitionQuantity(ActualFreeStock: number, BatchRequiredQuantity: number, RequisitionQuantity: number, POQuantity: number, PORemainingQuantity: number) {
        console.log(PORemainingQuantity);
        if (ActualFreeStock == null) ActualFreeStock = 0;
        if (RequisitionQuantity == null) RequisitionQuantity = 0;
        if (BatchRequiredQuantity == null) BatchRequiredQuantity = 0;
        var AvailableQuantity = this.getAvailableQuantity(ActualFreeStock, BatchRequiredQuantity);

        if (AvailableQuantity > 0) return 0;

        AvailableQuantity = Math.abs(AvailableQuantity);
        if (RequisitionQuantity > AvailableQuantity) return 0;

        var NewRequisitionQuantity;
        NewRequisitionQuantity = Library.valueDouble(AvailableQuantity) - Library.valueDouble(RequisitionQuantity) - Library.valueDouble(POQuantity) - Library.valueDouble(PORemainingQuantity);
        return NewRequisitionQuantity;
    }

    public static setHideShow(Data: any[], PropertyName: string, FlagColumnName: string, FlagValue: boolean) {
        for (var x = 0; x < Data.length; x++) Library.valueDouble(Data[x][PropertyName]) > 0 ? Data[x][FlagColumnName] = true : Data[x][FlagColumnName] = FlagValue;
    }

    public static clearSelection(Data: any[], ColumnName: string) {
        for (var x = 0; x < Data.length; x++) Data[x][ColumnName] = false;
    }

    public static setArrayValue(Data: any[], ColumnName: string, Value: any) {
        for (var x = 0; x < Data.length; x++) Data[x][ColumnName] = Value;
    }

    public static AgeCalculation(Data: any[], SavePropertyName: string, DateProperty: string) {

        Data.forEach(function (item) {
            item[SavePropertyName] = Common.daysDifference(moment(item[DateProperty]));
        });
    }

    public static daysDifference(fromDate: any) {
        return Library.valueInt(moment().diff(fromDate, 'days'));
    }

    public static FindCommonElement(Data1: any[], Data2: any[], Property: string) {
        var NewProperty = 'IsCommon' + Property;
        for (var x = 0; x < Data1.length; x++) {
            Data1[x][NewProperty] = false;
            for (var y = 0; y < Data2.length; y++) {
                if (Data1[x][Property] == Data2[y][Property]) Data1[x][NewProperty] = true;
            }
        }
    }

    public static filterData(Data: any[], ColumnName: string, FilterValue: any): any[] {
        if (FilterValue) return Data.filter(r => r[ColumnName] == FilterValue);
        else return Data;
    }


    public static jsonData(Data: any[]): any[] {
        return JSON.parse(JSON.stringify(Data));
    }

    public static ActualFreeStock(item: any): any {
        var actualFreeStock = Library.valueDouble(item.FreeStock) + Library.valueDouble(item.QuarantineQuantity) - Library.valueDouble(item.BookingQuantity);
        return actualFreeStock;
    }

    public static SearchFilter(Data: any[], searchText: string) {
        if (!Data) {
            return [];
        }

        if (!searchText) {
            return Data;
        }

        const searchTerm = searchText.trim().toLowerCase();
        const keys = Object.keys(Data[0]).map(k => k.toLowerCase());

        let filteredList = Data.filter((item) => {
            var values = Object.values(item);
            var flag = false
            values.forEach((val) => {
                if (val) {
                    if (val.toString().toLowerCase().indexOf(searchTerm) > -1) {
                        flag = true;
                        return;
                    }
                }
            });
            if (flag) return item;
        });

        return filteredList;
    }


    public static setTagHistory(GroupName: string, DisplayName: string, KeyValue: string) {
        try {


            if (Library.isNullOrEmpty(DisplayName) || Library.isNullOrEmpty(KeyValue)) return;
            var newItem = { GroupName: GroupName, DisplayName: DisplayName, KeyValue: KeyValue };
            var items;
            var allItem = localStorage.getItem('TagHistory');
            if (!Library.isNullOrEmpty(allItem)) items = JSON.parse(allItem);
            else items = [];

            if (items.indexOf(newItem) == -1) items.push(newItem);

            localStorage.setItem('TagHistory', JSON.stringify(items));
        }
        catch (e) {
            console.log(e.message);
        }
    }

    public static CalculatePriceQuantityTotalAmount(Data: any[], PriceColumnName: string, QuantityColumnName: string) {

        Data['TotalAmount'] = 0;
        for (let item of Data) {
            item['TotalAmount'] = Library.valueDouble(item[PriceColumnName]) * Library.valueDouble(item[QuantityColumnName]);
            Data['TotalAmount'] += item['TotalAmount'];
        }
    }

    public static DaysFromDate(FromDate: string, CountAge: boolean) {
        if (CountAge == true) return Library.valueInt(moment().diff(FromDate, 'days'));
        else return Library.valueInt(moment(FromDate).diff(moment().today, 'days'));
    }



    public static PriceInWords(Value: number): string {
        var vl = Value.toString();
        var n: any[];

        var a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
        var b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

        if ((vl).length > 9) return 'overflow';
        n = ('000000000' + Value).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
        if (!n) return; var str = '';

        str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
        str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
        str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
        str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
        str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
        return str;
    }

    public static DifferenceBetweenDates(fromDate: any, todate: any) {
        return Library.valueInt(moment(todate).diff(fromDate, 'days'));
    }

    public static generateNMonths(N: number) {
        var months: {
            MonthNo: number,
            MonthName: string,
        }[] = [];

        for (var x = 1; x <= N; x++) {
            months.push({
                MonthNo: x,
                MonthName: moment().startOf('year').add(x - 1, 'months').format('MMM YY')
            });
        }
        return months;
    }




    public static getDateRange(range: string) {
        if (range == 'lastYear') {
            return (moment().subtract(1, 'years').startOf('year').format(this.SQLDateFormat));
        }
        if (range == 'thisYear') {
            return (moment().startOf('year').format(this.SQLDateFormat));
        }
        else if (range == 'year') {
            return (moment().subtract(1, 'year').date(1).format(this.SQLDateFormat));
        }
        else if (range == '2year') {
            return (moment().subtract(2, 'years').date(1).format(this.SQLDateFormat));
        }
        else if (range == 'sixMonths') {
            return (moment().subtract(5, 'months').date(1).format(this.SQLDateFormat));
        }
        else if (range == 'threeMonths') {
            return (moment().subtract(2, 'months').date(1).format(this.SQLDateFormat));
        }
        else if (range == 'oneweek') {
            return (moment().subtract(7, 'days').format(this.SQLDateFormat));
        }
        else if (range == 'lastMonth') {
            return (moment().subtract(1, 'month').startOf('month').format(this.SQLDateFormat));
        }
        else if (range == 'currentMonth') {
            return (moment().startOf('month').format(this.SQLDateFormat));
        }
        else if (range == 'todate') {
            return (moment().format(this.SQLDateFormat));
        }
    }


    public static getModuleNameFromCode(RefCode: string): string {

        try {
            if (Library.isNullOrEmpty(RefCode)) return "";


            var searchTextLength = RefCode.length;
            var preFix = RefCode.substr(0, 2).toUpperCase();

            if (preFix == "CS" && RefCode.substr(0, 3).toUpperCase() != "CSN") return "CS";
            else if (RefCode.substr(0, 3).toUpperCase() == "PM-") return "GRNP";
            else if (RefCode.substr(0, 3).toUpperCase() == "WF-") return "GRNP";
            else if (RefCode.substr(0, 3).toUpperCase() == "RM-") return "GRNP";

            else if (preFix == "RD") return "RD";
            else if (preFix == "BD") return "BD";
            else if (preFix == "QD") return "QD";
            else if (preFix == "BM") return "BR";
            else if (preFix == "LP") return "QR";
            else if (preFix == "S-") return "SP";
            else if (preFix == "S-") return "SP";
            else if (preFix == "L-") return "LC";
            else if (preFix == "P-") return "PP";
            else if (preFix == "PI") return "PI";
            else if (preFix == "JV") return "JV";
            else if (preFix == "BP") return "BP";

            else if (RefCode == "RetQty") return "RetQty";
            else if (RefCode == 'II') return 'II';

            else {
                var preFix = RefCode.substr(0, 3).toUpperCase();
                var strRight = RefCode;

                if (RefCode.length > 3) {
                    strRight = RefCode.substr(4).replace('-', '');
                    console.log(strRight, Library.valueDouble(strRight));
                    if (Library.valueDouble(strRight) <= 0) return "";
                }

                // MATERIAL PROFILE
                if (searchTextLength > 3) {
                    if (preFix == "PP-" || preFix == "PS-" || preFix == "RMA" || preFix == "RME") return "MP";
                    else if (preFix == "PO-" || preFix == "SPO" || preFix == "QPO" || preFix == "PMD") return "PO";
                    else if (preFix.includes('PR')) {
                        if (preFix == 'PR-') return "PR";
                        else return "NPR";
                    }
                    else if (preFix.includes('CSN') || preFix == 'CSN') return 'CSN';
                    else if (preFix.includes('PON')) return 'NPPO';
                    else if (preFix.includes('GRN')) return 'NPGRN';
                    else if (preFix.includes('CR-')) return 'NPCR';
                    else if (preFix.includes('QNP')) return 'QNP';
                }
                // else if (preFix.includes('CA')) return 'IP';                
                else if (preFix.includes('CSN') || preFix == 'CSN') return 'CSN';
                else if (preFix.includes('PON')) return 'NPPO';
                else if (preFix.includes('GRN')) return 'NPGRN';
                else if (preFix.includes('CR-')) return 'NPCR';
                // if item - return "IP"
            }
            return "";

        }
        catch (ex) { return "" + ex.message; }
    }

    public static CheckMin(data: any[], fieldname: string) {
        data = data.filter(item => item[fieldname] != 0);
        return Math.min(...data.map(item => item[fieldname]));
    }

    public static CheckMax(data: any[], fieldname: string) {
        data = data.filter(item => item[fieldname] != 0);
        return Math.max(...data.map(item => item[fieldname]));
    }


    public static FindMaximum(data: any[], fieldName: string) {
        if (Library.getLength(data) == 0) return;
        data.forEach(item => { item[fieldName] = Library.isNullOrEmpty(item[fieldName]) ? '0' : item[fieldName] });
        var maximum = data[0][fieldName];
        data.forEach(item => { maximum = item[fieldName] > maximum ? item[fieldName] : maximum });
        return maximum;
    }

    public static FindMinimum(data: any[], fieldName: string) {
        if (Library.getLength(data) == 0) return;
        data.forEach(item => { item[fieldName] = Library.isNullOrEmpty(item[fieldName]) ? '0' : item[fieldName] });
        var minimum = data[0][fieldName];
        data.forEach(item => { minimum = item[fieldName] < minimum ? item[fieldName] : minimum });
        return minimum;
    }


    public static getMaterialSpecs(material: any) {
        var materialSpec = "";
        if (Library.isNullOrEmpty(material.MaterialCode)) return '';
        materialSpec += material.MaterialCode + " ";
        if (!Library.isNullOrEmpty(material.VersionNo) && this.isValidVersionOrGrade(material.VersionNo)) materialSpec += "| Ver. " + material.VersionNo + " ";
        if (!Library.isNullOrEmpty(material.MaterialGrade) && this.isValidVersionOrGrade(material.MaterialGrade)) materialSpec += "| Gr. " + material.MaterialGrade + " ";
        if (!Library.isNullOrEmpty(material.ModeOfShipment)) materialSpec += "| MoS. " + material.ModeOfShipment + " ";
        if (!Library.isNullOrEmpty(material.Source)) materialSpec += "| Src. " + material.Source + " ";
        if (!Library.isNullOrEmpty(material.DeliveryMode)) materialSpec += "| Del Mode. " + material.DeliveryMode + " ";
        if (!Library.isNullOrZero(material.MOQ)) materialSpec += "| MOQ. " + material.MOQ + " ";
        return materialSpec;
    }

    public static getItemSpecs(item: any) {
        var specs = "";
        if (Library.isNullOrEmpty(item.ItemCode)) return '';
        specs += item.ItemCode + " ";
        if (!Library.isNullOrZero(item.MOQ)) specs += "| MOQ. " + item.MOQ + " ";
        if (!Library.isNullOrZero(item.UOM)) specs += "| UOM. " + item.UOM + " ";
        return specs;
    }

    public static isValidVersionOrGrade(value: string) {
        if (value == 'N/A' || value == 'N/a' || value == 'n/a') return false;
        return true;
    }





    public static setSelectionTag(ComponentName: string, TabCode: string, Value: any) {
        try {
            if (Library.isNullOrEmpty(Value)) return;
            var newItem = { TabCode: TabCode, Value: Value };

            var items = [];
            var allItem = localStorage.getItem(ComponentName);
            if (!Library.isNullOrEmpty(allItem)) items = JSON.parse(allItem);
            else items = [];

            var isFound = false;
            if (Library.getLength(items) > 0) {
                items.forEach(element => {
                    if (element.TabCode == TabCode) { element.Value = Value; isFound = true; }
                })
            }

            if (!isFound || Library.getLength(items) == 0) items.push(newItem);

            localStorage.setItem(ComponentName, JSON.stringify(items));
        }
        catch (e) {
            console.log(e.message);
        }
    }


    public static getSelectionTagValue(ComponentName: string, TabCode: string) {
        try {
            var value = "";
            var allItem = localStorage.getItem(ComponentName);
            if (Library.isNullOrEmpty(allItem)) return value;

            var items = [];
            items = JSON.parse(allItem);

            if (Library.getLength(items) == 0) return value;

            items.forEach(element => { if (element.TabCode == TabCode) value = element.Value })

            return value;
        }
        catch (e) {
            console.log(e.message);
        }
    }


    public static getItemUsageType(ItemUsageType: string): string {
        if (Library.isNullOrEmpty(ItemUsageType)) return '';
        if (ItemUsageType.toLowerCase().includes('persistant')) return 'P';
        if (ItemUsageType.toLowerCase().includes('consumption')) return 'C';
    }





    public static generateCodePrefix(name: string): string {
        var prefix = "";

        var groupName = name.split(" ");

        if (Library.getLength(groupName) == 1 && !Library.isNullOrEmpty(groupName[0])) {
            if (!Library.isNullOrEmpty(groupName[0][0])) prefix = groupName[0][0].toUpperCase();
            if (!Library.isNullOrEmpty(groupName[0][1])) prefix += groupName[0][1].toUpperCase();
        }
        else {
            var str = name;
            var matches = str.match(/\b(\w)/g);
            var acronym = matches.join('');

            if (!Library.isNullOrEmpty(acronym[0])) prefix = acronym[0].toUpperCase();
            if (!Library.isNullOrEmpty(acronym[1])) prefix += acronym[1].toUpperCase();
        }

        return prefix;
    }

    public static makeTitle(Source: string): string {
        if (Library.isNullOrEmpty(Source)) return Source;
        var newSource = Source[0].toUpperCase();
        for (var x = 1; x < Source.length; x++) {
            if (Source[x] == Source[x].toUpperCase() && Source[x - 1] != ' ') {
                newSource += " " + Source[x];
            }
            else newSource += Source[x];
        }
        return newSource.split('  ').join(' ');
    }



}