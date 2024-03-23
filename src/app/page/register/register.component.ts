import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { last } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  private http;
  public countryList: any;
  public isExistsBorrower:any;
  public selectedCountryCode:any;
  public borrowerObj = {
    firstName: null,
    lastName: null,
    userName: null,
    email: null,
    address: null,
    address2: null,
    country: null,
    contactNumber: null
  }
  public selectedCountry: any;

  constructor(private httpCliant: HttpClient) {
    this.http = httpCliant;
  }
  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries() {
    let api = "https://restcountries.com/v3.1/all";

    this.http.get(api).subscribe(res => {
      this.countryList = res;
      console.log(res);
    });
  }

  setSelectedCountry(country: any) {
    this.selectedCountry = country;
    this.selectedCountryCode=country.idd.root+""+country.idd.suffixes[0];
    console.log(this.selectedCountryCode);
    console.log(this.selectedCountry);
  }

  submitForm() {
    console.log(this.borrowerObj);

    this.http.get(`http://localhost:8081/borrower/is-exist-borrower/${this.borrowerObj.userName}`).subscribe(data => {
      console.log(data);
      this.isExistsBorrower=data;
      this.registerBorrower(this.isExistsBorrower);

    });
  }


  registerBorrower(isExistsBorrower: any) {
    if(!isExistsBorrower==true){
      this.http.post("http://localhost:8081/borrower/add-borrower",this.borrowerObj).subscribe(data=>{
        Swal.fire({
          title:"Success",
          text:`${this.borrowerObj.userName} has  been registed`,
          icon:"success"
        })
      })
    }else{
      Swal.fire({
        title:"can't register this borrower",
        text:`${this.borrowerObj.userName} has already been registed`,
        icon:"error"
      })
    }
    console.log(isExistsBorrower);
    
  }

}
