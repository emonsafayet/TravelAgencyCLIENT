import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'LimitText' })
export class LimitTextPipe implements PipeTransform {

    transform(ExceptionDetails: string, NumberOfCharacters: number): string {
		return (ExceptionDetails.length > NumberOfCharacters) ? ExceptionDetails.substr(0, NumberOfCharacters) + " ... click to see more" : ExceptionDetails;
    }
}