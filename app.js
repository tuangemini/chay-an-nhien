/**
 * NHÀ HÀNG CHAY AN NHIÊN - VIỆT TRÌ
 * Ứng dụng Website Hiện Đại, Tương Tác & Chánh Niệm
 * 135 Đường Nguyễn Tất Thành, P. Thanh Miếu, TP. Việt Trì, Phú Thọ
 * Hotline: 0935 388 399 | Maps: https://maps.app.goo.gl/jiUzPeL6tQKrjULy9
 */

document.addEventListener("DOMContentLoaded", () => {
  // =========================================================================
  // 1. STATE MANAGEMENT
  // =========================================================================
  let cart = [];
  try {
    const savedCart = localStorage.getItem("chay_an_nhien_cart");
    if (savedCart) cart = JSON.parse(savedCart);
  } catch (e) {
    cart = [];
  }

  let currentCategory = "all";
  let searchKeyword = "";
  let currentQuoteIndex = 0;

  // Audio Context for Zen Tibetan Singing Bowl (Web Audio API)
  let audioCtx = null;

  // =========================================================================
  // 2. DOM ELEMENTS
  // =========================================================================
  const btnZenBell = document.getElementById("btnZenBell");
  const btnThemeToggle = document.getElementById("btnThemeToggle");
  const liveOpenStatus = document.getElementById("liveOpenStatus");
  const menuSearchInput = document.getElementById("menuSearchInput");
  const categoryPills = document.querySelectorAll(".cat-pill");
  const menuGrid = document.getElementById("menuGrid");
  const menuEmptyState = document.getElementById("menuEmptyState");
  const btnResetMenu = document.getElementById("btnResetMenu");

  // Cart Drawer Elements
  const btnOpenCartDrawer = document.getElementById("btnOpenCartDrawer");
  const btnCloseCartDrawer = document.getElementById("btnCloseCartDrawer");
  const cartDrawerOverlay = document.getElementById("cartDrawerOverlay");
  const cartItemsContainer = document.getElementById("cartItemsContainer");
  const cartTotalAmount = document.getElementById("cartTotalAmount");
  const cartCountBadge = document.getElementById("cartCountBadge");
  const btnCheckoutZalo = document.getElementById("btnCheckoutZalo");

  // Reservation Modal Elements
  const btnOpenReserveModal = document.getElementById("btnOpenReserveModal");
  const btnHeroReserve = document.getElementById("btnHeroReserve");
  const btnSpaceReserve = document.getElementById("btnSpaceReserve");
  const btnCloseReserveModal = document.getElementById("btnCloseReserveModal");
  const reserveModalOverlay = document.getElementById("reserveModalOverlay");
  const reserveForm = document.getElementById("reserveForm");
  const resTimeInput = document.getElementById("resTime");

  // Mindful Quotes Elements
  const btnDrawCard = document.getElementById("btnDrawCard");
  const mindfulCardDisplay = document.getElementById("mindfulCardDisplay");
  const activeQuoteText = document.getElementById("activeQuoteText");
  const activeQuoteAuthor = document.getElementById("activeQuoteAuthor");

  // Reviews & Utilities Elements
  const reviewsGrid = document.getElementById("reviewsGrid");
  const btnCopyAddress = document.getElementById("btnCopyAddress");
  const toastContainer = document.getElementById("toastContainer");
  const navLinks = document.querySelectorAll(".nav-item");

  // =========================================================================
  // 3. TOAST NOTIFICATION SYSTEM
  // =========================================================================
  function showToast(message, icon = "🪷") {
    if (!toastContainer) return;
    const toast = document.createElement("div");
    toast.className = "zen-toast";
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => toast.remove(), 320);
    }, 3500);
  }

  // =========================================================================
  // 4. WEB AUDIO API - TIBETAN SINGING BOWL CHIME (THỈNH CHUÔNG AN LẠC)
  // =========================================================================
  function playZenBellSound() {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!audioCtx) {
        audioCtx = new AudioContextClass();
      }
      if (audioCtx.state === "suspended") {
        audioCtx.resume();
      }

      const now = audioCtx.currentTime;

      // Frequencies for soothing singing bowl harmonic resonance
      const freqs = [432, 864, 1296, 2160];
      const gains = [0.45, 0.25, 0.12, 0.05];

      freqs.forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = "sine";
        // Subtle natural detuning
        osc.frequency.setValueAtTime(freq + (i * 1.5 - 2), now);

        // Exponential decay envelope simulating bronze Tibetan bowl
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(gains[i], now + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(now);
        osc.stop(now + 4.0);
      });

      // Visual feedback on bell button
      if (btnZenBell) {
        btnZenBell.style.transform = "scale(1.15)";
        btnZenBell.style.boxShadow = "0 0 25px rgba(244, 114, 182, 0.7)";
        setTimeout(() => {
          btnZenBell.style.transform = "";
          btnZenBell.style.boxShadow = "";
        }, 400);
      }

      showToast("Thở vào tâm tĩnh lặng, thở ra miệng mỉm cười...", "🔔");
    } catch (err) {
      console.warn("Web Audio not supported or blocked:", err);
      showToast("Chuông an lạc: Thân tâm an định, vạn sự hanh thông!", "🪷");
    }
  }

  if (btnZenBell) {
    btnZenBell.addEventListener("click", playZenBellSound);
  }

  // =========================================================================
  // 5. THEME TOGGLE (DARK / LIGHT MODE)
  // =========================================================================
  const savedTheme = localStorage.getItem("chay_an_nhien_theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);

  if (btnThemeToggle) {
    btnThemeToggle.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const nextTheme = currentTheme === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", nextTheme);
      localStorage.setItem("chay_an_nhien_theme", nextTheme);
      showToast(
        nextTheme === "light"
          ? "Đã chuyển sang giao diện Sáng Thanh Lương"
          : "Đã chuyển sang giao diện Tối Tĩnh Lặng",
        "🌓"
      );
    });
  }

  // =========================================================================
  // 6. LIVE OPENING HOURS CHECKER
  // =========================================================================
  function updateLiveOpeningHours() {
    if (!liveOpenStatus) return;
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTimeVal = hours + minutes / 60;

    // Restaurant operates from 07:00 to 21:30 daily
    const openTime = 7.0;
    const closeTime = 21.5;

    if (currentTimeVal >= openTime && currentTimeVal < closeTime) {
      liveOpenStatus.innerHTML = `<span style="color:var(--zen-leaf); font-weight:800;">● Đang Mở Cửa Đón Khách</span> (07:00 – 21:30)`;
    } else {
      liveOpenStatus.innerHTML = `<span style="color:#f59e0b; font-weight:700;">○ Nhà Hàng Tạm Nghỉ</span> (Mở cửa 07:00 – 21:30 sáng mai)`;
    }
  }
  updateLiveOpeningHours();

  // =========================================================================
  // 7. MENU RENDERING & FILTERING
  // =========================================================================
  function formatMoney(amount) {
    return new Intl.NumberFormat("vi-VN").format(amount) + "đ";
  }

  function updateCategoryBadges() {
    const counts = {
      all: CHAY_MENU.length,
      hotpot: 0,
      "rice-noodle": 0,
      appetizer: 0,
      "main-dish": 0,
      buffet: 0,
      drinks: 0
    };

    CHAY_MENU.forEach((item) => {
      if (counts[item.category] !== undefined) {
        counts[item.category]++;
      }
    });

    const badgeMap = {
      all: document.getElementById("countAll"),
      hotpot: document.getElementById("countHotpot"),
      "rice-noodle": document.getElementById("countRice"),
      appetizer: document.getElementById("countAppetizer"),
      "main-dish": document.getElementById("countMain"),
      buffet: document.getElementById("countBuffet"),
      drinks: document.getElementById("countDrinks")
    };

    Object.keys(counts).forEach((cat) => {
      if (badgeMap[cat]) {
        badgeMap[cat].textContent = counts[cat];
      }
    });
  }

  function renderMenu() {
    if (!menuGrid) return;

    const filtered = CHAY_MENU.filter((item) => {
      const matchCategory =
        currentCategory === "all" || item.category === currentCategory;

      if (!searchKeyword.trim()) return matchCategory;

      const normSearch = searchKeyword.toLowerCase().trim();
      const matchName = item.name.toLowerCase().includes(normSearch);
      const matchDesc = item.desc.toLowerCase().includes(normSearch);
      const matchCatName = item.categoryName.toLowerCase().includes(normSearch);
      const matchTags = item.tags.some((t) =>
        t.toLowerCase().includes(normSearch)
      );

      return matchCategory && (matchName || matchDesc || matchCatName || matchTags);
    });

    if (filtered.length === 0) {
      menuGrid.innerHTML = "";
      if (menuEmptyState) menuEmptyState.style.display = "block";
      return;
    }

    if (menuEmptyState) menuEmptyState.style.display = "none";

    menuGrid.innerHTML = filtered
      .map((item) => {
        const inCartItem = cart.find((c) => c.id === item.id);
        const qtyInCart = inCartItem ? inCartItem.qty : 0;

        return `
          <article class="menu-card" data-dish-id="${item.id}">
            <div class="menu-card-top">
              <div class="menu-thumb">
                <img src="${item.image}" alt="${item.name}" loading="lazy">
              </div>
              <div class="menu-info">
                ${
                  item.badge
                    ? `<span class="menu-dish-badge">🪷 ${item.badge}</span>`
                    : `<span class="menu-dish-badge" style="color:var(--text-dim);">${item.categoryName}</span>`
                }
                <h3 class="menu-dish-name">${item.name}</h3>
                <p class="menu-dish-desc">${item.desc}</p>
              </div>
            </div>

            <div class="menu-tags">
              ${item.tags.map((t) => `<span class="zen-tag">#${t}</span>`).join("")}
            </div>

            <div class="menu-card-bottom">
              <span class="menu-price">${item.priceDisplay || formatMoney(item.price)}</span>
              
              <button class="btn-add-dish" data-add-id="${item.id}">
                ${
                  qtyInCart > 0
                    ? `<span>✓ Đã Chọn (${qtyInCart})</span>`
                    : `<span>+ Thêm Vào Mâm</span>`
                }
              </button>
            </div>
          </article>
        `;
      })
      .join("");

    // Attach event listeners to Add buttons
    const addButtons = menuGrid.querySelectorAll("[data-add-id]");
    addButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const dishId = btn.getAttribute("data-add-id");
        addToCart(dishId);
      });
    });
  }

  // Spotlight cards "Thêm Vào Mâm" buttons
  const spotlightAddButtons = document.querySelectorAll(".btn-spotlight-add");
  spotlightAddButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const dishId = btn.getAttribute("data-add-dish");
      if (dishId) {
        addToCart(dishId);
        openCartDrawer();
      }
    });
  });

  // Search input handler
  if (menuSearchInput) {
    menuSearchInput.addEventListener("input", (e) => {
      searchKeyword = e.target.value;
      renderMenu();
    });
  }

  // Category pills handler
  categoryPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      categoryPills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      currentCategory = pill.getAttribute("data-cat");
      renderMenu();
    });
  });

  // Reset menu search & filter
  if (btnResetMenu) {
    btnResetMenu.addEventListener("click", () => {
      currentCategory = "all";
      searchKeyword = "";
      if (menuSearchInput) menuSearchInput.value = "";
      categoryPills.forEach((p) => {
        if (p.getAttribute("data-cat") === "all") p.classList.add("active");
        else p.classList.remove("active");
      });
      renderMenu();
    });
  }

  // =========================================================================
  // 8. CART DRAWER OPERATIONS
  // =========================================================================
  function saveCart() {
    try {
      localStorage.setItem("chay_an_nhien_cart", JSON.stringify(cart));
    } catch (e) {
      console.error("Cart save error:", e);
    }
  }

  function updateCartUI() {
    // Total count of individual items
    const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
    if (cartCountBadge) {
      cartCountBadge.textContent = totalCount;
      if (totalCount > 0) {
        cartCountBadge.style.transform = "scale(1.2)";
        setTimeout(() => (cartCountBadge.style.transform = "scale(1)"), 250);
      }
    }

    // Render cart items inside drawer
    if (!cartItemsContainer) return;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="cart-empty-view">
          <span>🪷</span>
          <p>Mâm món ăn của bạn đang trống.</p>
          <p style="font-size:0.8rem; margin-top:6px; color:var(--zen-leaf);">Hãy chọn những món chay thanh đạm từ thực đơn để thưởng thức nhé!</p>
        </div>
      `;
      if (cartTotalAmount) cartTotalAmount.textContent = "0đ";
      return;
    }

    let grandTotal = 0;
    cartItemsContainer.innerHTML = cart
      .map((item) => {
        const itemSubtotal = item.price * item.qty;
        grandTotal += itemSubtotal;
        return `
          <div class="cart-item-card" data-cart-item-id="${item.id}">
            <div class="cart-item-info">
              <div class="cart-item-name">${item.name}</div>
              <div class="cart-item-price">${formatMoney(item.price)} &times; ${item.qty} = <span style="color:var(--text-main); font-weight:800;">${formatMoney(itemSubtotal)}</span></div>
            </div>
            
            <div class="cart-qty-ctrl">
              <button class="qty-btn" data-cart-decr="${item.id}" title="Giảm số lượng">&minus;</button>
              <span class="qty-val">${item.qty}</span>
              <button class="qty-btn" data-cart-incr="${item.id}" title="Tăng số lượng">&plus;</button>
            </div>
          </div>
        `;
      })
      .join("");

    if (cartTotalAmount) {
      cartTotalAmount.textContent = formatMoney(grandTotal);
    }

    // Attach quantity increment/decrement listeners
    cartItemsContainer.querySelectorAll("[data-cart-incr]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-cart-incr");
        changeCartQty(id, 1);
      });
    });

    cartItemsContainer.querySelectorAll("[data-cart-decr]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-cart-decr");
        changeCartQty(id, -1);
      });
    });
  }

  function addToCart(dishId) {
    const dish = CHAY_MENU.find((d) => d.id === dishId);
    if (!dish) return;

    const existing = cart.find((c) => c.id === dishId);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({
        id: dish.id,
        name: dish.name,
        price: dish.price,
        priceDisplay: dish.priceDisplay,
        image: dish.image,
        qty: 1
      });
    }

    saveCart();
    updateCartUI();
    renderMenu();
    showToast(`Đã thêm "${dish.name}" vào mâm!`, "🍲");
  }

  function changeCartQty(dishId, delta) {
    const item = cart.find((c) => c.id === dishId);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
      cart = cart.filter((c) => c.id !== dishId);
      showToast(`Đã bỏ món khỏi mâm`, "🍃");
    }

    saveCart();
    updateCartUI();
    renderMenu();
  }

  function openCartDrawer() {
    if (cartDrawerOverlay) cartDrawerOverlay.classList.add("active");
  }

  function closeCartDrawer() {
    if (cartDrawerOverlay) cartDrawerOverlay.classList.remove("active");
  }

  if (btnOpenCartDrawer) btnOpenCartDrawer.addEventListener("click", openCartDrawer);
  if (btnCloseCartDrawer) btnCloseCartDrawer.addEventListener("click", closeCartDrawer);

  if (cartDrawerOverlay) {
    cartDrawerOverlay.addEventListener("click", (e) => {
      if (e.target === cartDrawerOverlay) closeCartDrawer();
    });
  }

  // Zalo Order Checkout
  if (btnCheckoutZalo) {
    btnCheckoutZalo.addEventListener("click", () => {
      if (cart.length === 0) {
        showToast("Mâm món ăn của bạn chưa có món nào. Xin hãy chọn món trước!", "⚠️");
        return;
      }

      let orderText = `Kính gửi Nhà hàng Chay An Nhiên (135 Nguyễn Tất Thành, Việt Trì):\nTôi muốn đặt thực đơn sau:\n`;
      let total = 0;
      cart.forEach((item, idx) => {
        const lineTotal = item.price * item.qty;
        total += lineTotal;
        orderText += `${idx + 1}. ${item.name} x${item.qty} = ${formatMoney(lineTotal)}\n`;
      });
      orderText += `Tổng cộng: ${formatMoney(total)}\nHotline liên hệ xác nhận: 0935 388 399`;

      // Copy order summary to clipboard for convenience
      if (navigator.clipboard) {
        navigator.clipboard.writeText(orderText).catch(() => {});
      }

      // Open Zalo chat with the restaurant owner hotline
      const zaloUrl = `https://zalo.me/0935388399`;
      window.open(zaloUrl, "_blank");
      showToast("Đang mở Zalo kết nối với Chay An Nhiên (0935 388 399)...", "💬");
    });
  }

  // =========================================================================
  // 9. TABLE RESERVATION MODAL
  // =========================================================================
  function openReserveModal() {
    if (reserveModalOverlay) {
      reserveModalOverlay.classList.add("active");

      // Set default reservation datetime to today or tomorrow at 11:30 or 18:30
      if (resTimeInput && !resTimeInput.value) {
        const d = new Date();
        d.setMinutes(d.getMinutes() + 120); // 2 hours from now
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        const hours = String(d.getHours()).padStart(2, "0");
        const mins = String(Math.floor(d.getMinutes() / 15) * 15).padStart(2, "0");
        resTimeInput.value = `${year}-${month}-${day}T${hours}:${mins}`;
      }
    }
  }

  function closeReserveModal() {
    if (reserveModalOverlay) reserveModalOverlay.classList.remove("active");
  }

  if (btnOpenReserveModal) btnOpenReserveModal.addEventListener("click", openReserveModal);
  if (btnHeroReserve) btnHeroReserve.addEventListener("click", openReserveModal);
  if (btnSpaceReserve) btnSpaceReserve.addEventListener("click", openReserveModal);
  if (btnCloseReserveModal) btnCloseReserveModal.addEventListener("click", closeReserveModal);

  if (reserveModalOverlay) {
    reserveModalOverlay.addEventListener("click", (e) => {
      if (e.target === reserveModalOverlay) closeReserveModal();
    });
  }

  // Handle Reservation Form Submit
  if (reserveForm) {
    reserveForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("resName")?.value || "";
      const phone = document.getElementById("resPhone")?.value || "";
      const guests = document.getElementById("resGuests")?.value || "4";
      const type = document.getElementById("resType")?.value || "daily";
      const time = document.getElementById("resTime")?.value || "";
      const note = document.getElementById("resNote")?.value || "";

      const typeLabels = {
        daily: "Bữa ăn gia đình thông thường",
        buffet: "Tiệc Buffet Ngày Rằm / Mùng 1",
        "co-chay": "Mâm cỗ chay cúng gia tiên mang về",
        party: "Tiệc sinh nhật / Báo hiếu"
      };

      const bookingRecord = {
        name,
        phone,
        guests,
        type: typeLabels[type] || type,
        time,
        note,
        createdAt: new Date().toISOString()
      };

      // Save to local storage
      try {
        const history = JSON.parse(
          localStorage.getItem("chay_an_nhien_reservations") || "[]"
        );
        history.push(bookingRecord);
        localStorage.setItem(
          "chay_an_nhien_reservations",
          JSON.stringify(history)
        );
      } catch (err) {
        console.error("Reservation save error:", err);
      }

      closeReserveModal();
      reserveForm.reset();

      showToast(
        `Hoan hỷ cảm ơn ${name}! Nhà hàng Chay An Nhiên đã nhận thông tin đặt chỗ. Nhân viên sẽ liên hệ lại qua số ${phone}.`,
        "🙏"
      );

      // Offer direct confirmation via Zalo
      setTimeout(() => {
        const confirmZalo = confirm(
          `Bạn có muốn mở Zalo để gửi trực tiếp thông tin đặt bàn đến Quản lý Chay An Nhiên (0935 388 399) ngay không?`
        );
        if (confirmZalo) {
          const zaloMsg = `Chào Nhà hàng Chay An Nhiên, tôi là ${name} (SĐT: ${phone}), muốn đặt bàn cho ${guests} người vào lúc ${time}. Ghi chú: ${note || "Không"}`;
          if (navigator.clipboard) {
            navigator.clipboard.writeText(zaloMsg).catch(() => {});
          }
          window.open("https://zalo.me/0935388399", "_blank");
        }
      }, 800);
    });
  }

  // =========================================================================
  // 10. MINDFUL QUOTE DRAWING (RÚT THẺ BÌNH AN)
  // =========================================================================
  if (btnDrawCard && mindfulCardDisplay && activeQuoteText && activeQuoteAuthor) {
    btnDrawCard.addEventListener("click", () => {
      // Gentle chime on card draw
      if (audioCtx) {
        try {
          const now = audioCtx.currentTime;
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.frequency.setValueAtTime(528, now); // 528 Hz - Love & Peace tone
          gain.gain.setValueAtTime(0.001, now);
          gain.gain.exponentialRampToValueAtTime(0.2, now + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now);
          osc.stop(now + 2.0);
        } catch (e) {}
      }

      // Flip animation
      mindfulCardDisplay.style.opacity = "0";
      mindfulCardDisplay.style.transform = "rotateY(90deg) scale(0.95)";

      setTimeout(() => {
        // Pick next or random quote
        let nextIndex;
        do {
          nextIndex = Math.floor(Math.random() * MINDFUL_QUOTES.length);
        } while (nextIndex === currentQuoteIndex && MINDFUL_QUOTES.length > 1);

        currentQuoteIndex = nextIndex;
        const q = MINDFUL_QUOTES[currentQuoteIndex];

        activeQuoteText.textContent = q.text;
        activeQuoteAuthor.textContent = `— ${q.author}`;

        mindfulCardDisplay.style.opacity = "1";
        mindfulCardDisplay.style.transform = "rotateY(0deg) scale(1)";
        showToast("Bạn vừa đón nhận một thông điệp an lành hôm nay!", "🪷");
      }, 300);
    });
  }

  // =========================================================================
  // 11. REVIEWS RENDERING
  // =========================================================================
  function renderReviews() {
    if (!reviewsGrid) return;

    reviewsGrid.innerHTML = REVIEWS_AN_NHIEN.map((rev) => {
      const starIcons = "★".repeat(rev.rating) + "☆".repeat(5 - rev.rating);
      return `
        <article class="review-card">
          <div>
            <div class="reviewer-header">
              <div class="reviewer-lotus-icon">🪷</div>
              <div>
                <h4 class="reviewer-name">${rev.name}</h4>
                <span class="review-time">${rev.time} &bull; Khách hàng đã ghé quán</span>
              </div>
            </div>
            <div class="review-stars">${starIcons}</div>
            <p class="review-comment">&ldquo;${rev.comment}&rdquo;</p>
          </div>
        </article>
      `;
    }).join("");
  }

  // =========================================================================
  // 12. COPY ADDRESS TO CLIPBOARD
  // =========================================================================
  if (btnCopyAddress) {
    btnCopyAddress.addEventListener("click", () => {
      const address = RESTAURANT_DATA.address;
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(address)
          .then(() => {
            showToast("Đã sao chép địa chỉ Nhà hàng Chay An Nhiên!", "📍");
          })
          .catch(() => {
            prompt("Địa chỉ Nhà hàng Chay An Nhiên:", address);
          });
      } else {
        prompt("Địa chỉ Nhà hàng Chay An Nhiên:", address);
      }
    });
  }

  // =========================================================================
  // 13. SMOOTH NAVIGATION & ACTIVE LINK HIGHLIGHT
  // =========================================================================
  const sections = document.querySelectorAll("section[id]");

  function updateActiveNavOnScroll() {
    const scrollY = window.pageYOffset;
    sections.forEach((sec) => {
      const secHeight = sec.offsetHeight;
      const secTop = sec.offsetTop - 120;
      const secId = sec.getAttribute("id");

      if (scrollY >= secTop && scrollY < secTop + secHeight) {
        navLinks.forEach((link) => {
          if (link.getAttribute("href") === `#${secId}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", updateActiveNavOnScroll, { passive: true });

  // Escape key closes modals and cart drawer
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCartDrawer();
      closeReserveModal();
    }
  });

  // =========================================================================
  // 14. INITIALIZATION
  // =========================================================================
  updateCategoryBadges();
  renderMenu();
  updateCartUI();
  renderReviews();
});
