// shop.js - standalone shop logic (no conflicts with main.js)

// ==================== PRODUCT DATA ====================
const PRODUCTS = [
    // Sets
    { 
        id: "set_dragon", 
        cat: "set", 
        name: "DragonBorn Set", 
        price: 100, 
        desc: "Embrace draconic fury and unlock the Dragon|Born title. Your blade calls the storm.", 
        perks: [
            "Unlocks DRAGON|BORN title",
            "Unbreakable Dragon scale armor set",
            "Fire resistance potions (infinite)",
            "Dragon breath weapon",
            "[LIGHTNING] Dragon Blade: Summon lightning on your target (20 mana cost)",
            "Bonus: +20,000 in-game money",
            "Bonus: +10,000 land claims"
        ], 
        image: "assets/dragonKit.png", 
        titleGrant: "Dragon|Born",
        unbreakable: true,
        specialSkill: "Summon lightning on view"
    },
    { 
        id: "set_berserker", 
        cat: "set", 
        name: "Berserker Set", 
        price: 120, 
        desc: "Unchained rage of the north — claim Berserker title. Enter a trance of destruction.", 
        perks: [
            "Unlocks BERSERKER title",
            "Unbreakable Berserker armor set",
            "Axe of the Wastes (unbreakable)",
            "Strength totem (reusable)",
            "[RAGE] Rage Mode: Temporary strength + speed buff (25 mana cost)",
            "Bonus: +20,000 in-game money",
            "Bonus: +10,000 land claims"
        ], 
        image: "assets/berserkerKit.png", 
        titleGrant: "Berserker",
        badge: "BEST",
        unbreakable: true,
        specialSkill: "Temporary strength + speed buff"
    },
    { 
        id: "set_starbound", 
        cat: "set", 
        name: "StarBound Set", 
        price: 200, 
        desc: "Cosmic wanderer's arsenal — StarBound title. Unleash the power of the stars.", 
        perks: [
            "Unlocks STARBOUND title",
            "Unbreakable Starlight cloak",
            "Voidstep boots (unbreakable)",
            "Nebula crystal (cosmic aura)",
            "[STARFALL] Summon lightning + TNT rain on target (30 mana cost)",
            "Hero of the Village effect (permanent + reputation)",
            "Bonus: +20,000 in-game money",
            "Bonus: +10,000 land claims"
        ], 
        image: "assets/starboundKit.png", 
        titleGrant: "StarBound",
        unbreakable: true,
        specialSkill: "Summon lightning + TNT + Hero of the Village"
    },
    // Wings
    { 
        id: "wing_seraph", 
        cat: "wing", 
        name: "Seraphs Halo", 
        price: 70, 
        desc: "Heavenly radiance — grants 15,000 server coins, plus divine particles.", 
        perks: [
            "+15,000 server coins",
            "Unbreakable wing elytra",
            "[SERAPHIC] Glowing feather particle trail",
            "+10,000 land claims",
            "+20,000 in-game money"
        ], 
        image: "assets/seraphsHalo.png", 
        coinReward: 15000,
        unbreakable: true
    },
    { 
        id: "wing_eclipse", 
        cat: "wing", 
        name: "Eclipse Crown", 
        price: 70, 
        desc: "Shadowed majesty — 15,000 coins. Eclipse particles follow your flight.", 
        perks: [
            "+15,000 server coins",
            "Unbreakable wing elytra",
            "[ECLIPSE] Shadow particle trail",
            "+10,000 land claims",
            "+20,000 in-game money"
        ], 
        image: "assets/eclipseCrown.png", 
        coinReward: 15000,
        badge: "RECOMMENDED",
        unbreakable: true
    },
    { 
        id: "wing_wyrm", 
        cat: "wing", 
        name: "Wyrmguard", 
        price: 70, 
        desc: "Draconic sentinel wings — 15,000 coins. Scales shimmer in flight.", 
        perks: [
            "+15,000 server coins",
            "Unbreakable wing elytra",
            "[WYRM] Scale particle effect",
            "+10,000 land claims",
            "+20,000 in-game money"
        ], 
        image: "assets/wyrmguard.png", 
        coinReward: 15000,
        unbreakable: true
    },
    { 
        id: "wing_archmage", 
        cat: "wing", 
        name: "Archmages Halo", 
        price: 70, 
        desc: "Arcane wisdom — 15,000 coins. Runic circles trail behind you.", 
        perks: [
            "+15,000 server coins",
            "Unbreakable wing elytra",
            "[ARCANE] Rune particle trail",
            "+10,000 land claims",
            "+20,000 in-game money"
        ], 
        image: "assets/archmageHalo.png", 
        coinReward: 15000,
        unbreakable: true
    },
    { 
        id: "wing_prism", 
        cat: "wing", 
        name: "Prism Sovereign", 
        price: 70, 
        desc: "Iridescent glory — 15,000 coins. Rainbow light shimmers as you soar.", 
        perks: [
            "+15,000 server coins",
            "Unbreakable wing elytra",
            "[PRISMATIC] Light particle trail",
            "+10,000 land claims",
            "+20,000 in-game money"
        ], 
        image: "assets/prismSovereign.png", 
        coinReward: 15000,
        unbreakable: true
    },
    { 
        id: "wing_cinder", 
        cat: "wing", 
        name: "Cinder Diadem", 
        price: 70, 
        desc: "Ashen phoenix — 15,000 coins. Embers rise from your wings.", 
        perks: [
            "+15,000 server coins",
            "Unbreakable wing elytra",
            "[CINDER] Ember particle trail",
            "+10,000 land claims",
            "+20,000 in-game money"
        ], 
        image: "assets/cinderDiadem.png", 
        coinReward: 15000,
        unbreakable: true
    },
    { 
        id: "wing_celestial", 
        cat: "wing", 
        name: "Celestial Aegis", 
        price: 70, 
        desc: "Starforged barrier — 15,000 coins. Constellations trace your flight path.", 
        perks: [
            "+15,000 server coins",
            "Unbreakable wing elytra",
            "[CELESTIAL] Stardust constellation particle trail",
            "+10,000 land claims",
            "+20,000 in-game money"
        ], 
        image: "assets/celestialAegis.png", 
        coinReward: 15000,
        unbreakable: true
    },
    // Boosters
    { 
        id: "boost_dragon", 
        cat: "booster", 
        name: "Dragon's Hoard", 
        price: 250, 
        desc: "Mountain of riches — 1,000,000 coins. The ultimate wealth booster.", 
        perks: [
            "+1,000,000 server coins",
            "Best value booster",
            "Legendary dragon hoard effect",
            "+50,000 land claims",
        ], 
        image: "assets/dragons-hoard.png",
        coinValue: 1000000
    },
    { 
        id: "boost_chest", 
        cat: "booster", 
        name: "Treasure Chest", 
        price: 150, 
        desc: "Bountiful loot — 350,000 coins. A chest full of gleaming riches.", 
        perks: [
            "+350,000 server coins",
            "Solid value booster",
            "35K land claims",
        ], 
        image: "assets/treasure-chest.png",
        coinValue: 350000,
        badge: "POPULAR"
    },
    { 
        id: "boost_satchel", 
        cat: "booster", 
        name: "Satchel", 
        price: 100, 
        desc: "Sturdy coin pouch — 150,000 coins. A reliable source of currency.", 
        perks: [
            "+150,000 server coins",
            "Good starter booster",
            "+25,000 land claims",
        ], 
        image: "assets/satchel.png",
        coinValue: 150000
    },
    { 
        id: "boost_pouch", 
        cat: "booster", 
        name: "Pouch", 
        price: 50, 
        desc: "Humble starter — 50,000 coins. Begin your fortune.", 
        perks: [
            "+50,000 server coins",
            "Entry-level booster",
            "+15,000 land claims",
        ], 
        image: "assets/pouch.png",
        coinValue: 50000
    }
];

// ==================== STATE ====================
let cart = [];
let activeFilter = "all";

// ==================== DOM ELEMENTS ====================
const productsGrid = document.getElementById("productsGrid");
const cartItemsDiv = document.getElementById("cartItems");
const cartFooterDiv = document.getElementById("cartFooter");
const cartTotalSpan = document.getElementById("cartTotal");
const cartCountSpan = document.getElementById("cartCount");
const toastMsg = document.getElementById("toastMsg");
const cartButton = document.getElementById("cartButton");

// ==================== HELPER: SHOW TOAST ====================
function showToast(message) {
    toastMsg.textContent = message;
    toastMsg.classList.add("show");
    setTimeout(() => toastMsg.classList.remove("show"), 2500);
}

// ==================== CLICK SOUND (use main.js function if available) ====================
const playShopClick = () => {
    if (typeof window.playClickSound === 'function') {
        window.playClickSound();
    }
};

// ==================== RENDER PRODUCTS ====================
function renderProducts() {
    const filtered = activeFilter === "all" ? PRODUCTS : PRODUCTS.filter(p => p.cat === activeFilter);
    productsGrid.innerHTML = "";
    filtered.forEach(p => {
        const card = document.createElement("div");
        card.className = "product-card";
        const perksHtml = p.perks.map(perk => `<li>${perk}</li>`).join("");
        const badgeHtml = p.badge ? `<div class="product-badge">${p.badge}</div>` : '';
        card.innerHTML = `
            ${badgeHtml}
            <div class="product-image-frame">
                <div class="product-rune-ring"></div>
                <img src="${p.image}" alt="${p.name}" class="product-img" loading="lazy">
            </div>
            <div class="product-info">
                <div class="product-name">${p.name}</div>
                <div class="product-category">${p.cat === "set" ? "SACRED SET" : p.cat === "wing" ? "WING" : "BOOSTER"}</div>
                <div class="product-desc">${p.desc}</div>
                <ul class="product-perks">${perksHtml}</ul>
                <div class="product-footer">
                    <div class="product-price">₱${p.price}</div>
                    <button class="buy-btn" data-id="${p.id}">Add to Cart</button>
                </div>
            </div>
        `;
        const img = card.querySelector(".product-img");
        if (img) img.onerror = () => { img.style.opacity = "0.5"; };
        card.querySelector(".buy-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            playShopClick();
            addToCart(p.id);
        });
        productsGrid.appendChild(card);
    });
    setTimeout(() => initScrollAnimations(), 50);
}

// ==================== CART FUNCTIONS ====================
function addToCart(id) {
    const product = PRODUCTS.find(p => p.id === id);
    if (cart.some(i => i.id === id)) {
        showToast(`${product.name} already in cart`);
        return;
    }
    cart.push({ ...product });
    updateCartUI();
    updateTitleAndCoinPreview();
    showToast(`${product.name} added to cart`);
    if (cartButton) {
        cartButton.classList.add('pulse');
        setTimeout(() => cartButton.classList.remove('pulse'), 400);
    }
}

function removeFromCart(id) {
    cart = cart.filter(i => i.id !== id);
    updateCartUI();
    updateTitleAndCoinPreview();
}

function updateCartUI() {
    const count = cart.length;
    if (cartCountSpan) {
        cartCountSpan.textContent = count;
        cartCountSpan.style.display = count ? "flex" : "none";
    }
    if (cart.length === 0) {
        if (cartItemsDiv) cartItemsDiv.innerHTML = '<div class="cart-empty">Your cart is empty.</div>';
        if (cartFooterDiv) cartFooterDiv.style.display = "none";
        return;
    }
    let html = "";
    let total = 0;
    cart.forEach(item => {
        total += item.price;
        html += `
            <div class="cart-item">
                <div>
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-cat">${item.cat}</div>
                </div>
                <div class="cart-item-price">₱${item.price}</div>
                <button class="remove-item" data-id="${item.id}">✕</button>
            </div>
        `;
    });
    if (cartItemsDiv) cartItemsDiv.innerHTML = html;
    if (cartTotalSpan) cartTotalSpan.textContent = `₱${total}`;
    if (cartFooterDiv) cartFooterDiv.style.display = "block";
    document.querySelectorAll(".remove-item").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = btn.getAttribute("data-id");
            playShopClick();
            removeFromCart(id);
        });
    });
}

// ==================== TITLE & COIN LOGIC ====================
function evaluateTitles(cartItems) {
    const totalSpend = cartItems.reduce((s, i) => s + i.price, 0);
    const setIds = cartItems.filter(i => i.cat === "set").map(k => k.id);
    const wingIds = cartItems.filter(i => i.cat === "wing").map(w => w.id);
    const boosterIds = cartItems.filter(i => i.cat === "booster").map(b => b.id);
    const hasDragonHoard = boosterIds.includes("boost_dragon");
    const setCount = setIds.length;
    const wingCount = wingIds.length;
    const hasAnySet = setCount > 0;
    const hasAnyWing = wingCount > 0;
    const hasAnyBooster = boosterIds.length > 0;
    const allThreeSets = setIds.includes("set_dragon") && setIds.includes("set_berserker") && setIds.includes("set_starbound");
    const allSevenWings = ["wing_seraph","wing_eclipse","wing_wyrm","wing_archmage","wing_prism","wing_cinder","wing_celestial"].every(id => wingIds.includes(id));
    const titles = [];
    if (setIds.includes("set_dragon")) titles.push("Dragon|Born");
    if (setIds.includes("set_berserker")) titles.push("Berserker");
    if (setIds.includes("set_starbound")) titles.push("StarBound");
    if (totalSpend <= 100 && totalSpend > 0) titles.push("Patron");
    if (totalSpend >= 100) titles.push("Benefactor");
    if (hasAnySet && hasAnyWing) titles.push("Live|Weaver");
    if (hasAnySet && hasAnyWing && hasAnyBooster) titles.push("Broadcast|Legend");
    if (allThreeSets && allSevenWings && hasDragonHoard) titles.push("Executive");
    if (setCount >= 2 && wingCount >= 3) titles.push("MOD");
    return { titles, totalSpend, allSevenWings, wingCount };
}

function updateTitleAndCoinPreview() {
    const { titles, totalSpend, allSevenWings, wingCount } = evaluateTitles(cart);
    const wingsInCart = cart.filter(i => i.cat === "wing");
    let coinReward = wingsInCart.length * 15000;
    cart.filter(i => i.cat === "booster").forEach(b => { if (b.coinValue) coinReward += b.coinValue; });
    if (allSevenWings && wingsInCart.length === 7) coinReward += 105000;
    const previewSpan = document.getElementById("previewCoins");
    if (previewSpan) previewSpan.innerText = coinReward.toLocaleString();
    const titleDiv = document.getElementById("titleStatus");
    if (!titleDiv) return;
    if (!cart.length) {
        titleDiv.innerHTML = "— No items in cart —";
        return;
    }
    let html = `<strong>Titles you will unlock:</strong> `;
    if (titles.length === 0) html += `<em>none yet — add more items</em>`;
    else html += titles.map(t => `<span style="background:rgba(201,168,76,0.15); padding:0.2rem 0.6rem; margin:0.2rem; display:inline-block;">${t}</span>`).join(" ");
    html += `<div style="margin-top: 6px;">Total spend: ₱${totalSpend} | Wings owned: ${wingCount}/7</div>`;
    if (allSevenWings && wingCount === 7) html += `<div>✦ Bonus: All 7 wings → +105,000 extra coins!</div>`;
    titleDiv.innerHTML = html;
}

// ==================== MODAL PURCHASE FLOW ====================
let modalOverlay = null;
let modalContent = null;

function createModal() {
    if (modalOverlay) return;
    modalOverlay = document.createElement("div");
    modalOverlay.className = "checkout-modal-overlay";
    modalContent = document.createElement("div");
    modalContent.className = "checkout-modal-content";
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
    modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) closeModal();
    });
}

function closeModal() {
    if (modalOverlay) modalOverlay.classList.remove("open");
    setTimeout(() => {
        if (modalOverlay) modalOverlay.style.display = "none";
    }, 300);
}

function openModal() {
    if (!modalOverlay) createModal();
    modalOverlay.style.display = "flex";
    setTimeout(() => modalOverlay.classList.add("open"), 10);
    renderPrivacyStep();
}

function renderPrivacyStep() {
    const total = cart.reduce((sum, i) => sum + i.price, 0);
    const cartItemsHtml = cart.map(item => `<li>${item.name} - ₱${item.price}</li>`).join('');
    modalContent.innerHTML = `
        <div class="checkmodal-header">
            <h2>✦ Complete Your Purchase ✦</h2>
            <button class="checkmodal-close">&times;</button>
        </div>
        <div class="checkmodal-body">
            <div class="cart-summary">
                <h3>Your Cart</h3>
                <ul>${cartItemsHtml || '<li>No items</li>'}</ul>
                <p><strong>Total: ₱${total}</strong></p>
            </div>
            <div class="privacy-policy">
                <h3>Privacy & Policy Agreement</h3>
                <p>By proceeding, you agree that:</p>
                <ul>
                    <li>All sales are final – no refunds.</li>
                    <li>Payment must be made via the selected method before delivery.</li>
                    <li>After payment, you must open a ticket in our Discord and provide:<br>• Your Minecraft Gamertag<br>• Your Discord username<br>• Proof of payment (screenshot / reference number)</li>
                    <li>Your data will only be used for order fulfillment.</li>
                </ul>
                <label class="agree-checkbox">
                    <input type="checkbox" id="agreeCheckbox"> I have read and agree to the terms.
                </label>
            </div>
        </div>
        <div class="checkmodal-footer">
            <button id="agreeBtn" disabled>I Agree & Continue</button>
        </div>
    `;
    const agreeCheck = modalContent.querySelector("#agreeCheckbox");
    const agreeBtn = modalContent.querySelector("#agreeBtn");
    agreeCheck.addEventListener("change", () => {
        agreeBtn.disabled = !agreeCheck.checked;
    });
    agreeBtn.addEventListener("click", () => {
        if (agreeCheck.checked) renderPaymentStep();
    });
    modalContent.querySelector(".checkmodal-close").addEventListener("click", closeModal);
}

function renderPaymentStep() {
    const total = cart.reduce((sum, i) => sum + i.price, 0);
    modalContent.innerHTML = `
        <div class="checkmodal-header">
            <h2>✦ Select Payment Method ✦</h2>
            <button class="checkmodal-close">&times;</button>
        </div>
        <div class="checkmodal-body">
            <div class="payment-options">
                <h3>Choose your payment method</h3>
                <div class="payment-buttons">
                    <button class="payment-option" data-method="gcash">GCash</button>
                    <button class="payment-option" data-method="paypal">PayPal</button>
                    <button class="payment-option" data-method="maya">Maya</button>
                </div>
                <div id="qrContainer" class="qr-container" style="display:none;">
                    <div id="paymentDetails"></div>
                    <img id="qrImage" src="" alt="QR Code" style="max-width:180px; margin-top:1rem;">
                    <p class="payment-note">After payment, click the button below to open a Discord ticket and paste your order summary.</p>
                </div>
            </div>
        </div>
        <div class="checkmodal-footer">
            <button id="openDiscordBtn" style="display:none;">Open Discord Ticket & Copy Order</button>
        </div>
    `;
    const paymentAccounts = {
        gcash: { name: "Jeremy Lobos", number: "09302354996", qr: "assets/qrGcash.jpg" },
        paypal: { name: "Jeremy Lobos", number: "09302354996", qr: "assets/qrPaypal.jpg" },
        maya: { name: "kyutaofficial", number: "09302354996", qr: "assets/qrMaya.jpg" }
    };
    const qrContainer = modalContent.querySelector("#qrContainer");
    const qrImage = modalContent.querySelector("#qrImage");
    const paymentDetailsDiv = modalContent.querySelector("#paymentDetails");
    const openDiscordBtn = modalContent.querySelector("#openDiscordBtn");
    const closeBtn = modalContent.querySelector(".checkmodal-close");
    closeBtn.addEventListener("click", closeModal);
    document.querySelectorAll(".payment-option").forEach(btn => {
        btn.addEventListener("click", () => {
            const method = btn.getAttribute("data-method");
            const acc = paymentAccounts[method];
            if (acc) {
                paymentDetailsDiv.innerHTML = `<p><strong>Account Name:</strong> ${acc.name}</p><p><strong>Account Number:</strong> ${acc.number}</p>`;
                qrImage.src = acc.qr;
                qrContainer.style.display = "block";
                openDiscordBtn.style.display = "block";
            }
        });
    });
    openDiscordBtn.addEventListener("click", () => {
        const itemList = cart.map(i => `- ${i.name} (₱${i.price})`).join("\n");
        const message = `**New Order Summary**\nItems:\n${itemList}\n**Total:** ₱${total}\n\nPlease provide your Minecraft Gamertag, Discord name, and proof of payment (screenshot/reference number) in this ticket.`;
        navigator.clipboard.writeText(message).then(() => showToast("Order summary copied to clipboard!"));
        window.open("https://discord.com/channels/1342157707922243678/1374720029257498704", "_blank");
        showToast("Opening Discord... Please create a ticket and paste the order summary.");
        closeModal();
        cart = [];
        updateCartUI();
        updateTitleAndCoinPreview();
    });
}

// ==================== CART DRAWER CONTROLS ====================
const overlay = document.getElementById("cartOverlay");
function openCart() { if (overlay) { overlay.classList.add("open"); document.body.style.overflow = "hidden"; } }
function closeCart() { if (overlay) { overlay.classList.remove("open"); document.body.style.overflow = ""; } }
if (document.getElementById("cartButton")) {
    document.getElementById("cartButton").addEventListener("click", openCart);
}
if (document.getElementById("closeCart")) {
    document.getElementById("closeCart").addEventListener("click", closeCart);
}
if (overlay) {
    overlay.addEventListener("click", (e) => { if (e.target === overlay) closeCart(); });
}
const checkoutBtn = document.getElementById("checkoutBtn");
if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
        if (cart.length === 0) {
            showToast("Your cart is empty. Add items before checkout.");
            return;
        }
        playShopClick();
        openModal();
    });
}

// ==================== FILTER BUTTONS ====================
document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        activeFilter = btn.getAttribute("data-filter");
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        playShopClick();
        renderProducts();
        // After new products are added, re-run the observer with a tiny delay
        setTimeout(() => initScrollAnimations(), 50);
    });
});

// ==================== SCROLL ANIMATIONS (Intersection Observer) ====================
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // only trigger once per card
            }
        });
    }, { threshold: 0.4, rootMargin: '0px 0px -30px 0px' }); // triggers when card is near center

    document.querySelectorAll('.product-card').forEach(card => {
        observer.observe(card);
    });
}

// ==================== INITIAL RENDER ====================
renderProducts();
updateCartUI();
updateTitleAndCoinPreview();