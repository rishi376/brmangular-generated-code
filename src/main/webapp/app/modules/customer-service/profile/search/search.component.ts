import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { NavigationService } from "app/core/navigation/navigation.service";
import { IProfile } from "app/modules/profile/model/profile.model";
import { ProfileSearchService } from "./search.service";

@Component({
    selector: 'customer-service-search',
    templateUrl: './search.component.html',
})
export class ProfileSearchComponent implements AfterViewInit{
    displayedColumns: string[] = ['profileId', 'profileType', 'profileStatus', 'firstName', 'middleName', 'lastName', 'passportId'];
    gender = {
        name: 'gender',
        values : ['male', 'female', 'other'],
    };
    searchForm = new FormGroup({
        customer: new FormGroup({
            firstName: new FormControl(''),
            middleName: new FormControl(''),
            lastName: new FormControl(''),
            dob: new FormControl(null),
            gender: new FormControl(''),
        }),
        passport: new FormGroup({
            identity: new FormControl(''),
            expiry: new FormControl(''),
            issuingCountry: new FormControl(''),
            documentNumber: new FormControl(''),
            passportType: new FormControl('')
        })
    });

    searchResult = new MatTableDataSource<IProfile>();
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private profileSearchService: ProfileSearchService, private navigationService: NavigationService) {}

    search() {
        this.profileSearchService.searchProfile().subscribe(v => {
            // console.log(v);
            this.searchResult.data = v;
        });
        // console.log(this.searchForm);
        this.profileSearchService.updateNavItem({
            id: '11',
            title: '1',
            type: 'basic',
            link: '/profile',
            hidden: item => false,
            active: true,
            disabled: false
        });
    }

    reset() {
        this.searchForm.reset();
    }

    ngAfterViewInit() {
        this.searchResult.paginator = this.paginator;
    }
}