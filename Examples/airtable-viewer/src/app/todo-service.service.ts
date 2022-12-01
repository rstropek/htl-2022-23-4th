import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from './app.module';
import { Fields, Root, Record } from './model';

// Note that we are not using Airtable's JavaScript client
// (https://github.com/Airtable/airtable.js) or any other OSS Airtable client
// (e.g. https://www.npmjs.com/package/ngx-airtable) because we want
// to learn and practice working with Angular's HttpClient.

@Injectable({
  providedIn: 'root',
})
export class TodoServiceService {
  constructor(
    private http: HttpClient,
    @Inject(BASE_URL) private baseUrl: string
  ) {}

  loadItems(onlyUndone: boolean): Observable<Root> {
    // For details see https://airtable.com/developers/web/api/list-records
    const sort = encodeURIComponent('sort[0][field]');
    let url = `${this.baseUrl}/TodoList?${sort}=Description`;
    if (onlyUndone) {
      url += '&filterByFormula=not(Done)';
    }
    return this.http.get<Root>(url);
  }

  createItem(fields: Fields): Observable<unknown> {
    // For details see https://airtable.com/developers/web/api/create-records
    const newItem: Root = { records: [{ fields }] };
    return this.http.post(`${this.baseUrl}/TodoList`, newItem);
  }

  updateItem(id: string, fields: Fields): Observable<unknown> {
    // For details see https://airtable.com/developers/web/api/update-record
    const itemChange: Record = { fields };
    return this.http.patch(`${this.baseUrl}/TodoList/${id}`, itemChange);
  }

  deleteItem(id: string): Observable<unknown> {
    // For details see https://airtable.com/developers/web/api/delete-record
    return this.http.delete(`${this.baseUrl}/TodoList/${id}`);
  }
}
