import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { BlinkingPosterComponent } from '../blinking-poster/blinking-poster.component';

interface Category {
  name: string;
  image: string;
  route: string;
  description: string;
}

interface ComboPack {
  name: string;
  items: string[];
  weight: string;
  price: number;
  image: string;
  quantity?: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, BlinkingPosterComponent],
  template: `
    <div class="home-container">
      <!-- Carousel Section -->
      <div class="carousel-section">
        <div class="carousel-container">
          <div class="main-carousel">
            <div class="carousel">
              <div class="carousel-inner" [style.transform]="'translateX(-' + (currentSlide * 100) + '%)'">
                <!-- Happy Hours Daily Offer -->
                <div class="carousel-item">
                  <div class="carousel-content happy-hours">
                    <div class="offer-wrapper">
                      <div class="offer-badge">
                        <i class="bi bi-clock-fill"></i>
                        Happy Hours
                      </div>
                      <div class="offer-details">
                        <h2>Daily Special Discount</h2>
                        <div class="time-badge">
                          <i class="bi bi-alarm"></i>
                          6 PM - 8 PM
                        </div>
                        <div class="discount-info">
                          <div class="discount-badge">
                            <span class="discount-amount">5%</span>
                            <span class="discount-text">OFF</span>
                          </div>
                          <div class="offer-description">
                            <p class="condition">On orders above ₹150</p>
                            <p class="validity">*Valid every day during happy hours</p>
                          </div>
                        </div>
                        <button class="shop-now-btn">
                          Order Now <i class="bi bi-arrow-right"></i>
                        </button>
                        <div class="timer-strip">Limited Time Offer!</div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Sunday Special -->
                <div class="carousel-item">
                  <div class="carousel-content sunday-special">
                    <div class="offer-wrapper">
                      <div class="offer-badge sunday">
                        <i class="bi bi-calendar-heart-fill"></i>
                        Sunday Special
                      </div>
                      <div class="offer-details">
                        <h2>Weekend Bulk Offer</h2>
                        <div class="bulk-badge">
                          <i class="bi bi-box-seam-fill"></i>
                          Bulk Orders
                        </div>
                        <div class="discount-info">
                          <div class="discount-badge">
                            <span class="discount-amount">5%</span>
                            <span class="discount-text">OFF</span>
                          </div>
                          <div class="offer-description">
                            <p class="condition">On orders above ₹1000</p>
                            <p class="validity">*Valid only on Sundays</p>
                          </div>
                        </div>
                        <button class="shop-now-btn">
                          Shop Now <i class="bi bi-arrow-right"></i>
                        </button>
                        <div class="timer-strip">Sunday Special Deal!</div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Combo Pack Offers -->
                <div class="carousel-item">
                  <div class="carousel-content combo-special">
                    <div class="offer-wrapper">
                      <div class="offer-badge combo">
                        <i class="bi bi-gift-fill"></i>
                        Combo Offers
                      </div>
                      <div class="offer-details">
                        <h2>Daily Combo Pack Offers</h2>
                        <div class="combo-list">
                          <div class="combo-item">
                            <div class="combo-content">
                              <i class="bi bi-check2-circle"></i>
                              <div class="combo-text">
                                <span class="combo-main">500g Chicken + 500g Mutton</span>
                                <span class="free-item">
                                  <i class="bi bi-plus-circle"></i>
                                  Get 2 Lollipops FREE
                                </span>
                              </div>
                            </div>
                            <div class="combo-badge">COMBO 1</div>
                          </div>
                          <div class="combo-item">
                            <div class="combo-content">
                              <i class="bi bi-check2-circle"></i>
                              <div class="combo-text">
                                <span class="combo-main">1kg Chicken + 500g Boneless</span>
                                <span class="free-item">
                                  <i class="bi bi-plus-circle"></i>
                                  Get 2 Drumsticks FREE
                                </span>
                              </div>
                            </div>
                            <div class="combo-badge">COMBO 2</div>
                          </div>
                        </div>
                        <button class="shop-now-btn">
                          Grab Offer <i class="bi bi-arrow-right"></i>
                        </button>
                        <div class="timer-strip">Daily Fresh Combos!</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Carousel Controls -->
              <button class="carousel-control prev" (click)="prevSlide()">
                <i class="bi bi-chevron-left"></i>
              </button>
              <button class="carousel-control next" (click)="nextSlide()">
                <i class="bi bi-chevron-right"></i>
              </button>

              <!-- Carousel Indicators -->
              <div class="carousel-indicators">
                <button *ngFor="let _ of [1,2,3]; let i = index" 
                        [class.active]="i === currentSlide"
                        (click)="goToSlide(i)">
                </button>
              </div>
            </div>
          </div>
          <div class="side-poster">
            <app-blinking-poster (orderNowClicked)="scrollToCategories()"></app-blinking-poster>
          </div>
        </div>
      </div>

      <!-- Categories Section -->
      <section class="categories-section" #categoriesSection>
        <div class="container">
          <h2 class="section-title">Our Categories</h2>
          <div class="categories-grid">
            <a [routerLink]="category.route" class="category-card" *ngFor="let category of mainCategories">
            <div class="category-image">
              <img [src]="category.image" [alt]="category.name">
            </div>
            <h3>{{ category.name }}</h3>
            </a>
          </div>
        </div>
      </section>

      <!-- Combo Packs Section -->
      <section class="combo-packs-section">
        <div class="container">
          <h2 class="section-title">Special Combo Packs</h2>
          <div class="combo-packs-grid">
            <div class="combo-pack-card" *ngFor="let pack of comboPacks">
              <div class="combo-image">
                <img [src]="pack.image" [alt]="pack.name">
                <div class="combo-badge">COMBO</div>
              </div>
              <div class="combo-info">
                <h3>{{ pack.name }}</h3>
                <ul class="combo-items">
                  <li *ngFor="let item of pack.items">{{ item }}</li>
                </ul>
                <div class="combo-details">
                  <span class="weight">{{ pack.weight }}</span>
                  <span class="price">₹{{ pack.price }}</span>
                </div>
                <div class="quantity-controls" *ngIf="pack.quantity && pack.quantity > 0">
                  <button class="qty-btn" (click)="decreaseComboQuantity(pack)">-</button>
                  <span class="qty-display">{{ pack.quantity }}</span>
                  <button class="qty-btn" (click)="increaseComboQuantity(pack)">+</button>
                </div>
                <button class="btn-add-cart" *ngIf="!pack.quantity || pack.quantity === 0" 
                        (click)="addComboToCart(pack)">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home-container {
      padding-top: 0;
    }

    /* Carousel Styles */
    .carousel-section {
      position: relative;
      background: #fff1f4;
      padding: 30px 0;
      margin-bottom: 40px;
    }

    .carousel-container {
      position: relative;
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 20px;
      display: grid;
      grid-template-columns: 1fr 280px;
      gap: 20px;
      align-items: start;
    }

    .main-carousel {
      width: 100%;
    }

    .carousel {
      position: relative;
      overflow: hidden;
      width: 100%;
      height: 400px;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .carousel-inner {
      display: flex;
      height: 100%;
      transition: transform 0.5s ease-in-out;
    }

    .carousel-item {
      min-width: 100%;
      height: 100%;
    }

    .carousel-content {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px;
      background-size: cover;
      background-position: center;
      position: relative;
      overflow: hidden;
    }

    .happy-hours {
      background: linear-gradient(135deg, #ffe6e6 0%, #fff1f4 100%);
    }

    .sunday-special {
      background: linear-gradient(135deg, #fff0e6 0%, #fff9f0 100%);
    }

    .combo-special {
      background: linear-gradient(135deg, #e6f7ff 0%, #f0f9ff 100%);
    }

    .offer-wrapper {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 20px;
      padding: 40px;
      width: 100%;
      max-width: 800px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      text-align: center;
      position: relative;
      overflow: hidden;
      transform: translateY(0);
      transition: transform 0.3s ease;
    }

    .offer-wrapper:hover {
      transform: translateY(-5px);
    }

    .offer-badge {
      position: absolute;
      top: 20px;
      right: -35px;
      background: #E31837;
      color: white;
      padding: 8px 40px;
      transform: rotate(45deg);
      font-size: 14px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      display: flex;
      align-items: center;
      gap: 6px;
      z-index: 1;
    }

    .offer-badge.sunday {
      background: #ff6b6b;
    }

    .offer-badge.combo {
      background: #4CAF50;
    }

    .offer-details {
      padding: 20px 0;
      max-width: 600px;
      margin: 0 auto;
    }

    .offer-details h2 {
      color: #1a1a1a;
      font-size: 36px;
      margin-bottom: 20px;
      font-weight: 700;
      line-height: 1.2;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .time-badge, .bulk-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 24px;
      border-radius: 30px;
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 20px;
      transition: transform 0.3s ease;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .time-badge {
      background: #fff1f4;
      color: #E31837;
    }

    .bulk-badge {
      background: #fff3e0;
      color: #f57c00;
    }

    .discount-info {
      margin: 25px 0;
      position: relative;
    }

    .discount-badge {
      display: inline-flex;
      flex-direction: column;
      background: #E31837;
      color: white;
      padding: 15px 30px;
      border-radius: 15px;
      margin-bottom: 15px;
      transform: scale(1);
      transition: transform 0.3s ease;
      box-shadow: 0 4px 12px rgba(227, 24, 55, 0.2);
    }

    .discount-amount {
      font-size: 48px;
      font-weight: 800;
      line-height: 1;
    }

    .discount-text {
      font-size: 24px;
      font-weight: 600;
      text-transform: uppercase;
    }

    .offer-description {
      margin-top: 15px;
    }

    .condition {
      color: #333;
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 5px;
    }

    .validity {
      color: #666;
      font-size: 14px;
      font-style: italic;
    }

    .combo-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin: 25px 0;
    }

    .combo-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 15px;
      transition: all 0.3s ease;
      border: 2px solid transparent;
      position: relative;
    }

    .combo-item:hover {
      background: #fff;
      border-color: #4CAF50;
      transform: translateY(-5px);
      box-shadow: 0 8px 16px rgba(76, 175, 80, 0.1);
    }

    .combo-content {
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .combo-text {
      display: flex;
      flex-direction: column;
      gap: 5px;
      text-align: left;
    }

    .combo-main {
      font-size: 16px;
      font-weight: 600;
      color: #333;
    }

    .free-item {
      display: flex;
      align-items: center;
      gap: 5px;
      color: #4CAF50;
      font-weight: 500;
    }

    .combo-badge {
      background: #4CAF50;
      color: white;
      padding: 5px 10px;
      border-radius: 5px;
      font-size: 12px;
      font-weight: 600;
    }

    .timer-strip {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(227, 24, 55, 0.1);
      color: #E31837;
      padding: 8px;
      font-size: 14px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .shop-now-btn {
      background: #E31837;
      color: white;
      border: none;
      padding: 15px 35px;
      border-radius: 30px;
      font-size: 18px;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-top: 25px;
      text-transform: uppercase;
      letter-spacing: 1px;
      box-shadow: 0 4px 12px rgba(227, 24, 55, 0.2);
    }

    .shop-now-btn:hover {
      background: #c41530;
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(227, 24, 55, 0.3);
    }

    .carousel-control {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(255, 255, 255, 0.9);
      border: none;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      color: #E31837;
      transition: all 0.3s ease;
      z-index: 2;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .carousel-control:hover {
      background: #E31837;
      color: white;
      transform: translateY(-50%) scale(1.1);
    }

    .carousel-control.prev {
      left: 20px;
    }

    .carousel-control.next {
      right: 20px;
    }

    .carousel-indicators {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 8px;
      z-index: 2;
    }

    .carousel-indicators button {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: none;
      background: rgba(255, 255, 255, 0.5);
      cursor: pointer;
      padding: 0;
      transition: all 0.3s ease;
    }

    .carousel-indicators button.active {
      background: #E31837;
      transform: scale(1.2);
    }

    .carousel-posters {
      width: 15%;
      align-self: flex-start;
    }

    /* Categories Styles */
    .categories-section {
      padding: 40px 0;
      background: #fff;
    }

    .section-title {
      text-align: center;
      margin-bottom: 40px;
      color: #1a1a1a;
      font-size: 28px;
      font-weight: 600;
      position: relative;
    }

    .section-title::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 3px;
      background: #E31837;
      border-radius: 2px;
    }

    .categories-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 24px;
      padding: 0 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .category-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-decoration: none;
      padding: 20px;
      border-radius: 16px;
      background: #fff;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .category-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 120px;
      background: linear-gradient(45deg, #ffe6e9, #fff1f4);
      z-index: 0;
      border-radius: 16px 16px 50% 50%;
      transition: all 0.3s ease;
    }

    .category-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 16px rgba(0,0,0,0.12);
    }

    .category-card:hover::before {
      height: 130px;
      background: linear-gradient(45deg, #ffd6dc, #ffe6e9);
    }

    .category-card:hover .category-image {
      transform: scale(1.05);
      box-shadow: 0 6px 16px rgba(227, 24, 55, 0.15);
    }

    .category-image {
      width: 190px;
      height: 190px;
      border-radius: 50%;
      overflow: hidden;
      margin-bottom: 20px;
      position: relative;
      z-index: 1;
      border: 4px solid #fff;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      transition: all 0.3s ease;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .category-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .category-card:hover .category-image img {
      transform: scale(1.1);
    }

    .category-card h3 {
      color: #1a1a1a;
      font-size: 18px;
      text-align: center;
      margin: 0;
      font-weight: 600;
      position: relative;
      z-index: 1;
      transition: color 0.3s ease;
    }

    .category-card:hover h3 {
      color: #E31837;
    }

    @media (max-width: 1200px) {
      .carousel-container {
        grid-template-columns: 1fr 250px;
        gap: 15px;
      }

      .carousel {
        height: 350px;
      }

      .offer-details h2 {
        font-size: 32px;
      }
    }

    @media (max-width: 992px) {
      .carousel-container {
        grid-template-columns: 1fr;
      }

      .side-poster {
        display: none;
      }

      .carousel {
        height: 300px;
      }

      .offer-wrapper {
        padding: 30px;
      }

      .offer-details h2 {
        font-size: 28px;
      }

      .time-badge, .bulk-badge {
        font-size: 16px;
        padding: 8px 16px;
      }

      .discount-amount {
        font-size: 36px;
      }

      .discount-text {
        font-size: 20px;
      }

      .condition {
        font-size: 16px;
      }

      .combo-item {
        flex-direction: column;
        gap: 10px;
        padding: 15px;
      }

      .combo-content {
        width: 100%;
      }

      .combo-badge {
        position: absolute;
        top: 10px;
        right: 10px;
      }

      .shop-now-btn {
        padding: 12px 25px;
        font-size: 16px;
      }
    }

    @media (max-width: 768px) {
      .carousel-section {
        padding: 20px 0;
      }

      .carousel {
        height: 400px;
      }

      .carousel-content {
        padding: 20px;
      }

      .offer-wrapper {
        padding: 20px;
      }

      .offer-details h2 {
        font-size: 28px;
      }

      .combo-item {
        flex-direction: column;
        gap: 10px;
        padding: 15px;
      }

      .combo-content {
        width: 100%;
      }

      .combo-badge {
        position: absolute;
        top: 10px;
        right: 10px;
      }

      .shop-now-btn {
        padding: 12px 25px;
        font-size: 16px;
      }

      .carousel-control {
        width: 35px;
        height: 35px;
        font-size: 1rem;
      }

      .category-image {
        width: 90px;
        height: 100px;
      }
    }

    /* Combo Packs Styles */
    .combo-packs-section {
      padding: 40px 0;
      background: #fff;
    }

    .combo-packs-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 25px;
      padding: 0 20px;
    }

    .combo-pack-card {
      background: white;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .combo-pack-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 12px rgba(0,0,0,0.15);
    }

    .combo-image {
      position: relative;
      height: 200px;
      overflow: hidden;
      }

    .combo-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .combo-badge {
      position: absolute;
      top: 10px;
      right: 10px;
      background: #E31837;
      color: white;
      padding: 5px 10px;
      border-radius: 4px;
      font-size: 0.8rem;
      font-weight: bold;
    }

    .combo-info {
      padding: 20px;
    }

    .combo-info h3 {
      color: #333;
      font-size: 1.2rem;
      margin: 0 0 10px;
      font-weight: bold;
    }

    .combo-items {
      list-style: none;
      padding: 0;
      margin: 0 0 15px;
      color: #666;
      font-size: 0.9rem;
    }

    .combo-items li {
      margin-bottom: 5px;
    }

    .combo-details {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      font-weight: 500;
      }

    .weight {
      color: #666;
      font-size: 0.9rem;
    }

    .price {
      color: #E31837;
      font-size: 1.3rem;
    }

    .btn-add-cart {
      width: 100%;
      background: #E31837;
      color: white;
      border: none;
      padding: 10px;
      border-radius: 5px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .btn-add-cart:hover {
      background: #c41530;
    }

    @media (max-width: 768px) {
      .combo-packs-grid {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 15px;
        padding: 0 10px;
      }

      .combo-image {
        height: 150px;
      }

      .combo-info {
        padding: 15px;
      }

      .combo-info h3 {
        font-size: 1.1rem;
      }

      .price {
        font-size: 1.2rem;
      }
    }

    .quantity-controls {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      margin-bottom: 5px;
    }

    .qty-btn {
      background: #E31837;
      color: white;
      border: none;
      width: 30px;
      height: 30px;
      border-radius: 4px;
      font-size: 1.2rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.3s ease;
    }

    .qty-btn:hover {
      background: #c41530;
    }

    .qty-display {
      font-size: 1.1rem;
      font-weight: 500;
      min-width: 30px;
      text-align: center;
    }
  `]
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('categoriesSection') categoriesSection!: ElementRef;
  
  currentSlide = 0;
  private autoScrollInterval: any;

  carouselItems = [
    {
      type: 'daily',
      badge: 'Daily Offer',
      badgeType: 'daily',
      title: 'Happy Hours Discount',
      time: '6 PM - 8 PM',
      discount: '5% OFF',
      condition: 'On orders above ₹150'
    },
    {
      type: 'sunday',
      badge: 'Sunday Special',
      badgeType: 'sunday',
      title: 'Bulk Order Discount',
      discount: '5% OFF',
      condition: 'On orders above ₹1000'
    },
    {
      type: 'combo',
      badge: 'Combo Offers',
      badgeType: 'combo',
      title: 'Daily Combo Pack Offers',
      combos: [
        'Buy 500g chicken + 500g mutton - Get 2 lollipops FREE',
        'Buy 1kg chicken + 500g boneless chicken - Get 2 drumsticks FREE'
      ]
    }
  ];

  mainCategories: Category[] = [
    {
      name: 'Chicken',
      image: 'assets/images/c1.png',
      route: '/chicken',
      description: 'Fresh farm-raised chicken'
    },
    {
      name: 'Country Chicken',
      image: 'assets/images/c2.png',
      route: '/country-chicken',
      description: 'Traditional free-range chicken'
    },
    {
      name: 'Japanese Quail',
      image: 'assets/images/jq3.png',
      route: '/japanese-quail',
      description: 'Premium quality quail meat'
    },
    {
      name: 'Turkey Bird',
      image: 'assets/images/tb4.png',
      route: '/turkey',
      description: 'Fresh turkey meat'
    },
    {
      name: 'Goat',
      image: 'assets/images/g5.png',
      route: '/goat',
      description: 'Premium goat meat cuts'
    }
  ];

  comboPacks: ComboPack[] = [
    {
      name: 'Gym Protein Pack',
      items: ['Chicken Breast Boneless'],
      weight: '250g',
      price: 100,
      image: 'assets/images/Gym Pack.jpg',
      quantity: 0
    },
    {
      name: 'Pets Special Pack',
      items: ['Chicken Bone'],
      weight: '1kg',
      price: 70,
      image: 'assets/images/cb.webp',
      quantity: 0
    },
    {
      name: 'Liver Pack',
      items: ['Liver Frozen'],
      weight: '1kg',
      price: 90,
      image: 'assets/images/Chicken liver .jpg',
      quantity: 0
    },
    {
      name: 'Leg Pack',
      items: ['Chicken Leg'],
      weight: '1kg',
      price: 50,
      image: 'assets/images/Chicken leg piece with thigh .webp',
      quantity: 0
    }
  ];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.startAutoScroll();
  }

  ngOnDestroy() {
    this.stopAutoScroll();
  }

  startAutoScroll() {
    this.autoScrollInterval = setInterval(() => {
      this.nextSlide();
    }, 5000); // Change slide every 5 seconds
  }

  stopAutoScroll() {
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
    }
  }

  prevSlide() {
    this.stopAutoScroll(); // Stop auto-scroll when user interacts
    this.currentSlide = this.currentSlide === 0 ? 
      2 : this.currentSlide - 1;
    this.startAutoScroll(); // Restart auto-scroll
  }

  nextSlide() {
    this.currentSlide = this.currentSlide === 2 ? 
      0 : this.currentSlide + 1;
  }

  goToSlide(index: number) {
    this.stopAutoScroll(); // Stop auto-scroll when user interacts
    this.currentSlide = index;
    this.startAutoScroll(); // Restart auto-scroll
  }

  addComboToCart(pack: ComboPack) {
    pack.quantity = 1;
    this.cartService.addToCart({
      id: pack.name,
      name: pack.name,
      price: pack.price,
      quantity: 1,
      weight: pack.weight,
      image: pack.image,
      isCombo: true
    });
  }

  increaseComboQuantity(pack: ComboPack) {
    pack.quantity! += 1;
    this.cartService.addToCart({
      id: pack.name,
      name: pack.name,
      price: pack.price,
      quantity: 1,
      weight: pack.weight,
      image: pack.image,
      isCombo: true
    });
  }

  decreaseComboQuantity(pack: ComboPack) {
    if (pack.quantity! > 0) {
      pack.quantity! -= 1;
      this.cartService.removeFromCart(pack.name);
    }
  }

  getAllSlides() {
    // Return array with length equal to total number of slides (blinking poster + carousel items)
    return new Array(this.carouselItems.length + 1);
  }

  scrollToCategories() {
    this.categoriesSection.nativeElement.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
}