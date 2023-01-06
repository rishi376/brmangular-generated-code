import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ControlContainer, FormGroupDirective } from "@angular/forms";

interface Gender {
    name: string,
    values: string[],
}

@Component({
    selector: 'customer-search',
    templateUrl: './customer-search.component.html',
    viewProviders: [
        {
          provide: ControlContainer,
          useExisting: FormGroupDirective
        }
    ]
})
export class CustomerSearchComponent{
    @Input() gender: Gender;
}