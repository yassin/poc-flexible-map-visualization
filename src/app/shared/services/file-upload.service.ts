import {Injectable} from '@angular/core';
import {FileUpload} from '../models/file-upload.model';
import {Subject} from "rxjs";
import * as deepEqual from "fast-deep-equal";
import {LocationMapModel} from "../models/location-map.model";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private icons = ["/assets/icons/blue-dot.png", "/assets/icons/orange-dot.png", "/assets/icons/pink-dot.png",
    "/assets/icons/purple-dot.png"];

  private _selectedDataMap: Array<any> = [];
  private fileNameList: Array<any> = [];
  private dataMap: Array<any> = [];

  constructor() {
  }

  selectedDataMapSubject = new Subject<Array<any>>();
  fileListSubject = new Subject<Array<any>>();
  private iconRandom: number = 0;

  deleteFile(fileUpload: FileUpload): void {

  }

  readFile(file: File) {
    /*  var fileReader = new FileReader();
      fileReader.onload = () => {
        if (typeof fileReader.result === "string") {
          console.log(JSON.parse(fileReader.result));
          let temp: Array<any>;
          temp = JSON.parse(fileReader.result);
          this.dataMap.push(temp);
        }
      };
      fileReader.readA  sText(file);*/
    this.dataMap.push(this.csv2Array(file));
    this.fileNameList.push(file.name);
    this.fileListSubject.next(this.fileNameList);

  }

  selectDataMap(index: number) {
    this._selectedDataMap = this._selectedDataMap.concat(this.dataMap[index]);
    this.selectedDataMapSubject.next(this._selectedDataMap);
  }

  removeDataMap(index: number) {
    // @ts-ignore
    this.dataMap[index].forEach(element => {
      this._selectedDataMap.forEach((item, placement, object) => {
        // @ts-ignore
        if (deepEqual(element, item)) {
          object.splice(placement, 1);
        }
      })
    })
    this.selectedDataMapSubject.next(this._selectedDataMap);
  }

  get selectedDataMap(): Array<any> {
    return this._selectedDataMap;
  }


  clearSelectedDataMap() {
    this._selectedDataMap.splice(0, this._selectedDataMap.length);
    this.selectedDataMapSubject.next(this._selectedDataMap);
  }

  csv2Array(file: File): any {
    let reader: FileReader = new FileReader();
    var dataResult: Array<any> = [];
    reader.readAsText(file);
    reader.onload = (e) => {
      // @ts-ignore
      let csv: string = reader.result;
      let allTextLines = csv.split(/\r|\n|\r/);
      for (let i = 1; i < allTextLines.length; i++) {
        // split content based on comma
        let data = allTextLines[i].split(',');
        let locationMapModel = new LocationMapModel();
        locationMapModel.lat = Number(data[0]);
        locationMapModel.lng = Number(data[1]);
        locationMapModel.title = data[2];
        locationMapModel.info = data[3];
        locationMapModel.icon = this.icons[this.iconRandom];
        // log each row to see output
        dataResult.push(locationMapModel);
      }
    }
    // all rows in the csv file
    // @ts-ignore
    console.log(">>>>>>>>>>>>>>>>>", dataResult);
    this.iconRandom = this.iconRandom + 1;
    return dataResult;
  }

}
