import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HideDirectiveDirective } from '../directives/hide-directive.directive';
import { FadeDirectiveDirective } from '../directives/fade-directive.directive';



@NgModule({
  declarations: [HideDirectiveDirective,FadeDirectiveDirective],
  imports: [
    CommonModule
  ],
  exports:[HideDirectiveDirective,FadeDirectiveDirective]
})
export class ShareModule { }
