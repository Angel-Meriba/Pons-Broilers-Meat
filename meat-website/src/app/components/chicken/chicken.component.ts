import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from '../../services/cart.service';

interface ChickenProduct {
  id: string;
  name: string;
  description: string;
  image: string;
  variants: {
    weight: string;
    price: number;
  }[];
  category: string;
  quantity: number;
  selectedVariant?: {
    weight: string;
    price: number;
  };
}

@Component({
  selector: 'app-chicken',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container my-5">
      <h1 class="section-title">Fresh Chicken</h1>
      
      <!-- Categories -->
      <div class="category-tabs">
        <button 
          *ngFor="let cat of categories" 
          class="category-btn"
          [class.active]="selectedCategory === cat"
          (click)="selectedCategory = cat">
          {{ cat }}
        </button>
      </div>

      <div class="product-grid">
        <div class="product-item" *ngFor="let product of filteredProducts">
          <div class="product-card">
            <div class="img-wrapper">
              <img [src]="product.image" [alt]="product.name">
              <div class="discount-tag" *ngIf="product.category === 'Special Cuts'">SPECIAL</div>
            </div>
            <div class="card-body">
              <h3>{{ product.name }}</h3>
              <p>{{ product.description }}</p>
              <div class="weight-options">
                <div class="option" *ngFor="let variant of product.variants">
                  <div class="price-row">
                    <div class="weight-price-info">
                      <div class="weight-info">
                        <span class="weight">{{ variant.weight }}</span>
                      </div>
                      <div class="price-info">
                        <span class="price">₹{{ variant.price }}</span>
                      </div>
                    </div>
                    <div class="quantity-control">
                      <div class="delivery-info">
                        <i class="bi bi-lightning-fill"></i>
                        Today in 90 mins
                      </div>
                      <div class="controls" *ngIf="product.quantity === 0 || (product.selectedVariant !== variant)">
                        <button class="btn-add" (click)="addToCart(product, variant)">
                          ADD
                          <span class="plus-icon">+</span>
                        </button>
                      </div>
                      <div class="controls quantity-buttons" *ngIf="product.quantity > 0 && product.selectedVariant === variant">
                        <button (click)="decreaseQuantity(product)">−</button>
                        <span class="quantity">{{ product.quantity }}</span>
                        <button (click)="increaseQuantity(product, variant)">+</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .section-title {
      color: #1a1a1a;
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 24px;
      text-align: center;
    }

    .category-tabs {
      display: flex;
      gap: 12px;
      overflow-x: auto;
      padding-bottom: 16px;
      margin-bottom: 24px;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      justify-content: center;
    }

    .category-tabs::-webkit-scrollbar {
      display: none;
    }

    .category-btn {
      padding: 8px 16px;
      border: 1px solid #e0e0e0;
      border-radius: 24px;
      background: white;
      color: #666;
      font-size: 14px;
      font-weight: 500;
      white-space: nowrap;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .category-btn.active {
      background: #E31837;
      color: white;
      border-color: #E31837;
    }

    .category-btn:hover:not(.active) {
      border-color: #E31837;
      color: #E31837;
    }

    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 24px;
      padding: 0 16px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .product-item {
      display: flex;
      height: 100%;
    }

    .product-card {
      display: flex;
      flex-direction: column;
      width: 100%;
      background: white;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid #f0f0f0;
      transition: all 0.3s ease;
      padding: 12px;
    }

    .product-card:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transform: translateY(-2px);
    }

    .img-wrapper {
      position: relative;
      width: 100%;
      padding-top: 100%;
      border-radius: 8px;
      overflow: hidden;
      background: #f8f8f8;
    }

    .img-wrapper img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .card-body {
      padding: 12px 0;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    }

    .card-body h3 {
      font-size: 16px;
      font-weight: 600;
      color: #1a1a1a;
      margin: 0 0 8px;
      line-height: 1.3;
    }

    .card-body p {
      font-size: 14px;
      color: #666;
      margin: 0 0 12px;
      line-height: 1.4;
    }

    .weight-options {
      margin-top: auto;
    }

    .option {
      margin-bottom: 8px;
    }

    .option:last-child {
      margin-bottom: 0;
    }

    .price-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
    }

    .weight-price-info {
      flex: 1;
    }

    .weight-info {
      margin-bottom: 4px;
    }

    .weight {
      font-size: 14px;
      color: #666;
      font-weight: 500;
    }

    .price {
      font-size: 16px;
      font-weight: 600;
      color: #1a1a1a;
    }

    .delivery-info {
      font-size: 12px;
      color: #00a642;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .delivery-info i {
      font-size: 14px;
    }

    .quantity-control {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }

    .controls {
      min-width: 80px;
    }

    .quantity-buttons {
      display: flex;
      align-items: center;
      gap: 8px;
      background: #f8f8f8;
      border-radius: 4px;
      padding: 4px;
    }

    .quantity-buttons button {
      width: 24px;
      height: 24px;
      border: none;
      background: #E31837;
      color: white;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
    }

    .quantity {
      font-size: 14px;
      font-weight: 500;
      color: #1a1a1a;
      min-width: 24px;
      text-align: center;
    }

    .discount-tag {
      position: absolute;
      top: 8px;
      left: 8px;
      background: #E31837;
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
      z-index: 2;
    }

    @media (max-width: 768px) {
      .product-grid {
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        gap: 16px;
        padding: 0 12px;
      }

      .card-body h3 {
        font-size: 14px;
      }

      .card-body p {
        font-size: 12px;
      }

      .weight {
        font-size: 12px;
      }

      .price {
        font-size: 14px;
      }

      .controls {
        min-width: 70px;
      }
    }
  `]
})
export class ChickenComponent {
  selectedCategory = 'All';

  categories = [
    'All',
    'Curry Cut',
    'Boneless',
    'Special Cuts',
    'Grill/Tandoori',
    'Offal'
  ];

  products: ChickenProduct[] = [
    {
      id: 'CC001',
      name: 'Chicken Curry Cut with Skin',
      description: 'Traditional curry cut pieces with skin, perfect for curries and biryanis',
      image: 'assets/images/cws.jpeg',
      variants: [
        { weight: '1 kg', price: 170 },
        { weight: '500 g', price: 85 }
      ],
      category: 'Curry Cut',
      quantity: 0
    },
    {
      id: 'CC002',
      name: 'Chicken Curry Cut without Skin',
      description: 'Skinless curry cut pieces, ideal for healthier preparations',
      image: 'assets/images/cwos.png',
      variants: [
        { weight: '1 kg', price: 220 },
        { weight: '500 g', price: 110 }
      ],
      category: 'Curry Cut',
      quantity: 0
    },
    {
      id: 'BL001',
      name: 'Chicken Boneless Curry Cut',
      description: 'Boneless pieces perfect for quick cooking and curries',
      image: 'assets/images/cbbl.webp',
      variants: [
        { weight: '1 kg', price: 350 },
        { weight: '500 g', price: 175 }
      ],
      category: 'Boneless',
      quantity: 0
    },
    {
      id: 'BL002',
      name: 'Chicken Breast Boneless',
      description: 'Premium chicken breast cuts, ideal for grilling and high-protein meals',
      image: 'assets/images/cbl.jpg',
      variants: [
        { weight: '1 kg', price: 350 },
        { weight: '500 g', price: 175 }
      ],
      category: 'Boneless',
      quantity: 0
    },
    {
      id: 'SP001',
      name: 'Chicken Wings with Skin',
      description: 'Juicy wings perfect for frying or grilling',
      image: 'assets/images/cw.jpg',
      variants: [
        { weight: '500 g', price: 100 }
      ],
      category: 'Special Cuts',
      quantity: 0
    },
    {
      id: 'SP002',
      name: 'Chicken Lollipop without Skin',
      description: 'Ready-to-cook lollipops, great for starters',
      image: 'assets/images/cl.png',
      variants: [
        { weight: '500 g', price: 125 }
      ],
      category: 'Special Cuts',
      quantity: 0
    },
    {
      id: 'SP003',
      name: 'Chicken Drumstick with Skin',
      description: 'Juicy drumsticks, perfect for grilling and frying',
      image: 'assets/images/cd.jpg',
      variants: [
        { weight: '500 g', price: 125 }
      ],
      category: 'Special Cuts',
      quantity: 0
    },
    {
      id: 'GR001',
      name: 'Chicken Grill/Tandoori Pack with Skin',
      description: 'Whole bird with skin, perfect for grilling or tandoori',
      image: 'assets/images/t1.jpg',
      variants: [
        { weight: 'Whole Bird', price: 220 }
      ],
      category: 'Grill/Tandoori',
      quantity: 0
    },
    {
      id: 'GR002',
      name: 'Chicken Grill/Tandoori Pack without Skin',
      description: 'Skinless whole bird for healthier grilling options',
      image: 'assets/images/t2.jfif',
      variants: [
        { weight: 'Whole Bird', price: 250 }
      ],
      category: 'Grill/Tandoori',
      quantity: 0
    },
    {
      id: 'OF001',
      name: 'Chicken Liver',
      description: 'Fresh chicken liver, rich in nutrients',
      image: 'assets/images/cli.jpg',
      variants: [
        { weight: '1 kg', price: 200 },
        { weight: '500 g', price: 100 }
      ],
      category: 'Offal',
      quantity: 0
    },
    {
      id: 'OF002',
      name: 'Chicken Gizzard',
      description: 'Clean chicken gizzard, ready to cook',
      image: 'assets/images/cg.jpg',
      variants: [
        { weight: '1 kg', price: 200 },
        { weight: '500 g', price: 100 }
      ],
      category: 'Offal',
      quantity: 0
    },
    {
      id: 'SP004',
      name: 'Chicken Kothu Curry',
      description: 'Special cut pieces for kothu preparations',
      image: 'assets/images/ck.webp',
      variants: [
        { weight: '1 kg', price: 350 },
        { weight: '500 g', price: 175 }
      ],
      category: 'Special Cuts',
      quantity: 0
    },
    {
      id: 'SP005',
      name: 'Chicken Bone',
      description: 'Chicken bones for making stock and soups',
      image: 'assets/images/cb.webp',
      variants: [
        { weight: '1 kg', price: 70 }
      ],
      category: 'Special Cuts',
      quantity: 0
    }
  ];

  constructor(private cartService: CartService) {}

  get filteredProducts() {
    if (this.selectedCategory === 'All') {
      return this.products;
    }
    return this.products.filter(product => product.category === this.selectedCategory);
  }

  addToCart(product: ChickenProduct, variant: { weight: string; price: number }) {
    product.quantity = 1;
    product.selectedVariant = variant;
    
    const cartItem: CartItem = {
      id: `${product.id}-${variant.weight}`,
      name: product.name,
      image: product.image,
      weight: variant.weight,
      price: variant.price,
      quantity: 1
    };

    this.cartService.addToCart(cartItem);
  }

  increaseQuantity(product: ChickenProduct, variant: { weight: string; price: number }) {
    product.quantity++;
    
    const cartItem: CartItem = {
      id: `${product.id}-${variant.weight}`,
      name: product.name,
      image: product.image,
      weight: variant.weight,
      price: variant.price,
      quantity: product.quantity
    };

    this.cartService.addToCart(cartItem);
  }

  decreaseQuantity(product: ChickenProduct) {
    if (product.quantity > 0) {
      product.quantity--;
      if (product.quantity === 0) {
        product.selectedVariant = undefined;
      }
      if (product.selectedVariant) {
        const cartItem: CartItem = {
          id: `${product.id}-${product.selectedVariant.weight}`,
          name: product.name,
          image: product.image,
          weight: product.selectedVariant.weight,
          price: product.selectedVariant.price,
          quantity: product.quantity
        };
        this.cartService.addToCart(cartItem);
      }
    }
  }
}