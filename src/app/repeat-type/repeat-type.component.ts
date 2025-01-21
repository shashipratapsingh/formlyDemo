import { Component } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';

@Component({
  selector: 'formly-repeat-section',
  template: `

    <div *ngFor="let field of field.fieldGroup; let i = index;" class="guest-field">
      <formly-field [field]="field"></formly-field>
      <button type="button" class="remove-btn" (click)="remove(i)">Remove</button>
    </div>
    <button type="button" class="add-btn" (click)="add()">Add Guest</button>
  `,
  styles: [`
    .guest-field {

    
      margin-bottom: 10px;
      border-radius: 4px;
    }
    .add-btn, .remove-btn {
      background-color: #1976d2;
      color: white;
      border: none;
      padding: 8px 12px;
      border-radius: 4px;
      cursor: pointer;
    }
    .add-btn {
      margin-top: 10px;
    }
    .remove-btn {
      margin-top: 5px;
      background-color: #d32f2f;
      float: right;
      margin-top:20px;
    }
    .add-btn:hover {
      background-color: #115293;
    }
    .remove-btn:hover {
      background-color: #9a0007;
    }
  `],
})
export class RepeatTypeComponent extends FieldArrayType {}
