# Business Flow & Core Domain Entities

## 1. Domain Entities & Roles

### 1.1 Core Entities

1. **User:** Single authentication identity holding roles (`ADMIN`, `STORE_MANAGER`, `DELIVERY_BOY`, `CUSTOMER`).
2. **Store:** Physical micro-warehouse / dark store operating within a geo-fenced latitude/longitude delivery radius.
3. **Category:** High-level hierarchy grouping items (e.g., *Fruits & Vegetables*, *Dairy & Breakfast*, *Snacks & Drinks*).
4. **Product:** Item with unit, price, discount price, image, and inventory tied to a specific store.
5. **Cart:** Temporary holding state containing selected items and quantities for a customer session.
6. **Order:** Immutable transaction snapshot capturing items, prices at purchase time, payment status, and delivery address.
7. **Delivery:** Operational tracking record linking an Order to an assigned Delivery Boy.
8. **DeliveryLocation:** Stream of GPS coordinate pings (`latitude`, `longitude`, `timestamp`) sent by the delivery boy.
9. **OrderStatusHistory:** Audit log tracking state changes with timestamps and actor IDs.

---

## 2. Order Lifecycle State Machine

```
   [Customer Places Order]
             │
             ▼
        PLACED (Pending Store Confirmation)
             │
             ├──────────────────────────┐
             ▼                          ▼
     CONFIRMED (Store accepted)      CANCELLED (Out of stock/user abort)
             │
             ▼
        PACKING (Store picking items)
             │
             ▼
     READY_FOR_PICKUP (Packed & sealed)
             │
             ▼
        ASSIGNED (Delivery boy accepted order)
             │
             ▼
      PICKED_UP (Out for delivery, live GPS tracking begins)
             │
             ▼
       DELIVERED (Customer verified OTP & received items)
```

---

## 3. Key Design Principles

1. **Backend Pricing Authority:**
   The frontend never computes final order amounts. The backend re-validates item availability, active prices, coupons, and delivery fees upon order creation to prevent tampering.
2. **Embedded Order Items vs References:**
   Orders embed item details (`name`, `priceAtOrder`, `quantity`, `unit`) rather than referencing mutable product collections. This ensures historical receipt accuracy even if a product is later modified or deleted.
3. **Hyperlocal Store Isolation:**
   A cart belongs to a single dark store. Products from multiple stores cannot be intermingled in one order to maintain the 10-15 minute delivery guarantee.
