import { Component, OnDestroy, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { ActivatedRoute,Router } from '@angular/router';
import { CustomerDetailsModel } from './customer-details-model';
import { first, Subscription } from "rxjs";
import { CustomerEditComponent } from '../customer-edit/customer-edit.component';

@Component({
  
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  pageTitle='Customer Details';
  dropDownStyle='none';
  dismissModal: any='';
  sub!: Subscription;
  customers: CustomerDetailsModel[]=[];
  customer:CustomerDetailsModel | undefined ;
  errorMessage='';
  
 
 


  constructor(private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService) {
}

  ngOnInit(): void {
    this.dropDownStyle='none';
    
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getCustomer(id);
    
    }
  }
 
  getCustomer(id: number): void {
    this.customerService.getCustomer(id).subscribe({
      next: customer => this.customer = customer,
      error: err => this.errorMessage = err
    });
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


  onBack(): void {
    
    this.router.navigate(['/customer-list']);
  }

}
