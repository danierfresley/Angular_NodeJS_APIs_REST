import { Component, OnInit, inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule using 'ng add @angular/common' if needed, but usually it's there
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductListComponent implements OnInit {
  @Output() editProduct = new EventEmitter<Product>();
  products: Product[] = [];
  loading = false;
  errorMessage = '';
  private productService = inject(ProductService);

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    this.errorMessage = '';

    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
        console.log('✅ Productos cargados desde Backend:', data);
      },
      error: (err) => {
        console.error('Error loading products', err);
        this.errorMessage = 'Error al conectar con el servidor. Asegúrate de que el Backend (puerto 3000) esté corriendo.';
        this.loading = false;
      }
    });
  }

  deleteProduct(id: string | undefined) {
    if (!id) return;
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.products = this.products.filter(p => p._id !== id);
          console.log('Producto eliminado');
        },
        error: (err) => console.error('Error eliminando', err)
      });
    }
  }
}
