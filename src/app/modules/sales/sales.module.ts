import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerCreateComponent } from './customer-create/customer-create.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomerEditComponent } from './customers/customer-edit/customer-edit.component';
import { CustomerMergeModalComponent } from './customers/customer-merge-modal/customer-merge-modal.component';
import { CustomerDeleteComponent } from './customers/customer-delete/customer-delete.component';



@NgModule({
  declarations: [
    CustomerListComponent,
    CustomerCreateComponent,
    CustomerDetailsComponent,
    CustomerEditComponent,
    CustomerMergeModalComponent,
    CustomerDeleteComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SalesModule { }
