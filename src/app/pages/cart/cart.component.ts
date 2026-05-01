import { Component } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface CartItem {
  id: number; name: string; category: string; icon: string;
  price: number; oldPrice?: number; qty: number; color: string;
}

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterLink, FormsModule, DecimalPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  couponCode = '';
  couponApplied = false;
  couponError = '';
  discountRate = 0;
  frete = 0;

  items: CartItem[] = [
    { id:1, name:'Cadeira Executiva Pro', category:'Cadeiras', icon:'🪑', price:1299, oldPrice:1599, qty:1, color:'Preto' },
    { id:2, name:'Mesa Gamer Ultrawide',  category:'Mesas',    icon:'🖥️', price:2450, qty:1, color:'Carvalho' },
  ];

  private coupons: Record<string, number> = { OFFICE10: 0.10, PRIME20: 0.20 };

  get totalItems() { return this.items.reduce((s, i) => s + i.qty, 0); }
  get subtotal()   { return this.items.reduce((s, i) => s + i.price * i.qty, 0); }
  get discount()   { return this.subtotal * this.discountRate; }
  get total()      { return this.subtotal - this.discount + this.frete; }

  increaseQty(item: CartItem) { if (item.qty < 10) item.qty++; }
  decreaseQty(item: CartItem) { item.qty > 1 ? item.qty-- : this.removeItem(item.id); }
  removeItem(id: number)      { this.items = this.items.filter(i => i.id !== id); }

  applyCoupon() {
    const code = this.couponCode.toUpperCase().trim();
    this.couponError = '';
    this.couponApplied = false;
    if (this.coupons[code]) {
      this.discountRate = this.coupons[code];
      this.couponApplied = true;
    } else {
      this.couponError = 'Cupom inválido ou expirado.';
    }
  }
}
