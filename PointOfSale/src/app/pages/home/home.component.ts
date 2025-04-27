import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  
@Component({
  selector: 'app-home',
  standalone: true,
  imports : [CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  product: any = { name: '' }; // Object to hold the new product data

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  // Method to handle form submission
  onSubmit() {
    if (this.product.name) {
      this.productService.addProduct(this.product).subscribe(
        (response) => {
          console.log('Product added successfully', response);
          this.products.push(response);  // Optionally add the new product to the list
          this.product.name = ''; // Clear the form field
        },
        (error) => {
          console.error('Error adding product', error);
        }
      );
    }
  }
}
