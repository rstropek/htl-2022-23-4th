import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../app.module';
import { Fields, Root, Record } from '../model';
import { TodoServiceService } from '../todo-service.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  public data?: Root; // Holds the data returned from Airtable
  public loading = false; // Indicates whether we are currently loading data from Airtable

  public onlyUndone = false; // Indicates whether only undone items should be displayed

  public editItemId?: string; // ID of the record that is currently edited; undefined if we are not in edit mode
  public currentItem!: Fields; // Content for the add/edit form

  constructor(private dal: TodoServiceService) {
    this.clearCurrentItem();
  }

  /** Resets the add/edit form */
  clearCurrentItem(): void {
    // If in edit mode, clear id to return to add mode
    delete this.editItemId;

    // Reset content of add form
    this.currentItem = { Description: '', AssignedTo: '', Done: false };
  }

  ngOnInit(): void {
    // Add call to refresh if you want to load the data automatically when component is loaded
    // this.refresh();
  }

  /** Loads records from Airtable */
  refresh(): void {
    // Indicate that we are loading data
    this.loading = true;

    this.dal.loadItems(this.onlyUndone).subscribe((data) => {
      // Store data returned from Airtable and indicate that loading has been finished
      this.data = data;
      this.loading = false;
    });
  }

  /** Updates or creates an item */
  save(): void {
    let operation: Observable<unknown>;
    if (this.editItemId) {
      // If editItemId is not undefinied, we need to update
      operation = this.dal.updateItem(this.editItemId, this.currentItem);
    } else {
      // If editItemId is undefinied, we need to add
      operation = this.dal.createItem(this.currentItem);
    }

    operation.subscribe(() => {
      // Clear edit form and reload data
      this.clearCurrentItem();
      this.refresh();
    });
  }

  /** Delete the item with the given ID */
  delete(id: string): void {
    this.dal.deleteItem(id).subscribe(() => this.refresh());
  }

  /** Switch to edit mode for the given record */
  switchToEditMode(rec: Record): void {
    this.editItemId = rec.id;
    this.currentItem = { ...rec.fields }; // Copy record from result data
  }
}
