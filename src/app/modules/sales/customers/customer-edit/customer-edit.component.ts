import { Component, OnInit, ɵsetAllowDuplicateNgModuleIdsForTest } from '@angular/core';
import { CustomerService } from '../customer.service';
import { ActivatedRoute,Router } from '@angular/router';
import { CustomerEditModel } from './customer-edit-model';
import { NgForm } from '@angular/forms';
import { CustomerDetailsModel } from '../customer-details/customer-details-model';
import { CityModel } from 'src/app/modules/shared/city-model';
import { Subscription } from 'rxjs';
import { CityService } from 'src/app/modules/shared/city.service';



@Component({
  selector: 'sam-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {

  pageTitle='Edit Customer Details';
  errorMessage='';
  
  
  cityList: CityModel[] = [];
  selectedCustomer:CustomerEditModel | undefined;
  customer:CustomerEditModel| undefined ;
  customers: CustomerDetailsModel[]=[];
  sub!:Subscription;
  
  customerDetails: CustomerEditModel={
    id:0 ,
    customerName: '',
    customerCode:'',
    abn:'',
    division:'',
    address:'',
    contactNo:'',
    city:''

  }

  constructor(private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute,
    private cityService: CityService
   
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next:(params)=>{
        const id =params.get('id');
        if(id){
          this.customerService.getCustomerToEdit(id).subscribe({
            next:(response)=>{
              this.customerDetails=response;

            }

          })
        }

      }
      
    
    })
    
    
    this.sub=this.cityService.getCities().subscribe((data:any)=>{
      this.cityList=data;

    })
   
 
  }


  editCustomer(){
    this.customerService.updateCustomer(this.customerDetails.id.toString(), this.customerDetails).subscribe({
      next:(response)=>{
        this.router.navigate(['/customer-list']);
      }
    })
  }

  onBack(): void {
    
    this.router.navigate(['/customer-list']);
  }

}
