import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute,Router } from '@angular/router';
import { CustomerDetailsModel } from '../customer-details/customer-details-model';
import { CustomerService } from '../customer.service';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'sam-customer-merge-modal',
  templateUrl: './customer-merge-modal.component.html',
  styleUrls: ['./customer-merge-modal.component.css']
})
export class CustomerMergeModalComponent implements OnInit,OnDestroy {
@ViewChild('ddlcustomers')
  infoStyle='none'; 
  mySelect='';
  name!: string;
  myCustomer={
    id: 0,
    customerName: '',
    customerCode:'',
    abn:'',
    division:'',
    address:'',
    contactNo:'',
    city:''

  };
  customer:CustomerDetailsModel| undefined;
   customers: CustomerDetailsModel[]=[];
  id: string='';
  sub!:Subscription;
  errorMessage: string='';
  mergedCustomer: CustomerDetailsModel={
    id: 0,
    customerName: '',
    customerCode:'',
    abn:'',
    division:'',
    address:'',
    contactNo:'',
    city:''

  };
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private customerService: CustomerService) { }

  ngOnInit(): void {
    this.infoStyle='none';
    this.sub= this.customerService.getCustomers().subscribe({
      next: (customers: CustomerDetailsModel[])=>{
        this.customers=customers;
    
      } ,
      error: err=> this.errorMessage= err
      
    });

    this.route.paramMap.subscribe({
      next:(params)=>{
        const id =params.get('id');
        if(id){
          this.customerService.getCustomerToEdit(id).subscribe({
            next:(response)=>{
              this.mergedCustomer=response;
          
            }

          })
        }

      }
      
    
    })
  
  }

  mergeCustomers(){
    
    
    if(this.mergedCustomer.id.toString()===this.mySelect)
    {alert("You cannot Merge the same Customer!")}

    else{
    //    this.mergedCustomer=Object.assign(this.mergedCustomer,this.customer);
    // alert(JSON.stringify(Object.assign(this.mergedCustomer,this.customer)));

    this.mergedCustomer.customerName=this.myCustomer.customerName;
    this.mergedCustomer.customerCode=this.myCustomer.customerCode;
    this.mergedCustomer.address=this.myCustomer.address;
    this.mergedCustomer.abn=this.myCustomer.abn;
    this.mergedCustomer.division=this.myCustomer.division;
    this.mergedCustomer.city=this.myCustomer.city;
    this.mergedCustomer.contactNo=this.myCustomer.contactNo;
 
    this.customerService.updateCustomer(this.mergedCustomer.id.toString(),this.myCustomer).subscribe(res=>{
      res=this.mergedCustomer;
      
//      alert('Customer successfully merged!')
//      this.router.navigate(['/customer-list'])
//  .then(() => {
//    window.location.reload();
//  });
 
   })
   this.customerService.deleteCustomer(this.mySelect).subscribe(res=>{
         alert('Customer successfully merged!')
     this.router.navigate(['/customer-list'])
 .then(() => {
   window.location.reload();
 });

   })

    }
 
 }

 ngOnDestroy(): void {
   this.sub.unsubscribe();
 }

 isEmptyObject(obj: {}) {
  return (obj && (Object.keys(obj).length === 0));
}

toggleInfo(event: any){

  
  this.mySelect=event.target.value;
  this.name = event.target.options[event.target.options.selectedIndex].text;
  let my_alert =document.getElementsByClassName('alert')as HTMLCollectionOf<HTMLElement>;
  if(Number(this.mySelect)===0){
    this.infoStyle='none';
  }
  else{
    this.infoStyle='block';
  }
 
  if(this.mySelect){
    this.getCustomer(Number(this.mySelect));

     this.sub=this.customerService.getCustomerForMerge(this.name).subscribe((data:CustomerDetailsModel)=>{
    this.myCustomer=data;
    // alert(JSON.stringify(this.myCustomer));
   
  });
   
  }
  

}

getCustomer(id: number): void {
  this.customerService.getCustomer(id).subscribe({
    next: customer => this.customer = customer,
    error: err => this.errorMessage = err
  });
}

}
