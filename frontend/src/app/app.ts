import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './components/product-list/product-list';
import { ProductFormComponent } from './components/product-form/product-form';

import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ProductListComponent, ProductFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'frontend';

  @ViewChild(ProductListComponent) productList!: ProductListComponent;
  @ViewChild(ProductFormComponent) productForm!: ProductFormComponent;

  onProductCreated() {
    this.productList.loadProducts();
  }

  onEditProduct(product: Product) {
    this.productForm.startEdit(product);
  }
}
