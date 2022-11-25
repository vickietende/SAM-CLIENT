
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { CustomerCreateModel } from '../customer-create/customer-create-model';



 
@Component({
  selector: 'sam-customer-delete',
  templateUrl: './customer-delete.component.html',
  styleUrls: ['./customer-delete.component.css']
})
export class CustomerDeleteComponent implements OnInit {
  @ViewChild('basicModal', { static: true })
  basicModal!: CustomerDeleteComponent;

  
  id: string='';

  customerDetails: CustomerCreateModel={
    id:0 ,
    customerName: '',
    customerCode:'',
    abn:'',
    division:'',
    address:'',
    contactNo:'',
    city:''

  }

  constructor( private router: Router,
    private route: ActivatedRoute,
    private customerService:CustomerService,) { }

  ngOnInit(): void {
    
    
    this.route.paramMap.subscribe({
      next:(params)=>{
        const id =params.get('id');
        if(id){
          this.customerService.getCustomerToEdit(id).subscribe({
            next:(response)=>{
              this.customerDetails=response;
              this.id=this.customerDetails.id.toString();
           
            }

          })
        }

      }
      
    
    })
  }

  deleteCustomer(id: string){
    this.customerService.deleteCustomer(id).subscribe(res=>{
    
     alert('Customer successfully deleted!')
     this.router.navigate(['/customer-list'])
 .then(() => {
   window.location.reload();
 });
 
   })
      }

}
