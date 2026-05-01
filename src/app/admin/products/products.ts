import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../shared/sidebar/sidebar';

interface AdminProduct {
  id: number; name: string; category: string; icon: string;
  price: number; stock: number; active: boolean;
}

@Component({
  selector: 'app-products',
  imports: [CommonModule, RouterLink, FormsModule, DecimalPipe, SidebarComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  searchQuery = '';
  activeTab = 'all';
  sortBy = 'name';
  page = 1;
  perPage = 8;
  selectedIds = new Set<number>();
  showDeleteModal = false;

  tabs = [
    { label: 'Todos',   value: 'all' },
    { label: 'Ativos',  value: 'active' },
    { label: 'Inativos',value: 'inactive' },
    { label: 'Estoque Baixo', value: 'low' },
  ];

  allProducts: AdminProduct[] = [
    { id:1,  name:'Cadeira Executiva Pro',  category:'Cadeiras',  icon:'🪑', price:1299, stock:28, active:true  },
    { id:2,  name:'Mesa Gamer Ultrawide',   category:'Mesas',     icon:'🖥️', price:2450, stock:12, active:true  },
    { id:3,  name:'Cadeira Flex Mesh',      category:'Cadeiras',  icon:'🪑', price:849,  stock:2,  active:true  },
    { id:4,  name:'Mesa de Reunião 6p',     category:'Mesas',     icon:'🪵', price:3200, stock:5,  active:true  },
    { id:5,  name:'Armário Deslizante 4p',  category:'Armários',  icon:'🗄️', price:1800, stock:0,  active:false },
    { id:6,  name:'Sofá Corporate 3p',      category:'Sofás',     icon:'🛋️', price:4200, stock:7,  active:true  },
    { id:7,  name:'Cadeira Diretor Plus',   category:'Cadeiras',  icon:'🪑', price:2100, stock:15, active:true  },
    { id:8,  name:'Estante Modular Oak',    category:'Armários',  icon:'📚', price:960,  stock:3,  active:true  },
    { id:9,  name:'Mesa Home Office L',     category:'Mesas',     icon:'🪵', price:1350, stock:9,  active:true  },
    { id:10, name:'Cadeira Gamer RGB',      category:'Cadeiras',  icon:'🪑', price:1750, stock:20, active:false },
    { id:11, name:'Luminária LED Pro',      category:'Acessórios',icon:'💡', price:199,  stock:1,  active:true  },
    { id:12, name:'Poltrona de Espera',     category:'Sofás',     icon:'🛋️', price:890,  stock:4,  active:true  },
  ];

  filteredProducts: AdminProduct[] = [];
  paginatedProducts: AdminProduct[] = [];
  totalPages = 1;
  pageNumbers: number[] = [];

  ngOnInit() { this.filterProducts(); }

  setTab(v: string) { this.activeTab = v; this.filterProducts(); }

  getCount(v: string) {
    if (v === 'all')      return this.allProducts.length;
    if (v === 'active')   return this.allProducts.filter(p => p.active).length;
    if (v === 'inactive') return this.allProducts.filter(p => !p.active).length;
    if (v === 'low')      return this.allProducts.filter(p => p.stock <= 5).length;
    return 0;
  }

  filterProducts() {
    let r = [...this.allProducts];
    if (this.searchQuery) r = r.filter(p => p.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
    if (this.activeTab === 'active')   r = r.filter(p => p.active);
    if (this.activeTab === 'inactive') r = r.filter(p => !p.active);
    if (this.activeTab === 'low')      r = r.filter(p => p.stock <= 5);
    if (this.sortBy === 'name')       r.sort((a,b) => a.name.localeCompare(b.name));
    if (this.sortBy === 'price-desc') r.sort((a,b) => b.price - a.price);
    if (this.sortBy === 'stock')      r.sort((a,b) => a.stock - b.stock);
    this.filteredProducts = r;
    this.totalPages = Math.ceil(r.length / this.perPage);
    this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.page = 1;
    this.paginate();
  }

  paginate() {
    const s = (this.page - 1) * this.perPage;
    this.paginatedProducts = this.filteredProducts.slice(s, s + this.perPage);
  }

  setPage(n: number) { this.page = n; this.paginate(); }

  toggleAll(e: Event) {
    const checked = (e.target as HTMLInputElement).checked;
    this.selectedIds = checked ? new Set(this.paginatedProducts.map(p => p.id)) : new Set();
  }

  toggleSelect(id: number) {
    this.selectedIds.has(id) ? this.selectedIds.delete(id) : this.selectedIds.add(id);
    this.selectedIds = new Set(this.selectedIds); // trigger change detection
  }

  toggleStatus(p: AdminProduct) { p.active = !p.active; }

  deleteSelected() {
    this.allProducts = this.allProducts.filter(p => !this.selectedIds.has(p.id));
    this.selectedIds.clear();
    this.showDeleteModal = false;
    this.filterProducts();
  }
}
