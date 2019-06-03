import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_service/User.service';
import { AllertifyserviceService } from '../../_service/allertifyservice.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/User';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
user: User;
galleryOptions: NgxGalleryOptions[];
galleryImages: NgxGalleryImage[];
  constructor(private usersServic: UserService, private alertify: AllertifyserviceService,
     private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
    this.galleryOptions = [
      {
          width: '500px',
          height: '500px',
          thumbnailsColumns: 4,
          imagePercent: 100,
          imageAnimation: NgxGalleryAnimation.Slide,
          preview: false


      }
  ];

  this.galleryImages = this.getImages();

  }

getImages() {
const imageUrl = [];
for (let i = 0; i < this.user.photos.length; i++) {
  imageUrl.push({
    small: this.user.photos[i].url,
    medium: this.user.photos[i].url,
    big: this.user.photos[i].url,
    description: this.user.photos[i].description,
  });

}
return imageUrl;
}
}
