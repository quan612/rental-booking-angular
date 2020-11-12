import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

import { ImageUploadService } from './image-upload.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';

export class ImageSnippet {
  src: string;
  status = 'INIT';

  name: string;
  type: string;

  constructor(name: string, type: string) {
    this.name = name;
    this.type = type;
  }
}

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
})
export class ImageUploadComponent implements OnInit, OnDestroy {
  private _fileReader = new FileReader();

  @Output('imageUpload') imageUpload = new EventEmitter();
  selectedImage: ImageSnippet;
  imageChangedEvent: any = '';

  constructor(private imageUploadService: ImageUploadService) {}

  ngOnInit(): void {
    this.listenToFileLoading();
  }

  loadImage(event: any): void {
    this.imageChangedEvent = event;
    const file: File = event.target.files[0];
    this.selectedImage = new ImageSnippet(file.name, file.type);

    // this will fire 'load' event
    this._fileReader.readAsDataURL(file);
  }

  imageCropped(event: ImageCroppedEvent): void {
    this.selectedImage.src = event.base64;
  }

  uploadImage(): void {
    this.selectedImage.status = 'PENDING';

    this.imageUploadService.uploadImage(this.selectedImage).subscribe(
      (uploadedImage) => {
        this.selectedImage.status = 'UPLOADED';
        this.imageUpload.emit(uploadedImage._id);
        this.imageChangedEvent = null;
      },
      (error) => {
        this.selectedImage.status = 'ERROR';
        this.imageChangedEvent = null;
        console.log(error);
      }
    );
  }

  cancelImage(fileInput: any): void {
    this.selectedImage = null;
    fileInput.value = null;
    this.imageUpload.emit(null);
    this.imageChangedEvent = null;
  }

  private handleLoadImage = (event: any): void => {
    const { result } = event.target;
    this.selectedImage.src = result;
    this.selectedImage.status = 'LOADED';
  };

  private listenToFileLoading(): void {
    this._fileReader.addEventListener('load', this.handleLoadImage);
  }

  ngOnDestroy(): void {
    this._fileReader.removeEventListener('load', this.handleLoadImage);
  }
}
