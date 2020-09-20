import { Injectable } from '@angular/core';
import {Plugins,CameraResultType,Capacitor,FilesystemDirectory,CameraPhoto,CameraSource } from '@capacitor/core';
const { Camera, Filesystem, Storage } = Plugins;
import { Photos } from '../interfaces/photos';
import { Platform } from '@ionic/angular';


// import * as firebase from 'firebase/app';
// import 'firebase/storage';
// import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {
  public photos:Array<Photos> = [];
  private PHOTO_STORAGE: string = "photos";
  public is_platform:any=null;
   public cd_storage:any;
  constructor(
    
    public platform:Platform
  ) { 
      this.is_platform = platform;
     // this.cd_storage = firebase.firestore();
  }
addUser(){
  // this.cd_storage.collection("user").add({"name":"apple"}).then((data)=>{
  //   console.log(data);
  // }).catch(e=>{
  //   console.log(e);
  // });
}
  public async addNewToGallery() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri, 
      source: CameraSource.Camera, 
      quality: 100 
    })
  
      // Save the picture and add it to photo collection
  const savedImageFile = await this.savePicture(capturedPhoto);
  this.photos.unshift(savedImageFile);
await this.save();
  }


  save(){
    Storage.set({
      key: this.PHOTO_STORAGE,
      value: this.platform.is('hybrid')
      ? JSON.stringify(this.photos)
      : JSON.stringify(this.photos.map(p => {
        // Don't save the base64 representation of the photo data,
        // since it's already saved on the Filesystem
        const photoCopy = { ...p };
        delete photoCopy.base64;

        return photoCopy;
      }))
    }).then(succ=>{
      console.log("saved success");
    }).catch(e=>{
      console.log(e);
    });
  }

  private async savePicture(cameraPhoto: CameraPhoto) {
    // Convert photo to base64 format, required by Filesystem API to save
    const base64Data = await this.readAsBase64(cameraPhoto);
    // Write the file to the data directory
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile:any = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: FilesystemDirectory.Data
    }).then(succe=>{
      console.log("written success",succe);
    }).catch(e=>{
      console.log(e);
    });
    if (this.platform.is('hybrid')) {
      // Display the new image by rewriting the 'file://' path to HTTP
      // Details: https://ionicframework.com/docs/building/webview#file-protocol
      return {
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
      };
    }else{
    // Use webPath to display the new image instead of base64 since it's
    // already loaded into memory
    return {
      filepath: fileName,
      webviewPath: cameraPhoto.webPath
       };
    }
  }
  private async readAsBase64(cameraPhoto: CameraPhoto) {
    if(this.is_platform.is('hybrid')){
       // Read the file into base64 format
    const file = await Filesystem.readFile({
      path: cameraPhoto.path
    });
    return file.data;
    }
    else{
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(cameraPhoto.webPath!);
    const blob = await response.blob();
    return await this.convertBlobToBase64(blob) as string;  
    }
  }

  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });


  public async loadSaved() {
    // Retrieve cached photo array data
    const photos:any = await Storage.get({ key: this.PHOTO_STORAGE })
    .then(data=>{
      console.log(data);
      this.photos = JSON.parse(data.value) || [];
    }).catch(e=>{
      console.log(e);
    });
    if (!this.platform.is('hybrid')) {
    // Display the photo by reading into base64 format
       for (let photo of this.photos) {
  console.log(photo);
  // Read each saved photo's data from the Filesystem
  const readFile = await Filesystem.readFile({
      path: photo.filepath,
      directory: FilesystemDirectory.Data
  });

  // Web platform only: Save the photo into the base64 field
  photo.base64 = `data:image/jpeg;base64,${readFile.data}`;
  console.log(this.photos);
      }
    }
  }


  getPhoto(){
    return this.photos;
  }

  public async deletePicture(photo: Photos, position: number) {
    // Remove this photo from the Photos reference data array
    this.photos.splice(position, 1);
  
    // Update photos array cache by overwriting the existing photo array
    Storage.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photos)
    });
  
    // delete photo file from filesystem
    const filename = photo.filepath
                        .substr(photo.filepath.lastIndexOf('/') + 1);
  
    await Filesystem.deleteFile({
      path: filename,
      directory: FilesystemDirectory.Data
    });
  }

}
