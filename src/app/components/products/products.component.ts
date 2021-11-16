import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  @ViewChild('errorSwal') public errorSwal: SwalComponent | undefined
  @ViewChild('successSwal') public successSwal: SwalComponent | undefined
  @ViewChild('errorIncorrectSwal') public errorIncorrectSwal: SwalComponent | undefined

  public productsForm: FormGroup;
  public user_id:string = JSON.parse(localStorage.getItem('user_info')).id
  public products:any = []

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productsForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      sku: new FormControl('', [Validators.required]),
      cantidad: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required])
    })

    this.getAllProducts()
  }

  get nombre() { return this.productsForm?.get('nombre'); }
  get sku() { return this.productsForm?.get('sku'); }
  get cantidad() { return this.productsForm?.get('cantidad'); }
  get precio() { return this.productsForm?.get('precio'); }

  cleanForms(){
    this.productsForm.reset()
  }

  getAllProducts(){ 
    this.productService.getAllProducts(this.user_id).subscribe(res => {
      this.products = res.products
    })
  }

  createProduct(){
    let object = {
      nombre: this.productsForm.get('nombre').value,
      sku: this.productsForm.get('sku').value,
      cantidad: this.productsForm.get('cantidad').value,
      precio: this.productsForm.get('precio').value,
      user_id:this.user_id
    }
    this.productService.createProduct(object).subscribe(res => {
      this.successSwal.fire()
      this.cleanForms()
      this.getAllProducts()
    },err => {
      console.log(err)
      this.errorSwal.fire()
    })
  }

}
