import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  searchQuery = '';
  cartCount = 0; // TODO: injetar CartService
  isScrolled = false;

  constructor(private router: Router) {}

  @HostListener('window:scroll')
  onScroll() { this.isScrolled = window.scrollY > 10; }

  onSearch() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/catalogo'], { queryParams: { q: this.searchQuery.trim() } });
    }
  }
}
  