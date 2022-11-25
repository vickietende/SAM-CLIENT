import { Component, EventEmitter, Input,Output,OnInit, OnChanges, SimpleChanges} from '@angular/core';
import { CustomerCreateModel } from './customer-create-model';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { ActivatedRoute,Router } from '@angular/router';
import { CityModel } from 'src/app/modules/shared/city-model';
import { Subscription } from "rxjs";
import { CityService } from 'src/app/modules/shared/city.service';
import { formatCurrency } from '@angular/common';




@Component({
  selector: 'sam-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {

  pageTitle='Add New Customer';
  dropDownStyle='none';
  isSubmitted=false;
  cityList: CityModel[]=[];
  

  
  
  sub!: Subscription;
  // customer: CustomerCreateModel= new CustomerCreateModel;
  @Input() customer? : CustomerCreateModel;
  @Output() customers = new EventEmitter<CustomerCreateModel[]>();

  constructor(private customerService: CustomerService,
    private cityService: CityService, 
    private route: ActivatedRoute, 
    private router: Router
    ) { }
 

  ngOnInit(): void {
    this.dropDownStyle='none';
    this.sub=this.cityService.getCities().subscribe((data:any)=>{
      this.cityList=data;

    })
   
  
  }

 

  createCustomer(customer:CustomerCreateModel){
    this.customerService.createCustomer(customer)
    .subscribe((customers: CustomerCreateModel[])=> this.customers.emit(customers), );
    alert("Customer Successfully Saved");
    
   
  
  }

  refreshCustomer(cusForm: NgForm) {
    cusForm.resetForm();;
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

}


