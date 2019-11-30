import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'dateFormat'
})
export class DateFormatPipe extends DatePipe implements PipeTransform {
    static readonly DATE_FMT = 'MMM dd';
    static readonly DATE_FMT_WITH_YEAR = 'MMM dd, yyyy';

    transform(value: any, args?: any): any {
        if (value.getFullYear() === (new Date()).getFullYear()) {
            return super.transform(value, DateFormatPipe.DATE_FMT);
        } else {
            return super.transform(value, DateFormatPipe.DATE_FMT_WITH_YEAR);
        }
    }
}