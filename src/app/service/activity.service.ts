import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private _http: HttpClient) { }

  getActivities() {
    return this._http.get('http://13.235.223.235:8081/fetchPolitics')
  }
  getActivitiesIBM() {
    return this._http.get('http://13.235.223.235:8081/fetchIBM')
  }
}
