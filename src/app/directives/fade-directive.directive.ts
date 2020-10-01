import { Directive,Input, HostListener } from '@angular/core';
import { DomController } from '@ionic/angular';

@Directive({
  selector: '[appFadeDirective]'
})
export class FadeDirectiveDirective {
  @Input('appFadeDirective')toolbar:any;
  private toolbarHeight =44;
  constructor(private domCtrl:DomController) {

  }
  ngOnInit(){
    this.toolbar = this.toolbar.el;
   
  }
  @HostListener('ionScroll', ['$event']) onContentScroll($event: any) {
  let scrollTop = $event.detail.scrollTop;
  console.log(scrollTop);
  if(scrollTop>=255){
    scrollTop = 255;
  }
  const hexDist = scrollTop.toString(16);

  this.domCtrl.write(()=>{
    let cl = '#A52A2A' + `${hexDist}`;
    this.toolbar.style.setProperty('--background',cl);
  })
  }
}
