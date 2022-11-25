import { Injectable } from '@angular/core';
import { CustomerListModel } from './customer-list/customer-list-model';
import { CustomerDetailsModel } from './customer-details/customer-details-model';
import {Observable, catchError, tap, throwError,map} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { CustomerCreateModel } from './customer-create/customer-create-model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService { getCustomers():Observable<CustomerListModel[] >{
    return this.http.get<CustomerListModel[]>(this.customerUrl).pipe(tap(data=>console.log('ALL',JSON.stringify(data))),
    catchError(this.handleError)
    );
  }
  private customerUrl='https://localhost:7179/api/Customer';
  private customers: CustomerCreateModel[]=[];
  private customer: CustomerCreateModel| undefined;
  private city:string="";

    constructor(private http:HttpClient) { }

 

  getPagedCustomers(page: number):Observable<CustomerListModel[] >{
    return this.http.get<CustomerListModel[]>(this.customerUrl + '?page='+ page).pipe(tap(data=>console.log('ALL',JSON.stringify(data))),
    catchError(this.handleError)
    );
  }

  onGetCustomer(id: number){
    return this.customers.find(x=>x.id===this.customer?.id);


  }

  getCustomer(id: number): Observable<CustomerListModel | undefined> {
    return this.getCustomers()
      .pipe(
        map((customers: CustomerListModel[]) => customers.find(c => c.id === id))
      );
  }

  getCustomerToEdit(id:string):Observable<CustomerCreateModel>{
   return this.http.get<CustomerCreateModel>(`${this.customerUrl}/` + id)

  }

  getCustomerForMerge(customerName: string):Observable<CustomerListModel>{
    return this.http.get<CustomerListModel>(`${this.customerUrl}/` + customerName)
  }

  // getCustomerForMerge(name: string): Observable<CustomerListModel | undefined> {
  //   name=name.toLocaleLowerCase()
  //   return this.getCustomers()
  //     .pipe(
  //       map((customers: CustomerDetailsModel[]) => customers.find(c=>c.customerName===name ))
  //     );
  // }

//POST data to json file

public createCustomer(customer: CustomerCreateModel): Observable<CustomerCreateModel[]>{
  return this.http.post<CustomerCreateModel[]>(`https://localhost:7179/api/Customer`,customer);
}
 
//Edit Customer
  updateCustomer(id: string, customer:CustomerCreateModel): Observable<CustomerCreateModel>{
    return this.http.put<CustomerCreateModel>(`${this.customerUrl}/` + id,customer)

  }
//delete Customer
  deleteCustomer(id: string):Observable<CustomerCreateModel> {
    return this.http.delete<CustomerCreateModel>(`${this.customerUrl}/` + id)
  }

  private handleError(err: HttpErrorResponse){
    //in a real world app we may send the server to some remote logging infrastructure
    //instead of just logging it to the console
    let errorMessage='';
    if(err.error instanceof ErrorEvent){
      // a client-side or network error occured. Handle it accordingly
      errorMessage=`An error occured ${err.error.message}`;

    } 
    else{
      //the back-end returned an unsuccessful response code
      //the response body may contain clues to what went wrong
      errorMessage=`Server returned code ${err.status}, error message is ${err.message}`;

      
    }
    console.error(errorMessage);
    return throwError(()=>errorMessage)
  }
}
