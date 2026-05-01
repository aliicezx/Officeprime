import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { SidebarComponent } from '../../shared/sidebar/sidebar';

@Component({
  selector: 'app-product-form',
  imports: [CommonModule, FormsModule, RouterLink, SidebarComponent],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {
  isEdit = false;
  saving = false;
  imagePreview: string | null = null;
  discountPct = 0;

  categories = ['Cadeiras', 'Mesas', 'Armários', 'Sofás', 'Acessórios', 'Recepção'];

  form = {
    name: '', description: '', category: 'Cadeiras',
    price: null as number | null, oldPrice: null as number | null,
    stock: null as number | null, sku: '', weight: null as number | null,
    active: true, featured: false,
  };

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      // TODO: ProductService.getById(id).subscribe(p => this.form = { ...p })
      this.form = {
        name: 'Cadeira Executiva Pro', description: 'Cadeira de alto desempenho para uso corporativo.',
        category: 'Cadeiras', price: 1299, oldPrice: 1599,
        stock: 28, sku: 'OP-001', weight: 18,
        active: true, featured: true,
      };
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
      // TODO: ProductService.save(this.form)
      this.router.navigate(['/admin/produtos']);
    }, 1200);
  }

  cancel() { this.router.navigate(['/admin/produtos']); }
}
