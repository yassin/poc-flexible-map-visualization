import {Component, Input, OnInit} from '@angular/core';
import {FileUploadService} from 'src/app/shared/services/file-upload.service';
import {MatCheckboxChange} from "@angular/material/checkbox";

@Component({
  selector: 'app-upload-details',
  templateUrl: './upload-details.component.html',
  styleUrls: ['./upload-details.component.css']
})
export class UploadDetailsComponent implements OnInit {
  @Input() fileUpload!: string;
  @Input() index!: number;

  constructor(private uploadService: FileUploadService) {
  }

  ngOnInit(): void {
  }

  deleteFileUpload(fileUpload: string): void {
    //this.uploadService.deleteFile(fileUpload);
  }

  selectFileToShow(event: MatCheckboxChange, index: number) {
    // @ts-ignore
    if (event.checked) {
      this.uploadService.selectDataMap(index);
    } else {
      this.uploadService.removeDataMap(index);
    }
  }
}
