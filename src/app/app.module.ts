import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ActivatedRoute,Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerCreateComponent } from './modules/sales/customers/customer-create/customer-create.component';
import { CustomerDeleteComponent } from './modules/sales/customers/customer-delete/customer-delete.component';

import { CustomerDetailsComponent } from './modules/sales/customers/customer-details/customer-details.component';
import { CustomerEditComponent } from './modules/sales/customers/customer-edit/customer-edit.component';
import { CustomerListComponent } from './modules/sales/customers/customer-list/customer-list.component';
import { CustomerMergeModalComponent } from './modules/sales/customers/customer-merge-modal/customer-merge-modal.component';



@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    CustomerCreateComponent,
    CustomerDetailsComponent,
    CustomerEditComponent,
    CustomerMergeModalComponent,
    CustomerDeleteComponent
    
    

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    
  
    RouterModule.forRoot([
      { path: 'customer-list', component: CustomerListComponent},
      { path: 'customer-list/:id', component: CustomerDetailsComponent},
      { path: 'customer-edit/:id', component: CustomerEditComponent},
      { path: '', redirectTo: 'customer-list', pathMatch: 'full'},
      
    
  
    ])
  
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
