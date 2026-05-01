import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  searchQuery = '';
  cartCount = 0;
  isScrolled = false;

  private sub!: Subscription;

  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit() {
    this.sub = this.cartService.count$.subscribe(c => this.cartCount = c);
  }

  ngOnDestroy() { this.sub.unsubscribe(); }

  @HostListener('window:scroll')
  onScroll() { this.isScrolled = window.scrollY > 10; }

  onSearch() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/catalogo'], { queryParams: { q: this.searchQuery.trim() } });
    }
  }
}
