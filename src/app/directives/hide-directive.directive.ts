import { Directive, Input,OnInit, Renderer2, HostListener } from '@angular/core';
import { DomController } from '@ionic/angular';

@Directive({
  selector: '[appHideDirective]'
})
export class HideDirectiveDirective implements OnInit  {
@Input('appHideDirective')toolbar:any;
private toolbarHeight =44;
  constructor(private renderer:Renderer2 , private domCtrl:DomController) {

   }
ngOnInit(){
  this.toolbar = this.toolbar.el;
  this.domCtrl.read(()=>{
    this.toolbarHeight = this.toolbar.clientHeight;
  });
}
@HostListener('ionScroll', ['$event']) onContentScroll($event: any) {
const scrollTop = $event.detail.scrollTop;
console.log(scrollTop);
let newPosition = -(scrollTop/5);
if(newPosition<-this.toolbarHeight){
newPosition = -this.toolbarHeight;
}
let newOpacity = 1 - (newPosition/-this.toolbarHeight);
this.domCtrl.write(()=>{
  this.renderer.setStyle(this.toolbar,'top','${newPosition}px');
  this.renderer.setStyle(this.toolbar,'opacity',newOpacity);
});
}
}
