import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = 'https://secure.kwsp.gov.my/m2/postBranchLocation';

  constructor(private httpClient: HttpClient) {}

  getPost() {
    let body = { "ios": "100", "lan": "EN", "ver": "100" }
    let headers = new HttpHeaders()
      // headers.set('Access-Control-Allow-Origin', '*');
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    
    return this.httpClient.post(`${this.apiUrl}`, body, { 'headers': headers });
  }
}
