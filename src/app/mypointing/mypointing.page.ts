import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import {IonContent, Platform} from '@ionic/angular';
import { off } from 'process';
import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file/ngx';
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
  public plt :Platform,
  public storage:Storage,
  public file:File
) { }

  ngOnInit() {

  this.storage.get("painting").then(data=>{
    console.log(data);
    this.stored_images = data;
  
  }).catch(e=>{
    console.log(e);
  });

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
    this.canvasElements.height=800;
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
       let removed = this.stored_images.splice(index,1)
       this.file.removeFile(this.file.dataDirectory,removed[0].imge).then(removed=>{
         console.log("remved");
       }).catch(e=>{
         console.log(e);
       });
       this.storage.set("painting",this.stored_images);
  }
  getImagePath(name){
    let path = this.file.dataDirectory + name;
    //path = normalizeUrl(path);
    return path
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


  async  saveImage(){
    let dataUrl= await this.canvas.nativeElement.toDataURL();
   // let data = this.canvasElements.getDataUrl();
    console.log(dataUrl);
    let ctx = this.canvas.nativeElement.getContext('2d');
     ctx.clearRect(0,0,ctx.canvas.width,800);
     let name = new Date().getTime() + '.png';
     let path = this.file.dataDirectory;
     let data = dataUrl.split(',')[1];
  let blob = await this.base64ToBlob(data,'image/png');
  await this.file.writeFile(path,name,blob);
     this.storeImage(name);
   //.then(res=>{
  //   this.storeImage(name);
  // }).catch(e=>{
  //   console.log(e);
  // });

  }
  storeImage(name){
    
               let storeObj = {"img":name};
               console.log(storeObj);
               this.stored_images.push({"img":name});
               this.storage.set("painting",this.stored_images).then(suc=>{
                 console.log("image stored success");
                 setTimeout(()=>{
                  this.content.scrollToBottom();
                  },500)
               }).catch(e=>{
                 console.log(e);
               });


  }



  base64ToBlob(base_64_data,content_type){
content_type = content_type||'';
let slice_size = 512;
let byte_charactor=atob(base_64_data);
let byte_arrays=[];
     for(let offset=0;offset<=byte_charactor.length; offset+=slice_size){
       let slice = byte_charactor.slice(offset,offset+slice_size);
       let byte_number = new Array(slice.length);
           for(let i = 0; i<=slice.length;i++){
             byte_number[i]=slice.charCodeAt[i];
           }
           let byte_array:any = new Uint8Array(byte_number);
           byte_arrays.push(byte_array);
     }
 let blob = new Blob(byte_arrays,{type:content_type});
      return blob;
  }








}
