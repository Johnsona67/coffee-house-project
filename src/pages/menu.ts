import type { Product } from "../types/api";
import { getMenuProducts } from "../api/product"; 
import { AuthApi } from "../api/auth"; 

const FIRST_VISIBLE = 4;

function updateNavigationAuthStatus() {
  const isAuthenticated = AuthApi.isAuthenticated();
  const nav = document.querySelector('nav');
  
  if (nav) {
    const existingAuthLinks = nav.querySelector('.auth-links');
    if (existingAuthLinks) {
      existingAuthLinks.remove();
    }
    
    const menuLink = nav.querySelector('.menu_link');
    if (menuLink) {
      if (isAuthenticated) {
        const logoutDiv = document.createElement('div');
        logoutDiv.className = 'auth-links';
        logoutDiv.innerHTML = `
          <a href="#" id="logout-btn" class="action-link">Logout</a>
        `;
        menuLink.parentNode?.insertBefore(logoutDiv, menuLink);
        
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
          logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            AuthApi.removeToken();
            window.location.href = '/index.html';
          });
        }
      } else {
      }
    }
  }
}

function imgSrc(p: Product): string {
  const cat = (p.category || "coffee").toLowerCase();
  return `/images/${cat}-${p.id}.jpg`;
}

function attachImgFallback(img: HTMLImageElement, p: Product) {
  img.addEventListener("error", function onErr() {
    img.removeEventListener("error", onErr);
    const cat = (p.category || "coffee").toLowerCase();
    const tryPng = `/images/${cat}-${p.id}.png`;
    img.src = tryPng;
    img.addEventListener("error", () => {
      img.src = "/images/placeholder.jpg";
    }, { once: true });
  }, { once: true });
}

function money(s?: string): string {
  if (!s) return "";
  const n = Number.parseFloat(s);
  return Number.isNaN(n) ? s : n.toFixed(2);
}

function cardEl(p: Product): HTMLElement {
  const el = document.createElement("div");
  el.className = "menu-item";
  el.setAttribute("data-id", String(p.id));
  el.setAttribute("data-category", (p.category || "").toLowerCase());

  const img = document.createElement("img");
  img.alt = p.name;
  img.src = imgSrc(p);
  attachImgFallback(img, p);

  const text = document.createElement("div");
  text.className = "menu-item-text";
  text.innerHTML = `
    <h3 class="heading-3">${p.name}</h3>
    <p class="child-description body-medium">${p.description ?? ""}</p>
    <p class="child-price heading-3">$${money(p.price)}</p>
  `;

  el.appendChild(img);
  el.appendChild(text);
  return el;
}

function showLoadMoreButton(category: "coffee" | "tea" | "dessert") {
  const btnWrap = document.getElementById(`${category}-load-more`);
  const content = document.getElementById(`${category}-content`);
  if (!btnWrap || !content) return;
  const all = content.querySelectorAll(".menu-item");
  btnWrap.style.display = all.length > FIRST_VISIBLE ? "flex" : "none";
}

function hideLoadMoreButton(category: "coffee" | "tea" | "dessert") {
  const btnWrap = document.getElementById(`${category}-load-more`);
  if (btnWrap) btnWrap.style.display = "none";
}

function resetHidden(category: "coffee" | "tea" | "dessert") {
  const content = document.getElementById(`${category}-content`);
  if (!content) return;
  const all = content.querySelectorAll<HTMLElement>(".menu-item");
  all.forEach((el, i) => {
    if (i >= FIRST_VISIBLE) el.classList.add("hidden");
    else el.classList.remove("hidden");
  });
}

function renderSection(category: "coffee" | "tea" | "dessert", items: Product[]) {
  const root = document.getElementById(`${category}-content`);
  if (!root) return;

  root.innerHTML = "";
  items
    .sort((a, b) => a.id - b.id)
    .forEach((p, i) => {
      const el = cardEl(p);
      if (i >= FIRST_VISIBLE) el.classList.add("hidden");
      root.appendChild(el);
    });

  showLoadMoreButton(category);
}

function calculatePrice(modalId: string, basePrice: number): number {
  const modal = document.getElementById(modalId);
  if (!modal) return basePrice;

  let totalPrice = basePrice;

  const selectedSizeBtn = modal.querySelector('.modal-btn.selected[data-size]') as HTMLElement;
  if (selectedSizeBtn) {
    const sizePrice = parseFloat(selectedSizeBtn.getAttribute('data-price') || '0');
    totalPrice += sizePrice;
  }

  const selectedAdditives = modal.querySelectorAll('.modal-btn.selected[data-number]');
  selectedAdditives.forEach(btn => {
    const additivePrice = parseFloat(btn.getAttribute('data-price') || '0');
    totalPrice += additivePrice;
  });

  return totalPrice;
}

function updateModalPrice(modalId: string, basePrice: number) {
  const totalPrice = calculatePrice(modalId, basePrice);
  const priceElement = document.getElementById(modalId === 'coffee-tea-modal' ? 'coffee-tea-total-price' : 'dessert-total-price');
  if (priceElement) {
    priceElement.textContent = totalPrice.toFixed(2);
  }
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

function addToCart(item: CartItem) {
  cart.push(item);
  updateCartCount();
  saveCartToStorage();
  console.log("Added to cart:", item);
}

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

function updateCartCount() {
  const cartCountElements = document.querySelectorAll('.cart-count');
  cartCountElements.forEach(element => {
    element.textContent = cart.length.toString();
  });
}

function closeModal(modalId: string) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

function showModalLoader(modalId: string) {
  const loader = document.getElementById(modalId === 'coffee-tea-modal' ? 'coffee-tea-loader' : 'dessert-loader');
  if (loader) {
    loader.style.display = 'flex';
  }
}

function hideModalLoader(modalId: string) {
  const loader = document.getElementById(modalId === 'coffee-tea-modal' ? 'coffee-tea-loader' : 'dessert-loader');
  if (loader) {
    loader.style.display = 'none';
  }
}

function showErrorNotification() {
  const errorNotification = document.getElementById('error-notification');
  if (errorNotification) {
    errorNotification.style.display = 'block';
    setTimeout(() => {
      hideErrorNotification();
    }, 5000);
  }
}

function hideErrorNotification() {
  const errorNotification = document.getElementById('error-notification');
  if (errorNotification) {
    errorNotification.style.display = 'none';
  }
}

(window as any).closeModal = closeModal;
(window as any).hideErrorNotification = hideErrorNotification;

function wireModal() {
  const coffeeTeaModal = document.getElementById("coffee-tea-modal") as HTMLElement;
  const coffeeTeaModalImg = document.getElementById("coffee-tea-modal-img") as HTMLImageElement;
  const coffeeTeaModalTitle = document.getElementById("coffee-tea-modal-title") as HTMLElement;
  const coffeeTeaModalDesc = document.getElementById("coffee-tea-modal-description") as HTMLElement;
  const coffeeTeaTotalPrice = document.getElementById("coffee-tea-total-price") as HTMLElement;

  const dessertModal = document.getElementById("dessert-modal") as HTMLElement;
  const dessertModalImg = document.getElementById("dessert-modal-img") as HTMLImageElement;
  const dessertModalTitle = document.getElementById("dessert-modal-title") as HTMLElement;
  const dessertModalDesc = document.getElementById("dessert-modal-description") as HTMLElement;
  const dessertTotalPrice = document.getElementById("dessert-total-price") as HTMLElement;

  document.querySelector(".main-content")?.addEventListener("click", (e) => {
    const card = (e.target as HTMLElement).closest(".menu-item") as HTMLElement | null;
    if (!card) return;

    const img = card.querySelector("img") as HTMLImageElement;
    const title = card.querySelector("h3")?.textContent ?? "";
    const desc = card.querySelector(".child-description")?.textContent ?? "";
    const basePrice = parseFloat(card.querySelector(".child-price")?.textContent?.replace("$", "") ?? "0");
    const category = card.getAttribute("data-category") || "";
    const itemId = parseInt(card.getAttribute("data-id") || "0");

    if (category === "dessert") {
      dessertModal.style.display = "block";
      showModalLoader("dessert-modal");
      
      setTimeout(() => {
        try {
          dessertModalImg.src = img.src;
          dessertModalImg.alt = img.alt;
          dessertModalTitle.textContent = title;
          dessertModalDesc.textContent = desc;

          dessertModal.querySelectorAll(".modal-btn").forEach(btn => {
            btn.classList.remove("selected");
            if (btn.hasAttribute("data-size") && btn.getAttribute("data-size") === "S") {
              btn.classList.add("selected");
            }
          });

          dessertModal.setAttribute("data-base-price", basePrice.toString());
          dessertModal.setAttribute("data-item-id", itemId.toString());
          dessertModal.setAttribute("data-category", category);
          updateModalPrice("dessert-modal", basePrice);

          hideModalLoader("dessert-modal");
        } catch (error) {
          console.error('Error loading dessert modal:', error);
          hideModalLoader("dessert-modal");
          closeModal("dessert-modal");
          showErrorNotification();
        }
      }, 1000);
    } else {
      coffeeTeaModal.style.display = "block";
      showModalLoader("coffee-tea-modal");
      
      setTimeout(() => {
        try {
          coffeeTeaModalImg.src = img.src;
          coffeeTeaModalImg.alt = img.alt;
          coffeeTeaModalTitle.textContent = title;
          coffeeTeaModalDesc.textContent = desc;

          coffeeTeaModal.querySelectorAll(".modal-btn").forEach(btn => {
            btn.classList.remove("selected");
            if (btn.hasAttribute("data-size") && btn.getAttribute("data-size") === "S") {
              btn.classList.add("selected");
            }
          });

          coffeeTeaModal.setAttribute("data-base-price", basePrice.toString());
          coffeeTeaModal.setAttribute("data-item-id", itemId.toString());
          coffeeTeaModal.setAttribute("data-category", category);
          updateModalPrice("coffee-tea-modal", basePrice);

          hideModalLoader("coffee-tea-modal");
        } catch (error) {
          console.error('Error loading coffee/tea modal:', error);
          hideModalLoader("coffee-tea-modal");
          closeModal("coffee-tea-modal");
          showErrorNotification();
        }
      }, 1000);
    }

    document.body.style.overflow = "hidden";
  });

  coffeeTeaModal.querySelector(".modal-add-to-cart-btn")?.addEventListener("click", () => {
    const basePrice = parseFloat(coffeeTeaModal.getAttribute("data-base-price") || "0");
    const totalPrice = calculatePrice("coffee-tea-modal", basePrice);
    const title = coffeeTeaModalTitle.textContent || "";
    const itemId = parseInt(coffeeTeaModal.getAttribute("data-item-id") || "0");
    const category = coffeeTeaModal.getAttribute("data-category") || "coffee";
    
    const selectedSize = coffeeTeaModal.querySelector('.modal-btn.selected[data-size]')?.textContent || "S";
    const selectedAdditives = Array.from(coffeeTeaModal.querySelectorAll('.modal-btn.selected[data-number]'))
      .map(btn => btn.textContent)
      .join(", ");
    
    addToCart({
      id: itemId,
      name: title,
      price: totalPrice,
      size: selectedSize,
      additives: selectedAdditives || "None",
      category: category
    });
    
    closeModal("coffee-tea-modal");
  });

  dessertModal.querySelector(".modal-add-to-cart-btn")?.addEventListener("click", () => {
    const basePrice = parseFloat(dessertModal.getAttribute("data-base-price") || "0");
    const totalPrice = calculatePrice("dessert-modal", basePrice);
    const title = dessertModalTitle.textContent || "";
    const itemId = parseInt(dessertModal.getAttribute("data-item-id") || "0");
    const category = dessertModal.getAttribute("data-category") || "dessert";
    
    const selectedSize = dessertModal.querySelector('.modal-btn.selected[data-size]')?.textContent || "S";
    const selectedAdditives = Array.from(dessertModal.querySelectorAll('.modal-btn.selected[data-number]'))
      .map(btn => btn.textContent)
      .join(", ");
    
    addToCart({
      id: itemId,
      name: title,
      price: totalPrice,
      size: selectedSize,
      additives: selectedAdditives || "None",
      category: category
    });
    
    closeModal("dessert-modal");
  });

  coffeeTeaModal.addEventListener("click", (ev) => {
    if (ev.target === coffeeTeaModal) {
      closeModal("coffee-tea-modal");
    }
  });

  dessertModal.addEventListener("click", (ev) => {
    if (ev.target === dessertModal) {
      closeModal("dessert-modal");
    }
  });

  document.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape") {
      if (coffeeTeaModal.style.display === "block") {
        closeModal("coffee-tea-modal");
      } else if (dessertModal.style.display === "block") {
        closeModal("dessert-modal");
      }
    }
  });

  coffeeTeaModal.querySelectorAll(".modal-btn").forEach((btn) => {
    btn.addEventListener("click", (ev) => {
      ev.stopPropagation();
      const el = ev.currentTarget as HTMLElement;
      if (el.hasAttribute("data-size")) {
        el.closest(".modal-options")?.querySelectorAll(".modal-btn").forEach(b => b.classList.remove("selected"));
        el.classList.add("selected");
      } else if (el.hasAttribute("data-number")) {
        el.classList.toggle("selected");
      }
      
      const basePrice = parseFloat(coffeeTeaModal.getAttribute("data-base-price") || "0");
      updateModalPrice("coffee-tea-modal", basePrice);
    });
  });

  dessertModal.querySelectorAll(".modal-btn").forEach((btn) => {
    btn.addEventListener("click", (ev) => {
      ev.stopPropagation();
      const el = ev.currentTarget as HTMLElement;
      if (el.hasAttribute("data-size")) {
        el.closest(".modal-options")?.querySelectorAll(".modal-btn").forEach(b => b.classList.remove("selected"));
        el.classList.add("selected");
      } else if (el.hasAttribute("data-number")) {
        el.classList.toggle("selected");
      }
      
      const basePrice = parseFloat(dessertModal.getAttribute("data-base-price") || "0");
      updateModalPrice("dessert-modal", basePrice);
    });
  });
}

function switchTab(to: "coffee" | "tea" | "dessert") {
  const tabs = document.querySelectorAll<HTMLButtonElement>(".menu-btn");
  const [coffeeBtn, teaBtn, dessertBtn] = Array.from(tabs);
  const map: Record<typeof to, {content: HTMLElement|null, btn: HTMLButtonElement}> = {
    coffee: { content: document.getElementById("coffee-content"), btn: coffeeBtn },
    tea: { content: document.getElementById("tea-content"), btn: teaBtn },
    dessert: { content: document.getElementById("dessert-content"), btn: dessertBtn }
  };

  tabs.forEach(b => b?.classList.remove("active"));
  map[to].btn?.classList.add("active");

  (document.getElementById("coffee-content") as HTMLElement).style.display = (to === "coffee") ? "grid" : "none";
  (document.getElementById("tea-content") as HTMLElement).style.display    = (to === "tea") ? "grid" : "none";
  (document.getElementById("dessert-content") as HTMLElement).style.display= (to === "dessert") ? "grid" : "none";

  (document.getElementById("coffee-load-more") as HTMLElement).style.display  = (to === "coffee") ? "" : "none";
  (document.getElementById("tea-load-more") as HTMLElement).style.display     = (to === "tea") ? "" : "none";
  (document.getElementById("dessert-load-more") as HTMLElement).style.display = (to === "dessert") ? "" : "none";

  resetHidden("coffee");
  resetHidden("tea");
  resetHidden("dessert");
}

(window as any).loadMore = function(category: "coffee" | "tea" | "dessert") {
  const content = document.getElementById(`${category}-content`);
  const btnWrap = document.getElementById(`${category}-load-more`);
  if (!content || !btnWrap) return;
  content.querySelectorAll(".menu-item.hidden").forEach(el => el.classList.remove("hidden"));
  btnWrap.style.display = "none";
};

window.addEventListener("DOMContentLoaded", async () => {
  updateNavigationAuthStatus();
  
  cart = getCartFromStorage();
  updateCartCount();

  const [coffeeBtn, teaBtn, dessertBtn] = Array.from(document.querySelectorAll<HTMLButtonElement>(".menu-btn"));
  coffeeBtn?.addEventListener("click", () => switchTab("coffee"));
  teaBtn?.addEventListener("click", () => switchTab("tea"));
  dessertBtn?.addEventListener("click", () => switchTab("dessert"));

  const coffeeRoot = document.getElementById("coffee-content");
  if (coffeeRoot) coffeeRoot.innerHTML = `<div class="fs-loader"><div class="fs-spinner" aria-label="Loading products"></div></div>`;

  try {
    const all = await getMenuProducts();

    const coffee  = all.filter(p => (p.category || "").toLowerCase() === "coffee");
    const tea     = all.filter(p => (p.category || "").toLowerCase() === "tea");
    const dessert = all.filter(p => (p.category || "").toLowerCase() === "dessert");

    renderSection("coffee", coffee);
    renderSection("tea", tea);
    renderSection("dessert", dessert);

    switchTab("coffee");

    wireModal();

  } catch (e) {
    console.error(e);
    if (coffeeRoot) coffeeRoot.innerHTML = `<div class="fs-error">Something went wrong. Please, refresh the page</div>`;
  }
});
