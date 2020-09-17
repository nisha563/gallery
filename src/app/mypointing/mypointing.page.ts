import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import {IonContent, Platform} from '@ionic/angular';

@Component({
  selector: 'app-mypointing',
  templateUrl: './mypointing.page.html',
  styleUrls: ['./mypointing.page.scss'],
})
export class MypointingPage implements OnInit {
public selected_color:string="#00FFBF";
public colors:Array<any>=['#FF0000','#FF4000','#FF8000','#FFBF00','#FFFF00',
'#BFFF00','#9AFE2E','#40FF00','#00FFBF','#00BFFF','#00BFFF','#0080FF','#0000FF','#FF00FF','#FF00BF','#FF0080','#1C1C1C'];
@ViewChild('fixedContainer',{ static: false })fixedContainer:any;
//@ViewChild('imageConvas',{ static: false })convas:any;
@ViewChild('canvas') canvas :any;
@ViewChild(IonContent)content:IonContent;
public canvasElements:any;
public saveX:number;
public saveY:number;
public stored_images:Array<any>=[];

constructor(
  public plt :Platform
) { }

  ngOnInit() {
  //   this.canvasElements = this.canvas.nativeElement;
  //   this.canvasElements.itemHeight=500;
  //   this.canvasElements = this.canvasElements.getContext('2d');
  //  this.canvasElements.fillStyle = "#3e3e3e";
  //  this.canvasElements.fillRect(0, 0, 500, 500);
  }

   ionViewDidEnter(){
 let itemHeight = this.fixedContainer.nativeElement.offsetHeight;
 console.log(itemHeight);
 let scroll = this.content.getScrollElement();
    scroll.then((scl)=>{
      console.log("scroll");
       itemHeight = Number.parseFloat(scl.style.marginTop.replace("px",""))+ itemHeight;
       scl.style.marginTop=itemHeight + "pex";
    });
      }

ionViewDidLoad(){
  this.canvasElements = this.canvas.nativeElement;
    this.canvasElements.height=300;
    this.canvasElements.width = this.plt.width()+'';
     this.canvasElements = this.canvasElements.getContext('2d');
   this.canvasElements.fillStyle = "#3e3e3e";
   this.canvasElements.fillRect(0, 0, 500, 500);
}

  selectedColor(color){
    this.selected_color = color;
    console.log(this.selected_color);
  }

  removeImageAtIndex(index){

  }
  touchStart($event){
    let convasPosition = this.canvas.nativeElement.getBoundingClientRect();
    this.saveX = $event.touches[0].pageX - convasPosition.x ;
    this.saveY = $event.touches[0].pageY - convasPosition.y;
     console.log("value");
  }

  touchMove($event){
    let convasPosition = this.canvas.nativeElement.getBoundingClientRect();
    let currentX = $event.touches[0].pageX - convasPosition.x ;
    let currentY = $event.touches[0].pageY - convasPosition.y;
    let ctx = this.canvas.nativeElement.getContext('2d');
    ctx.lineJoin="round";
    ctx.strokeStyle= this.selected_color;
    ctx.lineWidth = 5;

    ctx.beginPath();
    ctx.moveTo(this.saveX,this.saveY);
    ctx.lineTo(currentX,currentY);
    ctx.closePath();
    ctx.stroke();
    this.saveY=currentY;
    this.saveX = currentX;
     console.log("value");
  }

}
