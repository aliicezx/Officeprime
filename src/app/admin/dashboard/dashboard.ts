import { Component } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Sidebar } from '../shared/sidebar/sidebar';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink, DatePipe, DecimalPipe, Sidebar],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  today = new Date();

  metrics = [
    { label: 'Faturamento Mensal', value: 'R$ 48.320', delta: '↑ 12% vs mês anterior', deltaClass: 'metric-card__delta--up',   icon: '💰', mod: 'metric-card metric-card--accent' },
    { label: 'Pedidos no Mês',     value: '87',         delta: '↑ 8 novos hoje',          deltaClass: 'metric-card__delta--up',   icon: '📦', mod: 'metric-card' },
    { label: 'Produtos Ativos',    value: '312',         delta: '3 adicionados hoje',       deltaClass: 'metric-card__delta--up',   icon: '🪑', mod: 'metric-card metric-card--success' },
    { label: 'Clientes Novos',     value: '24',          delta: '↓ 2% vs semana passada',   deltaClass: 'metric-card__delta--down', icon: '👥', mod: 'metric-card metric-card--warning' },
  ];

  chartData = [
    { month: 'Jan', value: 32400, pct: 67 }, { month: 'Fev', value: 28900, pct: 60 },
    { month: 'Mar', value: 41200, pct: 85 }, { month: 'Abr', value: 38700, pct: 80 },
    { month: 'Mai', value: 45100, pct: 93 }, { month: 'Jun', value: 48320, pct: 100 },
  ];

  stockAlerts = [
    { name: 'Cadeira Flex Mesh',   icon: '🪑', stock: 2 },
    { name: 'Luminária LED Pro',   icon: '💡', stock: 4 },
    { name: 'Mesa Home Office L',  icon: '🪵', stock: 1 },
    { name: 'Poltrona de Espera',  icon: '🛋️', stock: 5 },
  ];

  recentOrders = [
    { id: 104532, client: 'Maria Fernanda', product: 'Cadeira Executiva Pro × 2', value: 2598, status: 'Entregue',   badgeClass: 'badge badge--success', date: 'Hoje, 14:32' },
    { id: 104531, client: 'Carlos Mendes',  product: 'Mesa Gamer Ultrawide × 1',  value: 2450, status: 'Em Trânsito', badgeClass: 'badge badge--info',    date: 'Hoje, 11:05' },
    { id: 104530, client: 'Ana Lima',       product: 'Sofá Corporate 3p × 1',      value: 4200, status: 'Processando', badgeClass: 'badge badge--warning', date: 'Ontem, 18:44' },
    { id: 104529, client: 'João Pereira',   product: 'Armário Deslizante × 1',     value: 1800, status: 'Entregue',   badgeClass: 'badge badge--success', date: 'Ontem, 09:17' },
    { id: 104528, client: 'Bruna Costa',    product: 'Cadeira Diretor Plus × 1',   value: 2100, status: 'Cancelado',  badgeClass: 'badge badge--error',   date: '25/04, 16:30' },
  ];
}

