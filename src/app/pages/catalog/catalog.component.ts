import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Product {
  id: number; name: string; category: string; slug: string;
  price: number; oldPrice?: number; discount?: number;
  rating: number; reviews: number; icon: string;
}

@Component({
  selector: 'app-catalog',
  imports: [CommonModule, RouterLink, FormsModule, DecimalPipe],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent implements OnInit {
  searchQuery = '';
  activeCategory = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  minRating: number | null = null;
  sortBy = 'relevance';
  currentPage = 1;
  itemsPerPage = 8;
  wishlist = new Set<number>();

  categories = [
    { name: 'Cadeiras',   slug: 'cadeiras',   count: 128 },
    { name: 'Mesas',      slug: 'mesas',       count: 84  },
    { name: 'Armários',   slug: 'armarios',    count: 56  },
    { name: 'Sofás',      slug: 'sofas',       count: 39  },
    { name: 'Acessórios', slug: 'acessorios',  count: 210 },
    { name: 'Recepção',   slug: 'recepcao',    count: 47  },
  ];

  allProducts: Product[] = [
    { id:1,  name:'Cadeira Executiva Pro',   category:'Cadeiras',  slug:'cadeiras', price:1299, oldPrice:1599, discount:19, rating:4.9, reviews:342, icon:'🪑' },
    { id:2,  name:'Mesa Gamer Ultrawide',    category:'Mesas',     slug:'mesas',    price:2450, oldPrice:2800, discount:12, rating:4.8, reviews:218, icon:'🖥️' },
    { id:3,  name:'Cadeira Flex Mesh',       category:'Cadeiras',  slug:'cadeiras', price:849,  oldPrice:1100, discount:23, rating:4.7, reviews:156, icon:'🪑' },
    { id:4,  name:'Mesa de Reunião 6p',      category:'Mesas',     slug:'mesas',    price:3200, rating:4.9, reviews:89, icon:'🪵' },
    { id:5,  name:'Armário Deslizante 4p',   category:'Armários',  slug:'armarios', price:1800, oldPrice:2100, discount:14, rating:4.6, reviews:74, icon:'🗄️' },
    { id:6,  name:'Sofá Corporate 3p',       category:'Sofás',     slug:'sofas',    price:4200, rating:4.8, reviews:123, icon:'🛋️' },
    { id:7,  name:'Cadeira Diretor Plus',    category:'Cadeiras',  slug:'cadeiras', price:2100, oldPrice:2500, discount:16, rating:5.0, reviews:201, icon:'🪑' },
    { id:8,  name:'Estante Modular Oak',     category:'Armários',  slug:'armarios', price:960,  rating:4.5, reviews:67, icon:'📚' },
    { id:9,  name:'Mesa Home Office L',      category:'Mesas',     slug:'mesas',    price:1350, oldPrice:1600, discount:15, rating:4.7, reviews:98, icon:'🪵' },
    { id:10, name:'Cadeira Gamer RGB',       category:'Cadeiras',  slug:'cadeiras', price:1750, rating:4.6, reviews:445, icon:'🪑' },
    { id:11, name:'Poltrona de Espera',      category:'Sofás',     slug:'sofas',    price:890,  rating:4.4, reviews:55, icon:'🛋️' },
    { id:12, name:'Mesa em L Premium',       category:'Mesas',     slug:'mesas',    price:2890, oldPrice:3200, discount:9, rating:4.9, reviews:134, icon:'🪵' },
    { id:13, name:'Armário Roupeiro Slim',   category:'Armários',  slug:'armarios', price:1200, rating:4.3, reviews:41, icon:'🗄️' },
    { id:14, name:'Cadeira Operacional',     category:'Cadeiras',  slug:'cadeiras', price:549,  rating:4.2, reviews:289, icon:'🪑' },
    { id:15, name:'Mesa Bistro Recepção',    category:'Recepção',  slug:'recepcao', price:780,  rating:4.5, reviews:33, icon:'🏢' },
    { id:16, name:'Luminária de Mesa LED',   category:'Acessórios',slug:'acessorios', price:199, rating:4.8, reviews:512, icon:'💡' },
  ];

  filteredProducts: Product[] = [];
  paginatedProducts: Product[] = [];
  totalPages = 1;
  pageNumbers: number[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchQuery   = params['q']         || '';
      this.activeCategory = params['categoria'] || '';
      this.applyFilters();
    });
  }

  applyFilters() {
    let result = [...this.allProducts];
    if (this.searchQuery)    result = result.filter(p => p.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
    if (this.activeCategory) result = result.filter(p => p.slug === this.activeCategory);
    if (this.minPrice)       result = result.filter(p => p.price >= this.minPrice!);
    if (this.maxPrice)       result = result.filter(p => p.price <= this.maxPrice!);
    if (this.minRating)      result = result.filter(p => p.rating >= this.minRating!);

    if (this.sortBy === 'price-asc')  result.sort((a,b) => a.price - b.price);
    if (this.sortBy === 'price-desc') result.sort((a,b) => b.price - a.price);
    if (this.sortBy === 'rating')     result.sort((a,b) => b.rating - a.rating);

    this.filteredProducts = result;
    this.totalPages = Math.ceil(result.length / this.itemsPerPage);
    this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.currentPage = 1;
    this.paginate();
  }

  paginate() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedProducts = this.filteredProducts.slice(start, start + this.itemsPerPage);
  }

  setPage(p: number) {
    if (p < 1 || p > this.totalPages) return;
    this.currentPage = p;
    this.paginate();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  clearFilters() {
    this.searchQuery = ''; this.activeCategory = '';
    this.minPrice = null;  this.maxPrice = null; this.minRating = null;
    this.sortBy = 'relevance';
    this.applyFilters();
  }

  toggleWishlist(id: number, e: Event) {
    e.stopPropagation();
    this.wishlist.has(id) ? this.wishlist.delete(id) : this.wishlist.add(id);
  }

  addToCart(p: Product, e: Event) {
    e.stopPropagation();
    // TODO: CartService.addItem(p)
  }

  goToProduct(id: number) {
    this.router.navigate(['/produto', id]);
  }
}
