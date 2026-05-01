import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  category: string;
  icon: string;
  price: number;
  oldPrice?: number;
  qty: number;
  color: string;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private items$ = new BehaviorSubject<CartItem[]>([]);

  readonly items = this.items$.asObservable();
  readonly count$ = this.items$.pipe(map(items => items.reduce((s, i) => s + i.qty, 0)));

  get snapshot(): CartItem[] { return this.items$.value; }

  addItem(product: Omit<CartItem, 'qty' | 'color'>, qty = 1, color = 'Preto'): void {
    const current = this.items$.value;
    const existing = current.find(i => i.id === product.id && i.color === color);
    if (existing) {
      this.items$.next(
        current.map(i =>
          i.id === product.id && i.color === color
            ? { ...i, qty: Math.min(i.qty + qty, 10) }
            : i
        )
      );
    } else {
      this.items$.next([...current, { ...product, qty, color }]);
    }
  }

  removeItem(id: number): void {
    this.items$.next(this.items$.value.filter(i => i.id !== id));
  }

  updateQty(id: number, qty: number): void {
    if (qty <= 0) { this.removeItem(id); return; }
    this.items$.next(
      this.items$.value.map(i => i.id === id ? { ...i, qty: Math.min(qty, 10) } : i)
    );
  }

  clearCart(): void { this.items$.next([]); }
}
