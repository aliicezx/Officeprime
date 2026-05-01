import { Component } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

interface Product {
  id: number; name: string; category: string;
  price: number; oldPrice?: number; discount?: number;
  rating: number; reviews: number; icon: string;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, DecimalPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  wishlist = new Set<number>();

  stats = [
    { value: '+12.000', label: 'Clientes Satisfeitos' },
    { value: '+500',    label: 'Produtos no Catálogo' },
    { value: '4.9★',   label: 'Avaliação Média' },
    { value: '7 dias', label: 'Entrega Rápida' },
  ];

  categories = [
    { name: 'Cadeiras',   icon: '🪑', count: 128, slug: 'cadeiras' },
    { name: 'Mesas',      icon: '🪵', count: 84,  slug: 'mesas' },
    { name: 'Armários',   icon: '🗄️', count: 56,  slug: 'armarios' },
    { name: 'Sofás',      icon: '🛋️', count: 39,  slug: 'sofas' },
    { name: 'Acessórios', icon: '💡', count: 210, slug: 'acessorios' },
    { name: 'Recepção',   icon: '🏢', count: 47,  slug: 'recepcao' },
  ];

  featuredProducts: Product[] = [
    { id: 1, name: 'Cadeira Executiva Pro', category: 'Cadeiras', price: 1299, oldPrice: 1599, discount: 19, rating: 4.9, reviews: 342, icon: '🪑' },
    { id: 2, name: 'Mesa Gamer Ultrawide', category: 'Mesas',     price: 2450, oldPrice: 2800, discount: 12, rating: 4.8, reviews: 218, icon: '🖥️' },
    { id: 3, name: 'Cadeira Flex Mesh',    category: 'Cadeiras',  price: 849,  oldPrice: 1100, discount: 23, rating: 4.7, reviews: 156, icon: '🪑' },
    { id: 4, name: 'Mesa de Reunião 6p',   category: 'Mesas',     price: 3200, rating: 4.9, reviews: 89, icon: '🪵' },
    { id: 5, name: 'Armário Deslizante',   category: 'Armários',  price: 1800, oldPrice: 2100, discount: 14, rating: 4.6, reviews: 74, icon: '🗄️' },
    { id: 6, name: 'Sofá Corporate 3p',    category: 'Sofás',     price: 4200, rating: 4.8, reviews: 123, icon: '🛋️' },
    { id: 7, name: 'Cadeira Diretor Plus', category: 'Cadeiras',  price: 2100, oldPrice: 2500, discount: 16, rating: 5.0, reviews: 201, icon: '🪑' },
    { id: 8, name: 'Estante Modular',      category: 'Armários',  price: 960,  rating: 4.5, reviews: 67, icon: '📚' },
  ];

  benefits = [
    { icon: '🚚', title: 'Frete Grátis',        desc: 'Em compras acima de R$ 500 para todo o Brasil.' },
    { icon: '🔄', title: '30 Dias para Troca',   desc: 'Não gostou? Trocamos sem burocracia.' },
    { icon: '🛡️', title: 'Garantia de 5 Anos',  desc: 'Cobertura completa em todos os produtos.' },
    { icon: '💳', title: 'Até 12x sem juros',    desc: 'Parcelamento facilitado em todos os cartões.' },
  ];

  constructor(private router: Router) {}

  goToProduct(id: number) {
    this.router.navigate(['/produto', id]);
  }

  toggleWishlist(id: number, e: Event) {
    e.stopPropagation();
    this.wishlist.has(id) ? this.wishlist.delete(id) : this.wishlist.add(id);
  }

  addToCart(p: Product, e: Event) {
    e.stopPropagation();
    // TODO: injetar CartService e chamar addItem(p)
    console.log('Adicionado ao carrinho:', p.name);
  }
}
