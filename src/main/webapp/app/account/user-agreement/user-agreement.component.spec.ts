import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserAgreementComponent } from './user-agreement.component';

describe('UserAgreementComponent', () => {
  let component: UserAgreementComponent;
  let fixture: ComponentFixture<UserAgreementComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [UserAgreementComponent]
    })
      .overrideTemplate(UserAgreementComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    const testRequest = httpMock.expectOne({
      method: 'GET',
      url: 'api/application2/useragreement'
    });
  });
});
