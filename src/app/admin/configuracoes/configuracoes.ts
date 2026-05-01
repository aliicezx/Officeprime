import { Component } from '@angular/core';
import { Sidebar } from '../shared/sidebar/sidebar';

@Component({
  selector: 'app-configuracoes',
  imports: [Sidebar],
  template: `
    <div class="admin-layout">
      <app-sidebar />
      <div class="admin-content">
        <div class="admin-topbar">
          <span class="admin-topbar__title">Configurações</span>
        </div>
        <div class="admin-main">
          <div class="card card--flat" style="padding:var(--space-10);text-align:center">
            <div style="font-size:48px;margin-bottom:var(--space-4)">⚙️</div>
            <h2 style="margin-bottom:var(--space-2)">Configurações do Sistema</h2>
            <p class="text-muted">Esta seção está em desenvolvimento.</p>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ConfiguracoesComponent {}
