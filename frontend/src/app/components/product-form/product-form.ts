import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule], // Import FormsModule
  templateUrl: './product-form.html',
  styleUrl: './product-form.css'
})
export class ProductFormComponent {
  newProduct: Product = {
    name: '',
    description: '',
    price: 0,
    stock: 0,
    imageUrl: 'https://placehold.co/400'
  };

  @Output() productCreated = new EventEmitter<void>();

  private productService = inject(ProductService);

  createProduct() {
    if (this.newProduct._id) {
      // UPDATE MODE
      this.productService.updateProduct(this.newProduct._id, this.newProduct).subscribe({
        next: (res) => {
          console.log('Producto actualizado', res);
          this.resetForm();
          this.productCreated.emit();
        },
        error: (err) => console.error('Error actualizando producto', err)
      });
    } else {
      // CREATE MODE
      this.productService.createProduct(this.newProduct).subscribe({
        next: (res) => {
          console.log('Producto creado', res);
          this.resetForm();
          this.productCreated.emit();
        },
        error: (err) => console.error('Error creando producto', err)
      });
    }
  }

  startEdit(product: Product) {
    this.newProduct = { ...product }; // Copy to avoid reference issues
  }

  resetForm() {
    this.newProduct = { name: '', description: '', price: 0, stock: 0, imageUrl: 'https://placehold.co/400' };
  }
}
