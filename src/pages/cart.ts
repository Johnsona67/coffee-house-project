import { AuthApi } from "../api/auth";
import { initLanguageSelectors, t, changeLanguage } from "../utils/translation";
import "../../cart.css";

if (typeof window !== "undefined") {
  (window as any).setAppLanguage = changeLanguage;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  size: string;
  additives: string;
  category: string;
}

let cart: CartItem[] = [];

function getCartFromStorage(): CartItem[] {
  try {
    const stored = localStorage.getItem('coffee-cart');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading cart from storage:', error);
    return [];
  }
}

function saveCartToStorage() {
  try {
    localStorage.setItem('coffee-cart', JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart to storage:', error);
  }
}

function getItemImageUrl(item: CartItem): string {
  const category = item.category.toLowerCase();
  const imageUrl = `/images/${category}-${item.id}.jpg`;
  console.log(`[CART] Trying image for ${item.name} (ID: ${item.id}, Category: ${category}):`, imageUrl);
  return imageUrl;
}

function attachImageFallback(img: HTMLImageElement, item: CartItem) {
  img.addEventListener("error", function onErr() {
    console.log(`[CART] First attempt failed for ${item.name}:`, img.src);
    img.removeEventListener("error", onErr);
    const category = item.category.toLowerCase();
    const tryPng = `/images/${category}-${item.id}.png`;
    console.log(`[CART] Trying PNG version for ${item.name}:`, tryPng);
    img.src = tryPng;
    img.addEventListener("error", () => {
      console.log(`[CART] PNG also failed for ${item.name}, using placeholder`);
      img.src = "/images/placeholder.jpg";
    }, { once: true });
  }, { once: true });
}

function createCartItemElement(item: CartItem): HTMLElement {
  const cartItem = document.createElement('div');
  cartItem.className = 'cart-item';
  cartItem.setAttribute('data-item-id', item.id.toString());

  cartItem.innerHTML = `
    <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
      <img src="/images/trash.png" alt="Remove item">
    </button>
    <img src="${getItemImageUrl(item)}" alt="${item.name}" class="cart-item-image">
    <div class="cart-item-details">
      <h3 class="cart-item-name">${item.name}</h3>
      <p class="cart-item-options">${item.size}${item.additives !== 'None' ? ', ' + item.additives : ''}</p>
    </div>
    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
  `;

  const img = cartItem.querySelector('.cart-item-image') as HTMLImageElement;
  if (img) {
    attachImageFallback(img, item);
  }

  return cartItem;
}

function renderCartItems() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalElement = document.getElementById('cart-total');
  
  if (!cartItemsContainer || !cartTotalElement) return;

  console.log('[CART] Current cart items:', cart);

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="empty-cart">
        <h2>${t("cart.emptyTitle")}</h2>
        <p>${t("cart.emptySubtitle")}</p>
        <a href="/menu.html" class="cart-btn">${t("cart.emptyCta")}</a>
      </div>
    `;
    cartTotalElement.textContent = '0.00';
    return;
  }

  cartItemsContainer.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    console.log(`[CART] Rendering item ${index + 1}:`, {
      id: item.id,
      name: item.name,
      category: item.category,
      expectedImage: `/images/${item.category.toLowerCase()}-${item.id}.jpg`
    });
    const cartItemElement = createCartItemElement(item);
    cartItemsContainer.appendChild(cartItemElement);
    total += item.price;
  });

  cartTotalElement.textContent = total.toFixed(2);
}

function updateCartCount() {
  const cartCountElements = document.querySelectorAll('.cart-count');
  cartCountElements.forEach(element => {
    element.textContent = cart.length.toString();
  });
}

function removeFromCart(itemId: number) {
  cart = cart.filter(item => item.id !== itemId);
  saveCartToStorage();
  updateCartCount();
  renderCartItems();
  
  updateAuthButtonVisibility();
}

function confirmOrder() {
  const confirmBtn = document.getElementById('confirm-order-btn') as HTMLButtonElement;
  const confirmationDiv = document.getElementById('order-confirmation') as HTMLElement;
  
  if (!confirmBtn || !confirmationDiv) return;
  
  confirmBtn.disabled = true;
  confirmBtn.textContent = t("cart.placingOrder");
  
  setTimeout(() => {
    try {
      cart = [];
      saveCartToStorage();
      updateCartCount();
      renderCartItems();
      
      updateAuthButtonVisibility();
      
      confirmBtn.style.display = 'none';
      confirmationDiv.style.display = 'block';
      
      confirmBtn.disabled = false;
      confirmBtn.textContent = t("cart.confirmOrder");
      
      setTimeout(() => {
        confirmationDiv.style.display = 'none';
      }, 5000);
      
    } catch (error) {
      console.error('Error placing order:', error);
      confirmBtn.disabled = false;
      confirmBtn.textContent = t("cart.confirmOrder");
    }
  }, 2000); // 2 second delay to simulate API call
}

(window as any).removeFromCart = removeFromCart;
(window as any).confirmOrder = confirmOrder;

function initializeCart() {
  cart = getCartFromStorage();
  updateCartCount();
  renderCartItems();
  
  const confirmBtn = document.getElementById("confirm-order-btn") as HTMLButtonElement | null;
  if (confirmBtn) {
    confirmBtn.style.display = cart.length > 0 ? "inline-block" : "none";
    confirmBtn.textContent = t("cart.confirmOrder");
  }
   
  setupAuthButtons();
}

function setupAuthButtons() {
  const signInBtn = document.querySelector('.sign-in-btn') as HTMLButtonElement;
  const registrationBtn = document.querySelector('.registration-btn') as HTMLButtonElement;
  
  if (signInBtn) {
    signInBtn.addEventListener('click', () => {
      window.location.href = '/signin.html';
    });
  }
  
  if (registrationBtn) {
    registrationBtn.addEventListener('click', () => {
      window.location.href = '/register.html';
    });
  }
  
  updateAuthButtonVisibility();
}

function updateAuthButtonVisibility() {
  const isAuthenticated = AuthApi.isAuthenticated();
  const signInBtn = document.querySelector('.sign-in-btn') as HTMLElement;
  const registrationBtn = document.querySelector('.registration-btn') as HTMLElement;
  const confirmBtn = document.getElementById('confirm-order-btn') as HTMLElement;
  
  if (isAuthenticated) {
    if (signInBtn) signInBtn.style.display = 'none';
    if (registrationBtn) registrationBtn.style.display = 'none';
    
    if (confirmBtn) {
      confirmBtn.style.display = cart.length > 0 ? 'inline-block' : 'none';
    }
  } else {
    if (signInBtn) signInBtn.style.display = 'inline-block';
    if (registrationBtn) registrationBtn.style.display = 'inline-block';
    if (confirmBtn) confirmBtn.style.display = 'none';
  }
}

window.addEventListener("DOMContentLoaded", () => {
  initLanguageSelectors();
  initializeCart();
});

document.addEventListener("languagechange", () => {
  renderCartItems();
  updateAuthButtonVisibility();
  const confirmBtn = document.getElementById("confirm-order-btn") as HTMLButtonElement | null;
  if (confirmBtn) {
    confirmBtn.textContent = t("cart.confirmOrder");
  }
});