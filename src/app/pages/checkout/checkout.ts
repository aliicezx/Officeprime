import { Component } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, RouterLink, FormsModule, DecimalPipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  step = 1;
  placing = false;

  steps = [
    { label: 'Endereço' },
    { label: 'Pagamento' },
    { label: 'Confirmação' },
  ];

  address = { cep: '', street: '', number: '', complement: '', neighborhood: '', city: '', state: '' };
  paymentMethod = 'credit';
  installments = 1;
  card = { number: '', name: '', expiry: '', cvv: '' };

  paymentMethods = [
    { value: 'credit', icon: '💳', label: 'Cartão de Crédito' },
    { value: 'pix',    icon: '📱', label: 'PIX (10% off)' },
    { value: 'boleto', icon: '🧾', label: 'Boleto Bancário' },
  ];

  items = [
    { id: 1, name: 'Cadeira Executiva Pro', icon: '🪑', price: 1299, qty: 1 },
    { id: 2, name: 'Mesa Gamer Ultrawide',  icon: '🖥️', price: 2450, qty: 1 },
  ];

  get subtotal() { return this.items.reduce((s, i) => s + i.price * i.qty, 0); }
  get total()    { return this.paymentMethod === 'pix' ? this.subtotal * 0.9 : this.subtotal; }

  get installmentOptions() {
    return Array.from({ length: 12 }, (_, i) => ({
      value: i + 1,
      label: `${i + 1}x de R$ ${(this.total / (i + 1)).toFixed(2).replace('.', ',')} ${i < 5 ? 'sem juros' : 'com juros'}`
    }));
  }

  constructor(private router: Router) {}

  nextStep() { if (this.step < 3) this.step++; }
  prevStep() { if (this.step > 1) this.step--; }

  async lookupCep() {
    const cep = this.address.cep.replace(/\D/g, '');
    if (cep.length !== 8) return;
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const d = await res.json();
      if (!d.erro) {
        this.address.street       = d.logradouro;
        this.address.neighborhood = d.bairro;
        this.address.city         = d.localidade;
        this.address.state        = d.uf;
      }
    } catch {}
  }

  formatCard(e: Event) {
    const el = e.target as HTMLInputElement;
    el.value = el.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
    this.card.number = el.value;
  }

  formatExpiry(e: Event) {
    const el = e.target as HTMLInputElement;
    let v = el.value.replace(/\D/g, '');
    if (v.length >= 2) v = v.slice(0, 2) + '/' + v.slice(2);
    el.value = v.slice(0, 5);
    this.card.expiry = el.value;
  }

  placeOrder() {
    this.placing = true;
    setTimeout(() => this.router.navigate(['/checkout/sucesso']), 1500);
  }
}
