import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { Sidebar } from '../../shared/sidebar/sidebar';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-form',
  imports: [CommonModule, FormsModule, RouterLink, Sidebar],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {
  isEdit = false;
  saving = false;
  productId: number | null = null;
  imagePreview: string | null = null;
  discountPct = 0;

  categories = ['Cadeiras', 'Mesas', 'Armários', 'Sofás', 'Acessórios', 'Recepção'];

  form = {
    name: '', description: '', category: 'Cadeiras',
    price: null as number | null, oldPrice: null as number | null,
    stock: null as number | null, sku: '', weight: null as number | null,
    active: true, featured: false,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit    = true;
      this.productId = Number(id);
      const product  = this.productService.getById(this.productId);
      if (product) {
        this.form = {
          name:        product.name,
          description: product.description ?? '',
          category:    product.category,
          price:       product.price,
          oldPrice:    product.oldPrice ?? null,
          stock:       product.stock    ?? null,
          sku:         product.sku      ?? '',
          weight:      product.weight   ?? null,
          active:      product.active   ?? true,
          featured:    product.featured ?? false,
        };
        this.calcDiscount();
      } else {
        this.router.navigate(['/admin/produtos']);
      }
    }
  }

  calcDiscount() {
    if (this.form.price && this.form.oldPrice && this.form.oldPrice > this.form.price) {
      this.discountPct = Math.round((1 - this.form.price / this.form.oldPrice) * 100);
    } else {
      this.discountPct = 0;
    }
  }

  onImageChange(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { this.imagePreview = reader.result as string; };
    reader.readAsDataURL(file);
  }

  save() {
    this.saving = true;
    setTimeout(() => {
      this.saving = false;
      this.productService.save({
        id:          this.productId ?? undefined,
        name:        this.form.name,
        description: this.form.description,
        category:    this.form.category,
        slug:        this.form.category.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, '-'),
        price:       this.form.price!,
        oldPrice:    this.form.oldPrice ?? undefined,
        stock:       this.form.stock    ?? undefined,
        sku:         this.form.sku,
        weight:      this.form.weight   ?? undefined,
        active:      this.form.active,
        featured:    this.form.featured,
        rating:      0,
        reviews:     0,
        icon:        '📦',
      });
      this.router.navigate(['/admin/produtos']);
    }, 1200);
  }

  cancel() { this.router.navigate(['/admin/produtos']); }
}
