import { Component } from '@angular/core';
import { DocumentViewer,DocumentViewerOptions} from '@ionic-native/document-viewer/ngx';
import {PhotosService} from '../services/photos.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    private document: DocumentViewer,
    public photoService:PhotosService
  ) {}


add(){
  this.photoService.addUser();
}
  open(){
    const options: DocumentViewerOptions = {
      title: 'My PDF'
    }
    this.document.viewDocument('https://firebasestorage.googleapis.com/v0/b/fir-10218.appspot.com/o/ticket.pdf?alt=media&token=4881b315-6033-459d-8a57-dbd66fb331aa', 'application/pdf', options);
    
  }

}
