import { Component} from '@angular/core';
import { PhotosService} from '../services/photos.service';
import {ActionSheetController } from '@ionic/angular';
import{ShareModule} from '../share/share.module';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page  {
    public photos:any;

  constructor(
    public photoService:PhotosService,
    public actionSheetCtrl:ActionSheetController
  ) {
    this.photoService.loadSaved();
    this.photos = this.photoService.photos;
    console.log(this.photos);
  }
ionViewWillEnter(){
this.photos = this.photoService.getPhoto();
}
  addPhotoToGallery(){
   this.photoService.addNewToGallery();
  }
  public async showActionSheet(photo, position) {
        let actionSheet = await this.actionSheetCtrl.create({
          header: 'Photos',
          buttons: [{
            text: 'Delete',
            role: 'destructive',
            icon: 'trash',
            handler: () => {
              this.photoService.deletePicture(photo, position);
            }
          }, {
            text: 'Cancel',
            icon: 'close',
            role: 'cancel',
            handler: () => {
              // Nothing to do, action sheet is automatically closed
              }
          }]
        });
        await actionSheet.present();

  }

}
