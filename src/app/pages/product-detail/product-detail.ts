import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, RouterLink, FormsModule, DecimalPipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  qty = 1;
  selectedColor = 'Preto';
  activeTab = 'Descrição';
  tabs = ['Descrição', 'Especificações', 'Avaliações'];
  thumbs = ['🪑', '🪑', '🪑', '🪑'];

  colors = [
    { name: 'Preto',    hex: '#1F2937' },
    { name: 'Cinza',    hex: '#9CA3AF' },
    { name: 'Branco',   hex: '#F9FAFB' },
    { name: 'Azul',     hex: '#3A5CA8' },
  ];

  product = {
    id: 1,
    name: 'Cadeira Executiva Pro',
    category: 'Cadeiras',
    icon: '🪑',
    price: 1299,
    oldPrice: 1599,
    discount: 19,
    rating: 4.9,
    reviews: 342,
    description: 'A Cadeira Executiva Pro foi desenvolvida para proporcionar máximo conforto em longas jornadas de trabalho. Com encosto em mesh respirável, apoio lombar ajustável e rodízios silenciosos, ela é a escolha ideal para ambientes corporativos de alto desempenho.',
    specs: [
      { key: 'Peso suportado', value: 'até 120 kg' },
      { key: 'Altura do assento', value: '45–55 cm (ajustável)' },
      { key: 'Material do encosto', value: 'Mesh respirável' },
      { key: 'Base', value: 'Alumínio polido' },
      { key: 'Rodízios', value: 'PU silencioso 360°' },
      { key: 'Garantia', value: '5 anos' },
      { key: 'Dimensões', value: '65 × 65 × 120 cm' },
    ]
  };

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    // TODO: ProductService.getById(id).subscribe(p => this.product = p)
  }

  addToCart() {
    // TODO: CartService.addItem({ ...this.product, qty: this.qty, color: this.selectedColor })
    this.router.navigate(['/carrinho']);
  }

  buyNow() {
    this.addToCart();
  }
}
