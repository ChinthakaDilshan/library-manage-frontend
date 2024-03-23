import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-all-borrowers',
  standalone: true,
  imports: [HttpClientModule,FormsModule,CommonModule],
  templateUrl: './view-all-borrowers.component.html',
  styleUrl: './view-all-borrowers.component.css'
})
export class ViewAllBorrowersComponent implements OnInit{
public borrowerList:any;
public selectedBorrower: any;
private baseUrl:string = "http://localhost:8081";
  constructor(private http:HttpClient){

  }
  ngOnInit(): void {
    this.loadBorrowers();
  }

  loadBorrowers(){
    this.http.get(this.baseUrl+"/borrower/get-all-borrowers").subscribe((data)=>{
      console.log(data);
      this.borrowerList=data;
    })
  }
  setSelectedBorrower(borrower: any) {
    this.selectedBorrower = borrower;
    console.log("setSelectedBorrower" + borrower.id);
  }

  deleteBorrower() {
    let api = this.baseUrl+"/borrower/delete/" + this.selectedBorrower.id;
    this.http.delete(api, { responseType: 'text' }).subscribe((responce: string) => {
      console.log(responce);
      this.loadBorrowers()
      Swal.fire({
        title: "Deleted !",
        text: `${this.selectedBorrower.userName} book is deleted `,
        icon: "success"
      });
      this.selectedBorrower = null;
    })
  }

  saveBorrower() {
    let postApi = this.baseUrl+"/borrower/add-borrower";
    this.http.post(postApi, this.selectedBorrower).subscribe((data) => {
      console.log("Saved");
      this.loadBorrowers();
      Swal.fire({
        title: "Updated !",
        text: `${this.selectedBorrower.title} book is updated `,
        icon: "success"
      });
      this.selectedBorrower = {};
    });
  }
}
