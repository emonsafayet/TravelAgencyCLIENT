import { Injectable } from '@angular/core';
import { MasterService } from './Master.service';

@Injectable()
export class RptService{ 

	constructor(private masterService: MasterService) { }
}