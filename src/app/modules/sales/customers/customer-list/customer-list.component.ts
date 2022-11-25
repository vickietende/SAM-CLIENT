import { Component, OnInit,OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription } from "rxjs";
import { CustomerService } from '../customer.service';
import { CustomerListModel } from './customer-list-model';
import { Router } from '@angular/router';


@Component({
  // selector: 'sam-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit, OnDestroy {

  constructor(private customerService: CustomerService,
    private router: Router) { }

  pageTitle='Customers List';
  filteredCustomers: CustomerListModel[]=[];
  errorMessage: string='';
  dropDownStyle='none';
  customers: CustomerListModel[]=[];
  sub!: Subscription;
  Id=document.getElementById('Id')?.innerHTML;
  customerToAdd?: CustomerListModel;
  p: number = 1;
  total: number = 0;
  
 
  
  private _listFilter: string='';
  get listFilter(): string{
    return this._listFilter;
}
set listFilter(value: string){
    this._listFilter=value;
    console.log('In setter:', value);
    this.filteredCustomers=this.performFilter(value);
  
}

  ngOnInit(): void {
    this.dropDownStyle='none';
    this.sub= this.customerService.getPagedCustomers(this.p).subscribe({
      next: (customers: CustomerListModel[])=>{
        this.customers=customers;
        this.filteredCustomers=this.customers;
        

      } ,
      error: err=> this.errorMessage= err
      
    });
  }

  pageChangeEvent(event: number){
    this.p = event;
    this.sub= this.customerService.getPagedCustomers(this.p).subscribe({
      next: (customers: CustomerListModel[])=>{
        this.customers=customers;
        this.filteredCustomers=this.customers;
        this.total=this.filteredCustomers.length;

      } ,
      error: err=> this.errorMessage= err
      
    });
    
}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

 

  performFilter(filterBy: string): CustomerListModel[]{
    filterBy=filterBy.toLocaleLowerCase();
    return this.customers.filter((customer: CustomerListModel)=> 
    customer.city.toLocaleLowerCase().includes(filterBy));
        
  }

  toggleMenu(): void{
    let dropdown =document.getElementsByClassName('dropdown')as HTMLCollectionOf<HTMLElement>;
    if(this.dropDownStyle=='none'){
      this.dropDownStyle='block';
    }
    else{
      this.dropDownStyle='none';
    }

}

initNewCustomer() {
  this.customerToAdd=new CustomerListModel();
}

updateCustomerList(customers:CustomerListModel[]){
  this.customers=customers;
  this.filteredCustomers=customers;
 
}

}





