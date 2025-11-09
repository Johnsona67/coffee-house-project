export type Language = "EN" | "GEO" | "RU";

export const languageToLocale: Record<Language, string> = {
  EN: "en-US",
  GEO: "ka-GE",
  RU: "ru-RU",
};

const STORAGE_KEY = "language";

export type TranslationKey =
  | "nav.favoriteCoffee"
  | "nav.about"
  | "nav.mobileApp"
  | "nav.contactUs"
  | "nav.menu"
  | "nav.cart"
  | "nav.logout"
  | "home.heroHeading"
  | "home.heroDescription"
  | "home.heroCta"
  | "home.carouselTitle"
  | "home.aboutHeading"
  | "home.downloadHeading"
  | "home.downloadDescription"
  | "home.downloadAvailable"
  | "home.downloadAppStore"
  | "home.downloadGooglePlay"
  | "home.footerHeadline"
  | "home.footerSubheadline"
  | "home.footerWorkingHours"
  | "home.footerLocation"
  | "home.footerPhone"
  | "home.socialTwitter"
  | "home.socialInstagram"
  | "home.socialFacebook"
  | "menu.pageHeading"
  | "menu.menuHeadlinePrefix"
  | "menu.menuHeadlineAccent"
  | "menu.filter.coffee"
  | "menu.filter.tea"
  | "menu.filter.dessert"
  | "menu.loadMore"
  | "menu.errorMessage"
  | "menu.modalLoading"
  | "menu.modal.size"
  | "menu.modal.additives"
  | "menu.modalCoffeeDisclaimer"
  | "menu.modalDessertDisclaimer"
  | "menu.addToCart"
  | "menu.additive.sugar"
  | "menu.additive.cinnamon"
  | "menu.additive.syrup"
  | "menu.additive.berries"
  | "menu.additive.nuts"
  | "menu.additive.jam"
  | "cart.title"
  | "cart.emptyTitle"
  | "cart.emptySubtitle"
  | "cart.emptyCta"
  | "cart.totalLabel"
  | "cart.signIn"
  | "cart.register"
  | "cart.confirmOrder"
  | "cart.placingOrder"
  | "cart.orderThankYou"
  | "cart.orderFollowup"
  | "auth.signinTitle"
  | "auth.registerTitle"
  | "auth.signinSubtitle"
  | "auth.registerSubtitle"
  | "auth.emailLabel"
  | "auth.passwordLabel"
  | "auth.rememberMe"
  | "auth.forgotPassword"
  | "auth.signInButton"
  | "auth.registerButton"
  | "auth.nameLabel";

type TranslationTable = Record<TranslationKey, Record<Language, string>>;

const translations: TranslationTable = {
  "nav.favoriteCoffee": {
    EN: "Favorite coffee",
    GEO: "საყვარელი ყავა",
    RU: "Любимый кофе",
  },
  "nav.about": {
    EN: "About",
    GEO: "ჩვენ შესახებ",
    RU: "О нас",
  },
  "nav.mobileApp": {
    EN: "Mobile app",
    GEO: "მობილური აპი",
    RU: "Мобильное приложение",
  },
  "nav.contactUs": {
    EN: "Contact us",
    GEO: "დაგვიკავშირდით",
    RU: "Свяжитесь с нами",
  },
  "nav.menu": {
    EN: "Menu",
    GEO: "მენიუ",
    RU: "Меню",
  },
  "nav.cart": {
    EN: "Cart",
    GEO: "კალათა",
    RU: "Корзина",
  },
  "nav.logout": {
    EN: "Logout",
    GEO: "გასვლა",
    RU: "Выйти",
  },
  "home.heroHeading": {
    EN: "Enjoy <span class=\"accent\">premium coffee</span> at our charming cafe",
    GEO: "მიირთვით <span class=\"accent\">პემიუმ ყავა</span> ჩვენს მომხიბვლელ კაფეში",
    RU: "Наслаждайтесь <span class=\"accent\">премиальным кофе</span> в нашем уютном кафе",
  },
  "home.heroDescription": {
    EN: "With its inviting atmosphere and delicious coffee options, the Coffee House Resource is a popular destination for coffee lovers and those seeking a warm and inviting space to enjoy their favorite beverage.",
    GEO: "მისასალმებელი ატმოსფეროთი და გემრიელი ყავის არჩევანით Coffee House Resource არის პოპულარული ადგილი ყავის მოყვარულებისთვის და მათთვის, ვისაც სურს თბილი და სასიამოვნო სივრცე საყვარელი পানীয়ების მისაღებად.",
    RU: "Благодаря уютной атмосфере и вкусному кофе Coffee House Resource—популярное место для любителей кофе и тех, кто ищет теплое и гостеприимное пространство, чтобы насладиться любимым напитком.",
  },
  "home.heroCta": {
    EN: "Menu",
    GEO: "მენიუ",
    RU: "Меню",
  },
  "home.carouselTitle": {
    EN: "Choose your <span class=\"accent\">favorite</span> coffee",
    GEO: "აირჩიეთ თქვენი <span class=\"accent\">საყვარელი</span> ყავა",
    RU: "Выберите свой <span class=\"accent\">любимый</span> кофе",
  },
  "home.aboutHeading": {
    EN: "Resource is <span class=\"accent\">the perfect and cozy place</span> where you can enjoy a variety of hot beverages, relax, catch up with friends, or get some work done.",
    GEO: "Resource არის <span class=\"accent\">იდეალური და კომფორტული ადგილი</span>, სადაც შეგიძლიათ დაგემოვნოთ ცხელი სასმელები, დაისვენოთ, შეხვდეთ მეგობრებს ან იმუშავოთ.",
    RU: "Resource — это <span class=\"accent\">идеальное и уютное место</span>, где можно насладиться горячими напитками, отдохнуть, встретиться с друзьями или поработать.",
  },
  "home.downloadHeading": {
    EN: "Download <span class=\"accent\">our apps to start ordering</span>",
    GEO: "ჩამოტვირთეთ <span class=\"accent\">ჩვენი აპები შეკვეთის დასაწყებად</span>",
    RU: "Скачайте <span class=\"accent\">наши приложения, чтобы начать заказывать</span>",
  },
  "home.downloadDescription": {
    EN: "Download the Resource app today and experience the comfort of ordering your favorite coffee from wherever you are",
    GEO: "ჩამოტვირთეთ Resource აპი დღეს და ისიამოვნეთ თქვენი საყვარელი ყავის შეკვეთით ნებისმიერი ადგილიდან",
    RU: "Скачайте приложение Resource сегодня и наслаждайтесь удобством заказа любимого кофе где бы вы ни были",
  },
  "home.downloadAvailable": {
    EN: "Available on the",
    GEO: "ხელმისაწვდომია",
    RU: "Доступно в",
  },
  "home.downloadAppStore": {
    EN: "App Store",
    GEO: "App Store",
    RU: "App Store",
  },
  "home.downloadGooglePlay": {
    EN: "Google Play",
    GEO: "Google Play",
    RU: "Google Play",
  },
  "home.footerHeadline": {
    EN: "Sip, Savor, Smile.",
    GEO: "ყლუპი, გემო, ღიმილი.",
    RU: "Сделай глоток, смакуй, улыбнись.",
  },
  "home.footerSubheadline": {
    EN: "It's coffee time!",
    GEO: "ყავის დროა!",
    RU: "Время кофе!",
  },
  "home.footerWorkingHours": {
    EN: "Mon-Sat: 9:00 AM – 23:00 PM",
    GEO: "ორშ-შაბ: 09:00 – 23:00",
    RU: "Пн-Сб: 09:00 – 23:00",
  },
  "home.footerLocation": {
    EN: "8558 Green Rd., LA",
    GEO: "8558 გრინ როოუდი, ლა",
    RU: "8558 Грин Роуд, ЛА",
  },
  "home.footerPhone": {
    EN: "+1 (603) 555-0123",
    GEO: "+1 (603) 555-0123",
    RU: "+1 (603) 555-0123",
  },
  "home.socialTwitter": {
    EN: "Twitter",
    GEO: "ტვიტერი",
    RU: "Твиттер",
  },
  "home.socialInstagram": {
    EN: "Instagram",
    GEO: "ინსტაგრამი",
    RU: "Инстаграм",
  },
  "home.socialFacebook": {
    EN: "Facebook",
    GEO: "ფეისბუქი",
    RU: "Фейсбук",
  },
  "menu.pageHeading": {
    EN: "Menu",
    GEO: "მენიუ",
    RU: "Меню",
  },
  "menu.menuHeadlinePrefix": {
    EN: "Behind each of our cups hides an",
    GEO: "ჩვენს თითოეულ ყავის ჭიქაში იმალება",
    RU: "За каждой нашей чашкой скрывается",
  },
  "menu.menuHeadlineAccent": {
    EN: "amazing surprise",
    GEO: "დაუსავლელი სიურპრიზი",
    RU: "удивительный сюрприз",
  },
  "menu.filter.coffee": {
    EN: "Coffee",
    GEO: "ყავა",
    RU: "Кофе",
  },
  "menu.filter.tea": {
    EN: "Tea",
    GEO: "ჩაი",
    RU: "Чай",
  },
  "menu.filter.dessert": {
    EN: "Dessert",
    GEO: "დესერტი",
    RU: "Десерт",
  },
  "menu.loadMore": {
    EN: "Show more",
    GEO: "მეტი",
    RU: "Показать ещё",
  },
  "menu.errorMessage": {
    EN: "Something went wrong. Please, try again",
    GEO: "რამე არასწორად წავიდა. გთხოვთ, სცადოთ თავიდან",
    RU: "Что-то пошло не так. Повторите попытку",
  },
  "menu.modalLoading": {
    EN: "Loading product details...",
    GEO: "პროდუქტის დეტალების ჩატვირთვა...",
    RU: "Загрузка информации о продукте...",
  },
  "menu.modal.size": {
    EN: "Size",
    GEO: "ზომა",
    RU: "Размер",
  },
  "menu.modal.additives": {
    EN: "Additives",
    GEO: "დამატებები",
    RU: "Добавки",
  },
  "menu.modalCoffeeDisclaimer": {
    EN: "The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.",
    GEO: "ფასი საბოლოო არ არის. ჩამოტვირთეთ ჩვენი მობილური აპი საბოლოო ფასის სანახავად და შეკვეთის გასაკეთებლად. შეაგროვეთ ლოიალობის ქულები და ისიამოვნეთ საყვარელი ყავით 20%-მდე ფასდაკლებით.",
    RU: "Стоимость не окончательная. Скачайте наше мобильное приложение, чтобы увидеть финальную цену и оформить заказ. Получайте бонусы и наслаждайтесь любимым кофе со скидкой до 20%.",
  },
  "menu.modalDessertDisclaimer": {
    EN: "The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite dessert with up to 20% discount.",
    GEO: "ფასი საბოლოო არ არის. ჩამოტვირთეთ ჩვენი მობილური აპი საბოლოო ფასის სანახავად და შეკვეთის გასაკეთებლად. შეაგროვეთ ლოიალობის ქულები და ისიამოვნეთ საყვარელი დესერტით 20%-მდე ფასდაკლებით.",
    RU: "Стоимость не окончательная. Скачайте наше мобильное приложение, чтобы увидеть финальную цену и оформить заказ. Получайте бонусы и наслаждайтесь любимым десертом со скидкой до 20%.",
  },
  "menu.addToCart": {
    EN: "Add to cart",
    GEO: "კალათაში დამატება",
    RU: "Добавить в корзину",
  },
  "menu.additive.sugar": {
    EN: "Sugar",
    GEO: "შაქარი",
    RU: "Сахар",
  },
  "menu.additive.cinnamon": {
    EN: "Cinnamon",
    GEO: "დარიჩინი",
    RU: "Корица",
  },
  "menu.additive.syrup": {
    EN: "Syrup",
    GEO: "სიროფი",
    RU: "Сироп",
  },
  "menu.additive.berries": {
    EN: "Berries",
    GEO: "კენკრა",
    RU: "Ягоды",
  },
  "menu.additive.nuts": {
    EN: "Nuts",
    GEO: "თხილეული",
    RU: "Орехи",
  },
  "menu.additive.jam": {
    EN: "Jam",
    GEO: "ჯემი",
    RU: "Варенье",
  },
  "cart.title": {
    EN: "Cart",
    GEO: "კალათა",
    RU: "Корзина",
  },
  "cart.emptyTitle": {
    EN: "Your cart is empty",
    GEO: "თქვენი კალათა ცარიელია",
    RU: "Ваша корзина пуста",
  },
  "cart.emptySubtitle": {
    EN: "Add some delicious items from our menu!",
    GEO: "დაამატეთ რამდენიმე გემრიელი კერძი ჩვენი მენიუდან!",
    RU: "Добавьте вкусные позиции из нашего меню!",
  },
  "cart.emptyCta": {
    EN: "Browse Menu",
    GEO: "მენიუს ნახვა",
    RU: "Перейти в меню",
  },
  "cart.totalLabel": {
    EN: "Total:",
    GEO: "ჯამი:",
    RU: "Итого:",
  },
  "cart.signIn": {
    EN: "Sign in",
    GEO: "ავტორიზაცია",
    RU: "Войти",
  },
  "cart.register": {
    EN: "Register",
    GEO: "რეგისტრაცია",
    RU: "Регистрация",
  },
  "cart.confirmOrder": {
    EN: "Confirm order",
    GEO: "შეკვეთის დადასტურება",
    RU: "Подтвердить заказ",
  },
  "cart.placingOrder": {
    EN: "Placing order...",
    GEO: "შეკვეთის დამუშავება...",
    RU: "Оформление заказа...",
  },
  "cart.orderThankYou": {
    EN: "Thank you for your order!",
    GEO: "გმადლობთ შეკვეთისთვის!",
    RU: "Спасибо за заказ!",
  },
  "cart.orderFollowup": {
    EN: "We will contact you soon to confirm the details.",
    GEO: "დეტალების დასაზუსტებლად მალე დაგიკავშირდებით.",
    RU: "Мы скоро свяжемся с вами для уточнения деталей.",
  },
  "auth.signinTitle": {
    EN: "Sign in",
    GEO: "შესვლა",
    RU: "Вход",
  },
  "auth.registerTitle": {
    EN: "Create an account",
    GEO: "ანგარიშის შექმნა",
    RU: "Создание учетной записи",
  },
  "auth.signinSubtitle": {
    EN: "Welcome back! Please enter your details.",
    GEO: "კეთილი დაბრუნება! გთხოვთ შეიყვანოთ თქვენი მონაცემები.",
    RU: "С возвращением! Пожалуйста, введите ваши данные.",
  },
  "auth.registerSubtitle": {
    EN: "Join our coffee community to get the latest offers.",
    GEO: "შემოუერთდით ჩვენს ყავის საზოგადოებას ახალი შეთავაზებების მისაღებად.",
    RU: "Присоединяйтесь к нашему кофейному сообществу, чтобы получать свежие предложения.",
  },
  "auth.emailLabel": {
    EN: "Email",
    GEO: "ელფოსტა",
    RU: "Электронная почта",
  },
  "auth.passwordLabel": {
    EN: "Password",
    GEO: "პაროლი",
    RU: "Пароль",
  },
  "auth.rememberMe": {
    EN: "Remember me",
    GEO: "დამახსოვრება",
    RU: "Запомнить меня",
  },
  "auth.forgotPassword": {
    EN: "Forgot password?",
    GEO: "დაგავიწყდათ პაროლი?",
    RU: "Забыли пароль?",
  },
  "auth.signInButton": {
    EN: "Sign in",
    GEO: "შესვლა",
    RU: "Войти",
  },
  "auth.registerButton": {
    EN: "Register",
    GEO: "რეგისტრაცია",
    RU: "Регистрация",
  },
  "auth.nameLabel": {
    EN: "Full name",
    GEO: "სრული სახელი",
    RU: "Полное имя",
  },
};

let currentLanguage: Language = (() => {
  if (typeof window === "undefined") return "EN";
  const stored = window.localStorage.getItem(STORAGE_KEY) as Language | null;
  if (stored && stored in languageToLocale) {
    return stored;
  }
  return "EN";
})();

function getTranslation(key: TranslationKey, lang: Language): string {
  const record = translations[key];
  if (!record) {
    console.warn(`[i18n] Missing translation key: ${key}`);
    return key;
  }
  return record[lang] ?? record.EN ?? key;
}

export function getCurrentLanguage(): Language {
  return currentLanguage;
}

export function setLanguage(lang: Language): void {
  if (currentLanguage === lang) return;
  currentLanguage = lang;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.setAttribute("lang", languageToLocale[lang]);
    document.dispatchEvent(
      new CustomEvent<Language>("languagechange", { detail: lang })
    );
  }
}

export function t(key: TranslationKey, lang: Language = currentLanguage): string {
  return getTranslation(key, lang);
}

export function applyTranslations(root: ParentNode = document): void {
  const lang = currentLanguage;

  const textNodes = root.querySelectorAll<HTMLElement>("[data-translate]");
  textNodes.forEach((element) => {
    const key = element.getAttribute("data-translate") as TranslationKey | null;
    if (!key) return;
    element.textContent = getTranslation(key, lang);
  });

  const htmlNodes = root.querySelectorAll<HTMLElement>("[data-translate-html]");
  htmlNodes.forEach((element) => {
    const key = element.getAttribute("data-translate-html") as TranslationKey | null;
    if (!key) return;
    element.innerHTML = getTranslation(key, lang);
  });

  const placeholderNodes = root.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
    "[data-translate-placeholder]"
  );
  placeholderNodes.forEach((element) => {
    const key = element.getAttribute("data-translate-placeholder") as TranslationKey | null;
    if (!key) return;
    element.placeholder = getTranslation(key, lang);
  });
}

export function changeLanguage(lang: Language): void {
  if (!languageToLocale[lang]) return;
  setLanguage(lang);
  applyTranslations();
  syncLanguageSelectors();
}

if (typeof window !== "undefined") {
  (window as any).setAppLanguage = changeLanguage;
}

if (typeof window !== "undefined") {
  document.addEventListener("languagechange", () => {
    applyTranslations();
    syncLanguageSelectors();
  });

  document.addEventListener("DOMContentLoaded", () => {
    document.documentElement.setAttribute("lang", languageToLocale[currentLanguage]);
    applyTranslations();
    initLanguageSelectors();
  });
}

export function initLanguageSelectors(root: ParentNode = document): void {
  const buttons = root.querySelectorAll<HTMLButtonElement>("[data-lang-option]");
  if (!buttons.length) return;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const langAttr = button.getAttribute("data-lang-option");
      if (!langAttr) return;
      const lang = langAttr.toUpperCase() as Language;
      if (!languageToLocale[lang]) return;
      changeLanguage(lang);
    });
  });

  syncLanguageSelectors(root);
}

export function syncLanguageSelectors(root: ParentNode = document): void {
  const buttons = root.querySelectorAll<HTMLButtonElement>("[data-lang-option]");
  if (!buttons.length) return;

  const current = getCurrentLanguage();
  buttons.forEach((button) => {
    const langAttr = button.getAttribute("data-lang-option")?.toUpperCase() as Language | undefined;
    button.classList.toggle("active", langAttr === current);
  });
}

