import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CartService, CartItem } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterLink, FormsModule, DecimalPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit, OnDestroy {
  items: CartItem[] = [];
  couponCode = '';
  couponApplied = false;
  couponError = '';
  discountRate = 0;

  private sub!: Subscription;
  private coupons: Record<string, number> = { OFFICE10: 0.10, PRIME20: 0.20 };

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.sub = this.cartService.items.subscribe(items => this.items = items);
  }

  ngOnDestroy() { this.sub.unsubscribe(); }

  get frete()    { return this.subtotal >= 500 ? 0 : 49.90; }
  get subtotal() { return this.items.reduce((s, i) => s + i.price * i.qty, 0); }
  get discount() { return this.subtotal * this.discountRate; }
  get total()    { return this.subtotal - this.discount + this.frete; }

  increaseQty(item: CartItem) { this.cartService.updateQty(item.id, item.qty + 1); }
  decreaseQty(item: CartItem) { this.cartService.updateQty(item.id, item.qty - 1); }
  removeItem(id: number)      { this.cartService.removeItem(id); }

  applyCoupon() {
    const code = this.couponCode.toUpperCase().trim();
    this.couponError   = '';
    this.couponApplied = false;
    if (this.coupons[code]) {
      this.discountRate  = this.coupons[code];
      this.couponApplied = true;
    } else {
      this.couponError = 'Cupom inválido ou expirado.';
    }
  }
}
