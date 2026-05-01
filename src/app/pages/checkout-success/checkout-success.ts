import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-checkout-success',
  imports: [CommonModule, RouterLink],
  templateUrl: './checkout-success.component.html',
  styleUrl: './checkout-success.component.css'
})
export class CheckoutSuccessComponent implements OnInit {
  orderId = Math.floor(Math.random() * 900000 + 100000);
  currentTimelineStep = 0;
  deliveryDate = '';

  timeline = [
    { label: 'Pedido Recebido',      time: 'Agora' },
    { label: 'Pagamento Aprovado',   time: 'Em instantes' },
    { label: 'Separação em Estoque', time: 'Amanhã' },
    { label: 'Enviado',              time: 'Em 2 dias úteis' },
    { label: 'Entregue',             time: 'Em até 7 dias úteis' },
  ];

  ngOnInit() {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    this.deliveryDate = d.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' });
    this.animateTimeline();
  }

  private animateTimeline() {
    let i = 0;
    const interval = setInterval(() => {
      if (i < 2) { this.currentTimelineStep = i; i++; }
      else clearInterval(interval);
    }, 600);
  }
}
