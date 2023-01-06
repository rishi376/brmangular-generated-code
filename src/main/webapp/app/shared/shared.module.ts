import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateDirective } from './language/translate.directive';
import { SharedLibsModule } from './shared-libs.module';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedLibsModule],
  declarations: [TranslateDirective, HasAnyAuthorityDirective],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateDirective, HasAnyAuthorityDirective]
})
export class SharedModule {}
