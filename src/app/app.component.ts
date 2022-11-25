import { Component } from "@angular/core";

@Component({
  selector:'sam-root',
  template:`
 <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Symbio</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" routerLink='/customer-list'>Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink='/customer-list' >Customers List</a>
        </li>
      
      </ul>
    
    </div>
  </div>
</nav>
<div class='container'>
  <router-outlet></router-outlet>

</div>

  `
  
  
})
export class AppComponent{
  pageTitle: string= 'SAM-CLIENT';
}

