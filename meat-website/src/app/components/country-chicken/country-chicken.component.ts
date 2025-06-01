import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from '../../services/cart.service';

interface CountryChickenProduct {
  id: string;
  name: string;
  description: string;
  image: string;
  variants: {
    weight: string;
    price: number;
  }[];
  quantity: number;
  selectedVariant?: {
    weight: string;
    price: number;
  };
}

@Component({
  selector: 'app-country-chicken',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container my-5">
      <h1 class="section-title">Country Chicken</h1>
      
      <div class="product-grid">
        <div class="product-item" *ngFor="let product of products">
          <div class="product-card">
            <div class="img-wrapper">
              <img [src]="product.image" [alt]="product.name">
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
                        Today in 120 mins
                      </div>
                      <div class="controls" *ngIf="product.quantity === 0 || (product.selectedVariant !== variant)">
                        <button class="add-btn" (click)="addToCart(product, variant)">
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

    .add-btn {
      width: 100%;
      background: white;
      color: #E31837;
      border: 1px solid #E31837;
      padding: 6px 12px;
      border-radius: 4px;
      font-size: 13px;
      font-weight: 500;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .add-btn:hover {
      background: rgba(227, 24, 55, 0.1);
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
export class CountryChickenComponent {
  products: CountryChickenProduct[] = [
    {
      id: 'CC001',
      name: 'Country Chicken (Farm Grownup) with Skin',
      description: 'Fresh farm-raised country chicken with skin, perfect for traditional recipes',
      image: 'assets/images/N1.jpg',
      variants: [
        { weight: '1 kg', price: 400 },
        { weight: '500 g', price: 200 }
      ],
      quantity: 0
    },
    {
      id: 'CC002',
      name: 'Country Chicken (Farm Grownup) without Skin',
      description: 'Skinless farm-raised country chicken, ideal for healthier preparations',
      image: 'assets/images/N2.jfif',
      variants: [
        { weight: '1 kg', price: 400 },
        { weight: '500 g', price: 200 }
      ],
      quantity: 0
    },
    {
      id: 'CC003',
      name: 'Country Chicken (House Grownup) Live Bird',
      description: 'Fresh house-raised live country chicken, traditionally grown for authentic taste',
      image: 'assets/images/N3.jpg',
      variants: [
        { weight: '1 kg', price: 600 }
      ],
      quantity: 0
    }
  ];

  constructor(private cartService: CartService) {}

  addToCart(product: CountryChickenProduct, variant: { weight: string; price: number }) {
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

  increaseQuantity(product: CountryChickenProduct, variant: { weight: string; price: number }) {
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

  decreaseQuantity(product: CountryChickenProduct) {
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