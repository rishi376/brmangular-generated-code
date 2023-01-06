import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FuseNavigationItem } from "@fuse/components/navigation";
import { ApplicationConfigService } from "app/core/config/application-config.service";
import { IProfile } from "app/modules/profile/model/profile.model";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class ProfileSearchService {
    navigationUpdate: BehaviorSubject<FuseNavigationItem>  = new BehaviorSubject<FuseNavigationItem>(null);

    protected resourceUrl = this.applicationConfigService.getEndpointFor('api/profiles/search');

    constructor(
        protected http: HttpClient,
        protected applicationConfigService: ApplicationConfigService,
      ) {}

    searchProfile(): Observable<IProfile[]> {
        return this.http
            .get<IProfile[]>(`${this.resourceUrl}`);
    }

    updateNavItem(navItem: FuseNavigationItem) {
        if(this.navigationUpdate.value && this.navigationUpdate.value.id === navItem.id){
            return;
        }
        this.navigationUpdate.next(navItem);
    }
}