import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blinking-poster',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="blinking-poster-container">
      <div class="blinking-poster">
        <div class="offer-content">
          <!-- Free Delivery Section -->
          <div class="delivery-section">
            <div class="badge">
              <i class="bi bi-truck"></i>
              Free Delivery
            </div>
            <div class="delivery-info">
              On orders above ₹150
            </div>
          </div>

          <div class="divider"></div>

          <!-- Order Timings Section -->
          <div class="timing-section">
            <div class="timing-header">
              <i class="bi bi-clock-fill"></i>
              Order Timings
            </div>
            <div class="timing-slots">
              <div class="slot">
                <div class="slot-label">Morning</div>
                <div class="slot-time">
                  <i class="bi bi-sun"></i>
                  6 AM - 2 PM
                </div>
              </div>
              <div class="slot">
                <div class="slot-label">Evening</div>
                <div class="slot-time">
                  <i class="bi bi-moon"></i>
                  6 PM - 8 PM
                </div>
              </div>
            </div>
          </div>

          <div class="order-now" (click)="onOrderNowClick()">
            <i class="bi bi-arrow-right-circle-fill"></i>
            Order Now
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .blinking-poster-container {
      position: sticky;
      top: 20px;
      padding: 10px;
      width: 100%;
      height: 100%;
    }

    .blinking-poster {
      background: linear-gradient(135deg, #fff5f6, #fff);
      border-radius: 12px;
      padding: 15px;
      box-shadow: 0 4px 15px rgba(227, 24, 55, 0.1);
      animation: float 6s ease-in-out infinite;
      border: 1px solid rgba(227, 24, 55, 0.1);
    }

    .offer-content {
      background: white;
      border-radius: 8px;
      padding: 20px;
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    /* Delivery Section Styles */
    .delivery-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }

    .badge {
      background: #E31837;
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      animation: pulse 2s infinite;
    }

    .delivery-info {
      color: #1a1a1a;
      font-size: 16px;
      font-weight: 500;
    }

    /* Divider */
    .divider {
      height: 1px;
      background: #f0f0f0;
      width: 100%;
    }

    /* Timing Section Styles */
    .timing-section {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .timing-header {
      color: #1a1a1a;
      font-size: 16px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }

    .timing-slots {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .slot {
      background: #f8f8f8;
      padding: 10px;
      border-radius: 8px;
      transition: all 0.3s ease;
    }

    .slot:hover {
      background: #fff1f4;
      transform: translateX(5px);
    }

    .slot-label {
      color: #666;
      font-size: 14px;
      margin-bottom: 4px;
    }

    .slot-time {
      color: #E31837;
      font-size: 16px;
      font-weight: 500;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }

    .order-now {
      color: #E31837;
      font-size: 16px;
      font-weight: 500;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 10px;
      border: 2px dashed #E31837;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-top: 5px;
    }

    .order-now:hover {
      background: #fff1f4;
      transform: translateY(-2px);
    }

    @keyframes float {
      0% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-10px);
      }
      100% {
        transform: translateY(0);
      }
    }

    @keyframes pulse {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
      100% {
        transform: scale(1);
      }
    }

    @media (max-width: 768px) {
      .blinking-poster-container {
        position: relative;
        top: 0;
        padding: 10px 0;
      }

      .blinking-poster {
        padding: 10px;
      }

      .offer-content {
        padding: 15px;
        gap: 15px;
      }

      .badge {
        font-size: 12px;
        padding: 6px 12px;
      }

      .delivery-info {
        font-size: 14px;
      }

      .timing-header {
        font-size: 14px;
      }

      .slot-time {
        font-size: 14px;
      }

      .order-now {
        font-size: 14px;
      }
    }
  `]
})
export class BlinkingPosterComponent {
  @Output() orderNowClicked = new EventEmitter<void>();

  onOrderNowClick() {
    this.orderNowClicked.emit();
  }
} 