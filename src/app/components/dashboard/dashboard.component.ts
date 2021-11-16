import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public productsForm: FormGroup;
  public products:any = []
  public sellers:any = []

  constructor(private productService: ProductService, private userService: UserService) { }

  ngOnInit(): void {
    this.getAllProductsAdmin(0)
    this.productsForm = new FormGroup({
      user_id: new FormControl('', []),
    })
    this.productsForm.controls['user_id'].setValue(0, { onlySelf: true })
    this.getAllSellers()
  }

  get user_id() { return this.productsForm?.get('user_id'); }

  getAllProductsAdmin(user_id){ 
    this.productService.getAllProductsAdmin(user_id).subscribe(res => {

      this.products = res.products
    })
  }

  getAllSellers(){
    this.userService.getAllSellers().subscribe(res => {
      this.sellers = res.users
    })
  }

  onChange(e){
    this.search()
  }

  search(){
    this.getAllProductsAdmin(this.productsForm.get('user_id').value)
  }



}
