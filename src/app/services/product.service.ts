import { Injectable } from '@angular/core';

export interface ProductSpec { key: string; value: string; }

export interface Product {
  id: number;
  name: string;
  category: string;
  slug: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  icon: string;
  description?: string;
  specs?: ProductSpec[];
  stock?: number;
  sku?: string;
  weight?: number;
  active?: boolean;
  featured?: boolean;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private products: Product[] = [
    {
      id: 1, name: 'Cadeira Executiva Pro', category: 'Cadeiras', slug: 'cadeiras',
      price: 1299, oldPrice: 1599, discount: 19, rating: 4.9, reviews: 342,
      icon: '/images/produtos/cadeira-executiva-pro.svg',
      description: 'A Cadeira Executiva Pro foi desenvolvida para proporcionar máximo conforto em longas jornadas de trabalho. Com encosto em mesh respirável, apoio lombar ajustável e rodízios silenciosos, ela é a escolha ideal para ambientes corporativos de alto desempenho.',
      specs: [
        { key: 'Peso suportado', value: 'até 120 kg' },
        { key: 'Altura do assento', value: '45–55 cm (ajustável)' },
        { key: 'Material do encosto', value: 'Mesh respirável' },
        { key: 'Base', value: 'Alumínio polido' },
        { key: 'Rodízios', value: 'PU silencioso 360°' },
        { key: 'Garantia', value: '5 anos' },
        { key: 'Dimensões', value: '65 × 65 × 120 cm' },
      ],
      stock: 28, sku: 'OP-001', weight: 18, active: true, featured: true,
    },
    {
      id: 2, name: 'Mesa Gamer Ultrawide', category: 'Mesas', slug: 'mesas',
      price: 2450, oldPrice: 2800, discount: 12, rating: 4.8, reviews: 218,
      icon: '/images/produtos/mesa-gamer-ultrawide.svg',
      description: 'Mesa gamer de grande porte com suporte para monitor ultrawide, gestão de cabos integrada e acabamento em MDF de alta resistência. Ideal para setups profissionais e gaming.',
      specs: [
        { key: 'Dimensões', value: '180 × 80 × 75 cm' },
        { key: 'Material', value: 'MDF 25mm + aço' },
        { key: 'Suporte monitor', value: 'Até 49" ultrawide' },
        { key: 'Gestão de cabos', value: 'Passagem integrada' },
        { key: 'Capacidade', value: 'até 80 kg' },
        { key: 'Garantia', value: '3 anos' },
      ],
      stock: 15, sku: 'OP-002', weight: 42, active: true, featured: true,
    },
    {
      id: 3, name: 'Cadeira Flex Mesh', category: 'Cadeiras', slug: 'cadeiras',
      price: 849, oldPrice: 1100, discount: 23, rating: 4.7, reviews: 156,
      icon: '/images/produtos/cadeira-flex-mesh.svg',
      description: 'A Cadeira Flex Mesh combina ergonomia e leveza com seu encosto em tela respirável de alta densidade. Perfeita para ambientes de trabalho com longas horas de uso.',
      specs: [
        { key: 'Peso suportado', value: 'até 110 kg' },
        { key: 'Altura do assento', value: '43–53 cm (ajustável)' },
        { key: 'Material do encosto', value: 'Mesh alta densidade' },
        { key: 'Apoio de braço', value: '2D ajustável' },
        { key: 'Rodízios', value: 'Nylon 360°' },
        { key: 'Garantia', value: '2 anos' },
        { key: 'Dimensões', value: '60 × 60 × 110 cm' },
      ],
      stock: 2, sku: 'OP-003', weight: 14, active: true, featured: true,
    },
    {
      id: 4, name: 'Mesa de Reunião 6p', category: 'Mesas', slug: 'mesas',
      price: 3200, rating: 4.9, reviews: 89,
      icon: '/images/produtos/mesa-reuniao-6p.svg',
      description: 'Mesa oval para salas de reunião, comporta até 6 pessoas com conforto. Tampa em vidro temperado com base em aço inox escovado.',
      specs: [
        { key: 'Dimensões', value: '200 × 100 × 75 cm' },
        { key: 'Material', value: 'Vidro temperado 10mm' },
        { key: 'Base', value: 'Aço inox escovado' },
        { key: 'Capacidade', value: '6 pessoas' },
        { key: 'Garantia', value: '3 anos' },
      ],
      stock: 8, sku: 'OP-004', weight: 60, active: true, featured: true,
    },
    {
      id: 5, name: 'Armário Deslizante 4p', category: 'Armários', slug: 'armarios',
      price: 1800, oldPrice: 2100, discount: 14, rating: 4.6, reviews: 74,
      icon: '/images/produtos/armario-deslizante.svg',
      description: 'Armário de escritório com portas deslizantes, 4 prateleiras internas reguláveis e sistema de trilho silencioso. Maximiza o espaço sem ocupar área de abertura.',
      specs: [
        { key: 'Dimensões', value: '120 × 45 × 180 cm' },
        { key: 'Material', value: 'MDF 18mm' },
        { key: 'Prateleiras', value: '4 reguláveis' },
        { key: 'Sistema de portas', value: 'Trilho deslizante silencioso' },
        { key: 'Garantia', value: '2 anos' },
      ],
      stock: 12, sku: 'OP-005', weight: 55, active: true, featured: true,
    },
    {
      id: 6, name: 'Sofá Corporate 3p', category: 'Sofás', slug: 'sofas',
      price: 4200, rating: 4.8, reviews: 123,
      icon: '/images/produtos/sofa-corporate-3p.svg',
      description: 'Sofá corporativo de 3 lugares com estrutura em madeira maciça e estofamento em couro ecológico premium. Ideal para salas de espera e espaços de convivência.',
      specs: [
        { key: 'Dimensões', value: '210 × 80 × 90 cm' },
        { key: 'Material', value: 'Couro ecológico + madeira maciça' },
        { key: 'Lugares', value: '3 pessoas' },
        { key: 'Densidade espuma', value: '28 kg/m³' },
        { key: 'Garantia', value: '3 anos' },
      ],
      stock: 5, sku: 'OP-006', weight: 70, active: true, featured: true,
    },
    {
      id: 7, name: 'Cadeira Diretor Plus', category: 'Cadeiras', slug: 'cadeiras',
      price: 2100, oldPrice: 2500, discount: 16, rating: 5.0, reviews: 201,
      icon: '/images/produtos/cadeira-diretor-plus.svg',
      description: 'A Cadeira Diretor Plus é o topo de linha para ambientes executivos. Estofamento em couro legítimo, apoio de cabeça regulável e base em alumínio polido de 5 pontas.',
      specs: [
        { key: 'Peso suportado', value: 'até 130 kg' },
        { key: 'Altura do assento', value: '46–56 cm (ajustável)' },
        { key: 'Material', value: 'Couro legítimo' },
        { key: 'Base', value: 'Alumínio polido 5 pontas' },
        { key: 'Apoio de cabeça', value: 'Regulável 3D' },
        { key: 'Garantia', value: '5 anos' },
        { key: 'Dimensões', value: '68 × 68 × 130 cm' },
      ],
      stock: 18, sku: 'OP-007', weight: 22, active: true, featured: true,
    },
    {
      id: 8, name: 'Estante Modular Oak', category: 'Armários', slug: 'armarios',
      price: 960, rating: 4.5, reviews: 67,
      icon: '/images/produtos/estante-modular.svg',
      description: 'Estante modular em MDF com acabamento amadeirado. Sistema de encaixe simples permite diversas configurações. Ideal para escritórios e home offices.',
      specs: [
        { key: 'Dimensões', value: '90 × 30 × 180 cm' },
        { key: 'Material', value: 'MDF 18mm' },
        { key: 'Prateleiras', value: '5 fixas' },
        { key: 'Capacidade por prateleira', value: '20 kg' },
        { key: 'Garantia', value: '1 ano' },
      ],
      stock: 22, sku: 'OP-008', weight: 35, active: true, featured: false,
    },
    {
      id: 9, name: 'Mesa Home Office L', category: 'Mesas', slug: 'mesas',
      price: 1350, oldPrice: 1600, discount: 15, rating: 4.7, reviews: 98,
      icon: '🪵',
      description: 'Mesa em formato L para home office, otimiza o espaço do canto e oferece ampla área de trabalho. Estrutura robusta em MDF com pés reguláveis.',
      specs: [
        { key: 'Dimensões', value: '150 × 120 × 75 cm' },
        { key: 'Material', value: 'MDF 18mm' },
        { key: 'Pés', value: 'Metal regulável' },
        { key: 'Garantia', value: '2 anos' },
      ],
      stock: 10, sku: 'OP-009', weight: 38, active: true, featured: false,
    },
    {
      id: 10, name: 'Cadeira Gamer RGB', category: 'Cadeiras', slug: 'cadeiras',
      price: 1750, rating: 4.6, reviews: 445,
      icon: '🪑',
      description: 'Cadeira gamer com iluminação RGB integrada, encosto reclinável até 180°, apoio lombar e cervical removíveis. Design arrojado para setups modernos.',
      specs: [
        { key: 'Peso suportado', value: 'até 150 kg' },
        { key: 'Reclinação', value: 'até 180°' },
        { key: 'Iluminação', value: 'RGB 16 cores' },
        { key: 'Apoio lombar', value: 'Almofada removível' },
        { key: 'Garantia', value: '2 anos' },
      ],
      stock: 30, sku: 'OP-010', weight: 20, active: true, featured: false,
    },
    {
      id: 11, name: 'Poltrona de Espera', category: 'Sofás', slug: 'sofas',
      price: 890, rating: 4.4, reviews: 55,
      icon: '🛋️',
      description: 'Poltrona elegante para salas de espera e recepções. Estofamento em courino de fácil limpeza, estrutura em aço cromado.',
      specs: [
        { key: 'Dimensões', value: '70 × 70 × 80 cm' },
        { key: 'Material', value: 'Courino + aço cromado' },
        { key: 'Capacidade', value: '1 pessoa' },
        { key: 'Garantia', value: '1 ano' },
      ],
      stock: 20, sku: 'OP-011', weight: 12, active: true, featured: false,
    },
    {
      id: 12, name: 'Mesa em L Premium', category: 'Mesas', slug: 'mesas',
      price: 2890, oldPrice: 3200, discount: 9, rating: 4.9, reviews: 134,
      icon: '🪵',
      description: 'Mesa em L premium com tampo em vidro temperado e estrutura em aço carbono. Design sofisticado para escritórios executivos.',
      specs: [
        { key: 'Dimensões', value: '160 × 140 × 75 cm' },
        { key: 'Material', value: 'Vidro 8mm + aço carbono' },
        { key: 'Capacidade', value: 'até 60 kg' },
        { key: 'Garantia', value: '3 anos' },
      ],
      stock: 7, sku: 'OP-012', weight: 50, active: true, featured: false,
    },
    {
      id: 13, name: 'Armário Roupeiro Slim', category: 'Armários', slug: 'armarios',
      price: 1200, rating: 4.3, reviews: 41,
      icon: '🗄️',
      description: 'Armário roupeiro slim para vestiários e ambientes com espaço reduzido. 2 portas com fechadura e cabideiro interno.',
      specs: [
        { key: 'Dimensões', value: '60 × 45 × 180 cm' },
        { key: 'Material', value: 'Chapa de aço' },
        { key: 'Portas', value: '2 com fechadura' },
        { key: 'Garantia', value: '1 ano' },
      ],
      stock: 14, sku: 'OP-013', weight: 28, active: true, featured: false,
    },
    {
      id: 14, name: 'Cadeira Operacional', category: 'Cadeiras', slug: 'cadeiras',
      price: 549, rating: 4.2, reviews: 289,
      icon: '🪑',
      description: 'Cadeira operacional econômica para uso intenso. Assento e encosto estofados, base em nylon com rodízios universais.',
      specs: [
        { key: 'Peso suportado', value: 'até 100 kg' },
        { key: 'Altura do assento', value: '42–52 cm (ajustável)' },
        { key: 'Rodízios', value: 'Nylon universal' },
        { key: 'Garantia', value: '1 ano' },
      ],
      stock: 50, sku: 'OP-014', weight: 10, active: true, featured: false,
    },
    {
      id: 15, name: 'Mesa Bistro Recepção', category: 'Recepção', slug: 'recepcao',
      price: 780, rating: 4.5, reviews: 33,
      icon: '🏢',
      description: 'Mesa bistro para áreas de recepção e espera. Tampo redondo em MDF com base metálica, ideal para ambientes modernos.',
      specs: [
        { key: 'Diâmetro', value: '70 cm' },
        { key: 'Altura', value: '75 cm' },
        { key: 'Material', value: 'MDF + metal' },
        { key: 'Garantia', value: '1 ano' },
      ],
      stock: 16, sku: 'OP-015', weight: 12, active: true, featured: false,
    },
    {
      id: 16, name: 'Luminária de Mesa LED', category: 'Acessórios', slug: 'acessorios',
      price: 199, rating: 4.8, reviews: 512,
      icon: '💡',
      description: 'Luminária LED de mesa com intensidade e temperatura de cor ajustáveis. Porta USB para carregamento de dispositivos e braço articulado.',
      specs: [
        { key: 'Potência', value: '12W LED' },
        { key: 'Temperatura', value: '2700K–6500K (ajustável)' },
        { key: 'Porta USB', value: 'USB-A 5V/1A' },
        { key: 'Braço', value: 'Articulado 360°' },
        { key: 'Garantia', value: '1 ano' },
      ],
      stock: 80, sku: 'OP-016', weight: 1, active: true, featured: false,
    },
  ];

  getAll(): Product[] { return [...this.products]; }

  getById(id: number): Product | null {
    return this.products.find(p => p.id === id) ?? null;
  }

  save(data: Partial<Product> & { id?: number }): void {
    if (data.id) {
      const idx = this.products.findIndex(p => p.id === data.id);
      if (idx >= 0) this.products[idx] = { ...this.products[idx], ...data };
    } else {
      const newId = Math.max(0, ...this.products.map(p => p.id)) + 1;
      this.products.push({ ...data, id: newId } as Product);
    }
  }
}
