import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Photo } from '../../_models/Photo';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_service/auth.service';
import { UserService } from 'src/app/_service/User.service';
import { AllertifyserviceService } from 'src/app/_service/allertifyservice.service';
@Component({
  selector: 'app-photo-edite',
  templateUrl: './photo-edite.component.html',
  styleUrls: ['./photo-edite.component.css']
})
export class PhotoEditeComponent implements OnInit {
@Input() photos: Photo[];
@Output() changPhotoMain = new EventEmitter();
public uploader: FileUploader ;
  public hasBaseDropZoneOver = false;
  public hasAnotherDropZoneOver = false;
baseUrl = environment.apiUrl;
currentMainPhoto: Photo;
  constructor(private auth: AuthService, private userserv: UserService, private alerify: AllertifyserviceService) { }

  ngOnInit() {
    this.intilisedUpload();
  }
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  intilisedUpload() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/' + this.auth.decodeToken.nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    }) ;
    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false; };
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain
        };
        this.photos.push(photo);
      }
    };
  }
setMainPhoto(photo: Photo) {
  this.userserv.setMainPhoto(this.auth.decodeToken.nameid, photo.id).subscribe(() => {
    this.alerify.success('Success Set Main Photo');
    this.currentMainPhoto = this.photos.filter(p => p.isMain === true)[0];
    this.currentMainPhoto.isMain = false;
    photo.isMain = true;
this.auth.currentuser.photoUrl = photo.url;
this.auth.ChangPhoto(photo.url);
localStorage.setItem('user', JSON.stringify(this.auth.currentuser));
    // this.changPhotoMain.emit(photo.url);
  }, error => {
    this.alerify.error('Error in set Main');
  });
}
deletePhoto(id: number) {
  this.alerify.confirm('Are you Shore Delete photo?', () => {
this.userserv.deletPhoto(this.auth.decodeToken.nameid, id).subscribe(() => {
  this.photos.splice(this.photos.findIndex(p => p.id === id), 1);
  this.alerify.success('Delete Photo');
}, error => {
  this.alerify.error('Can not delete photo');
});
  });
}
  }

