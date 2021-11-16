import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MarketService } from 'src/app/services/market.service';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.css']
})
export class MarketplaceComponent implements OnInit {

  public productsForm: FormGroup;
  public products:any = []
  public cant:number = 0

  constructor(private marketService: MarketService) { }

  ngOnInit(): void {
    this.productsForm = new FormGroup({
      nombre: new FormControl('', []),
      sku: new FormControl('', []),
      precio1: new FormControl('', []),
      precio2: new FormControl('', []),
    })
    this.search()
  }

  search(){
    let precio1, precio2 = ''
    if(this.productsForm.get('precio1').value === null){
      precio1 = ''
    }else{
      precio1 = this.productsForm.get('precio1').value
    }

    if(this.productsForm.get('precio2').value === null){
      precio2 = ''
    }else{
      precio2 = this.productsForm.get('precio2').value
    }

    let object = {
      nombre: this.productsForm.get('nombre').value != '' ? this.productsForm.get('nombre').value : '', 
      sku: this.productsForm.get('sku').value != '' ? this.productsForm.get('sku').value : '', 
      precio1: precio1, 
      precio2: precio2
    }
    this.marketService.getAllProducts(object).subscribe(res => {
      this.products = res.products
    })
    localStorage.setItem('items', '0');
  }

  addToCar(){
    let plus = Number(localStorage.getItem('items')) + 1
    localStorage.setItem('items', plus.toString())
    this.cant= plus
  }

}
