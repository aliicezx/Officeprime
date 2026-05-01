import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { ProductService, Product } from '../../services/product.service';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, RouterLink, FormsModule, DecimalPipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  qty = 1;
  selectedColor = 'Preto';
  activeTab = 'Descrição';
  tabs = ['Descrição', 'Especificações', 'Avaliações'];

  colors = [
    { name: 'Preto',  hex: '#1F2937' },
    { name: 'Cinza',  hex: '#9CA3AF' },
    { name: 'Branco', hex: '#F9FAFB' },
    { name: 'Azul',   hex: '#3A5CA8' },
  ];

  product: Product = {
    id: 0,
    name: '',
    category: '',
    slug: '',
    price: 0,
    rating: 0,
    reviews: 0,
    icon: '',
  };

  get thumbs(): string[] {
    return Array(4).fill(this.product.icon);
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private productService: ProductService,
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const found = this.productService.getById(id);
    if (found) {
      this.product = found;
    } else {
      this.router.navigate(['/catalogo']);
    }
  }

  addToCart() {
    this.cartService.addItem(this.product, this.qty, this.selectedColor);
  }

  buyNow() {
    this.addToCart();
    this.router.navigate(['/carrinho']);
  }
}
