import {Component, OnInit} from '@angular/core';
import {FileUploadService} from 'src/app/shared/services/file-upload.service';
import {FileUpload} from 'src/app/shared/models/file-upload.model';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent implements OnInit {
  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 100;
  fileName = 'Select File';

  constructor(private uploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    this.fileName = event.target.files[0].name;
  }

  upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;

      if (file) {
        this.currentFileUpload = new FileUpload(file);
        this.uploadService.readFile(file);
        this.uploadService.clearSelectedDataMap();

      }
    }

  }
}
