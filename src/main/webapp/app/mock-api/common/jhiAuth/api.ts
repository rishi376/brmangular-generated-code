import { Injectable } from '@angular/core';
import Base64 from 'crypto-js/enc-base64';
import HmacSHA256 from 'crypto-js/hmac-sha256';
import Utf8 from 'crypto-js/enc-utf8';
import { cloneDeep } from 'lodash-es';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import { MockApiService } from 'app/mock-api/mock-api.service';
import { MockApiServiceBase } from 'app/mock-api/mock-api.base';

@Injectable({
  providedIn: 'root'
})
export class JhiAuthMockApi extends MockApiServiceBase {
  private readonly _secret: any;

  /**
   * Constructor
   */
  constructor(private _fuseMockApiService: FuseMockApiService, private mockApiService: MockApiService) {
    super('JhiAuthMockApi');
    // Set the mock-api
    this._secret = 'YOUR_VERY_CONFIDENTIAL_SECRET_FOR_SIGNING_JWT_TOKENS!!!';

    this.checkAndregisterHandlers(() => {
      // -----------------------------------------------------------------------------------------------------
      // @ Sign in - POST
      // -----------------------------------------------------------------------------------------------------
      this._fuseMockApiService.onPost('api/authenticate', 1500).reply(({ request }) => {
        // Sign in successful
        // TODO - the username and password needs to be parameterized using the mockApiConfig.mockAccountUser
        // tried doing it but was unable to get this value inside the anonymous function below...
        const localUser = this.mockApiService.getUserById(request.body.username);
        if (request.body.username === localUser.login && request.body.password === localUser.login) {
          this.mockApiService.registerloggedinUser(localUser);
          return [
            200,
            {
              // eslint-disable-next-line @typescript-eslint/naming-convention
              id_token: this._generateJWTToken()
            }
          ];
        }
        // Invalid credentials
        return [404, false];
      });
    });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Return base64 encoded version of the given string
   *
   * @param source
   * @private
   */
  private _base64url(source: any): string {
    // Encode in classical base64
    let encodedSource = Base64.stringify(source);

    // Remove padding equal characters
    encodedSource = encodedSource.replace(/=+$/, '');

    // Replace characters according to base64url specifications
    encodedSource = encodedSource.replace(/\+/g, '-');
    encodedSource = encodedSource.replace(/\//g, '_');

    // Return the base64 encoded string
    return encodedSource;
  }

  /**
   * Generates a JWT token using CryptoJS library.
   *
   * This generator is for mocking purposes only and it is NOT
   * safe to use it in production frontend applications!
   *
   * @private
   */
  private _generateJWTToken(): string {
    // Define token header
    const header = {
      alg: 'HS256',
      typ: 'JWT'
    };

    // Calculate the issued at and expiration dates
    const date = new Date();
    const iat = Math.floor(date.getTime() / 1000);
    const exp = Math.floor(date.setDate(date.getDate() + 7) / 1000);

    // Define token payload
    const payload = {
      iat: iat,
      iss: 'Fuse',
      exp: exp
    };

    // Stringify and encode the header
    const stringifiedHeader = Utf8.parse(JSON.stringify(header));
    const encodedHeader = this._base64url(stringifiedHeader);

    // Stringify and encode the payload
    const stringifiedPayload = Utf8.parse(JSON.stringify(payload));
    const encodedPayload = this._base64url(stringifiedPayload);

    // Sign the encoded header and mock-api
    let signature: any = encodedHeader + '.' + encodedPayload;
    signature = HmacSHA256(signature, this._secret);
    signature = this._base64url(signature);

    // Build and return the token
    return encodedHeader + '.' + encodedPayload + '.' + signature;
  }
}
