import {Component, OnInit} from '@angular/core';
import {FileUploadService} from 'src/app/shared/services/file-upload.service';

@Component({
  selector: 'app-upload-list',
  templateUrl: './upload-list.component.html',
  styleUrls: ['./upload-list.component.css']
})
export class UploadListComponent implements OnInit {
  fileUploads?: any[];

  constructor(private uploadService: FileUploadService) {
  }

  ngOnInit(): void {
    this.uploadService.fileListSubject.subscribe(res => {
      this.fileUploads = res;
    });

  }
}
