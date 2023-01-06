import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { RouterModule } from "@angular/router";
import { SharedModule } from "app/shared/shared.module";
import { CustomerSearchComponent } from "./per-entity-search/customer/customer-search.component";
import { PassportSearchComponent } from "./per-entity-search/passport/passport-serach.component";
import { PaymentInfoSearchComponent } from "./per-entity-search/payment-info/payment-info-search.component";
import { ProfileSearchComponent } from "./search.component";
import { profileSearchRoutes } from "./search.routing";

@NgModule({
    declarations: [
        ProfileSearchComponent,
        CustomerSearchComponent,
        PassportSearchComponent,
        PaymentInfoSearchComponent
    ],
    imports: [
        RouterModule.forChild(profileSearchRoutes),
        CommonModule,
        SharedModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatTableModule,
        MatSelectModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatPaginatorModule
    ]
})
export class ProfileSearchModule {}