// shop.js – view‑only showcase (no cart, no checkout)

// ==================== PRODUCT DATA ====================
const PRODUCTS = [
    // Sets
    { 
        id: "set_dragon", 
        cat: "set", 
        name: "DragonBorn Set", 
        price: 99, 
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
        price: 119, 
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
        price: 199, 
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
        price: 69, 
        desc: "Heavenly radiance — grants 15,000 server coins, plus divine particles.", 
        perks: [
            "+15,000 server coins",
            "Unbreakable wing elytra",
            "[SERAPHIC] Glowing feather particle trail",
            "+10,000 land claims",
            "+20,000 in-game money",
            "4 stack firework boost"
        ], 
        image: "assets/seraphsHalo.png", 
        coinReward: 15000,
        unbreakable: true
    },
    { 
        id: "wing_eclipse", 
        cat: "wing", 
        name: "Eclipse Crown", 
        price: 69, 
        desc: "Shadowed majesty — 15,000 coins. Eclipse particles follow your flight.", 
        perks: [
            "+15,000 server coins",
            "Unbreakable wing elytra",
            "[ECLIPSE] Shadow particle trail",
            "+10,000 land claims",
            "+20,000 in-game money",
            "4 stack firework boost"
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
        price: 69, 
        desc: "Draconic sentinel wings — 15,000 coins. Scales shimmer in flight.", 
        perks: [
            "+15,000 server coins",
            "Unbreakable wing elytra",
            "[WYRM] Scale particle effect",
            "+10,000 land claims",
            "+20,000 in-game money",
            "4 stack firework boost"
        ], 
        image: "assets/wyrmguard.png", 
        coinReward: 15000,
        unbreakable: true
    },
    { 
        id: "wing_archmage", 
        cat: "wing", 
        name: "Archmages Halo", 
        price: 69, 
        desc: "Arcane wisdom — 15,000 coins. Runic circles trail behind you.", 
        perks: [
            "+15,000 server coins",
            "Unbreakable wing elytra",
            "[ARCANE] Rune particle trail",
            "+10,000 land claims",
            "+20,000 in-game money",
            "4 stack firework boost"
        ], 
        image: "assets/archmageHalo.png", 
        coinReward: 15000,
        unbreakable: true
    },
    { 
        id: "wing_prism", 
        cat: "wing", 
        name: "Prism Sovereign", 
        price: 69, 
        desc: "Iridescent glory — 15,000 coins. Rainbow light shimmers as you soar.", 
        perks: [
            "+15,000 server coins",
            "Unbreakable wing elytra",
            "[PRISMATIC] Light particle trail",
            "+10,000 land claims",
            "+20,000 in-game money",
            "4 stack firework boost"
        ], 
        image: "assets/prismSovereign.png", 
        coinReward: 15000,
        unbreakable: true
    },
    { 
        id: "wing_cinder", 
        cat: "wing", 
        name: "Cinder Diadem", 
        price: 69, 
        desc: "Ashen phoenix — 15,000 coins. Embers rise from your wings.", 
        perks: [
            "+15,000 server coins",
            "Unbreakable wing elytra",
            "[CINDER] Ember particle trail",
            "+10,000 land claims",
            "+20,000 in-game money",
            "4 stack firework boost"
        ], 
        image: "assets/cinderDiadem.png", 
        coinReward: 15000,
        unbreakable: true
    },
    { 
        id: "wing_celestial", 
        cat: "wing", 
        name: "Celestial Aegis", 
        price: 69, 
        desc: "Starforged barrier — 15,000 coins. Constellations trace your flight path.", 
        perks: [
            "+15,000 server coins",
            "Unbreakable wing elytra",
            "[CELESTIAL] Stardust constellation particle trail",
            "+10,000 land claims",
            "+20,000 in-game money",
            "4 stack firework boost"
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
        price: 249, 
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
        price: 149, 
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
        price: 99, 
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
    },
    // Pets
    {
        id: "pet_wither",
        cat: "pet",
        name: "Wither Pet",
        price: 199,
        desc: "Unleash the undead. A loyal Wither companion grants you land, coins, and a dark title.",
        perks: [
            "+500,000 server coins",
            "+30,000 land claims",
            "Unlocks WITHERHOLDER title",
            "Summons a loyal Wither companion"
        ],
        image: "assets/pet_wither.png",
        coinReward: 500000,
        titleGrant: "WitherHolder"
    },
    {
        id: "pet_golem",
        cat: "pet",
        name: "Iron Golem Pet",
        price: 199,
        desc: "A steadfast guardian. The Iron Golem offers protection, land, coins, and honour.",
        perks: [
            "+500,000 server coins",
            "+30,000 land claims",
            "Unlocks GOLEMHOLDER title",
            "Summons a loyal Iron Golem companion"
        ],
        image: "assets/pet_golem.png",
        coinReward: 500000,
        titleGrant: "GolemHolder"
    },
    {
        id: "pet_warden",
        cat: "pet",
        name: "Warden Pet",
        price: 199,
        desc: "Embrace the deep dark. The Warden pet grants immense power, land, coins, and a fearsome title.",
        perks: [
            "+500,000 server coins",
            "+30,000 land claims",
            "Unlocks WARDENHOLDER title",
            "Summons a loyal Warden companion"
        ],
        image: "assets/pet_warden.png",
        coinReward: 500000,
        titleGrant: "WardenHolder"
    }
];

// ==================== STATE ====================
let activeFilter = "all";

// ==================== DOM ELEMENTS ====================
const productsGrid = document.getElementById("productsGrid");

// ==================== RENDER PRODUCTS (view‑only) ====================
function renderProducts() {
    const filtered = activeFilter === "all" ? PRODUCTS : PRODUCTS.filter(p => p.cat === activeFilter);
    productsGrid.innerHTML = "";
    
    filtered.forEach(p => {
        const card = document.createElement("div");
        card.className = "product-card";
        const perksHtml = p.perks.map(perk => `<li>${perk}</li>`).join("");
        const badgeHtml = p.badge ? `<div class="product-badge">${p.badge}</div>` : '';
        
        // Category display text
        let categoryText = "";
        if (p.cat === "set") categoryText = "SACRED SET";
        else if (p.cat === "wing") categoryText = "WING";
        else if (p.cat === "booster") categoryText = "BOOSTER";
        else if (p.cat === "pet") categoryText = "MYTHIC PET";
        
        card.innerHTML = `
            ${badgeHtml}
            <div class="product-image-frame">
                <div class="product-rune-ring"></div>
                <img src="${p.image}" alt="${p.name}" class="product-img" loading="lazy">
            </div>
            <div class="product-info">
                <div class="product-name">${p.name}</div>
                <div class="product-category">${categoryText}</div>
                <div class="product-desc">${p.desc}</div>
                <ul class="product-perks">${perksHtml}</ul>
                <div class="product-footer">
                    <div class="product-price">₱${p.price}</div>
                    <!-- No buy button – view only -->
                </div>
            </div>
        `;
        
        const img = card.querySelector(".product-img");
        if (img) img.onerror = () => { img.style.opacity = "0.5"; };
        
        productsGrid.appendChild(card);
    });
    
    setTimeout(() => initScrollAnimations(), 50);
}

// ==================== SCROLL ANIMATIONS (Intersection Observer) ====================
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4, rootMargin: '0px 0px -30px 0px' });

    document.querySelectorAll('.product-card').forEach(card => {
        observer.observe(card);
    });
}

// ==================== FILTER BUTTONS ====================
document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        activeFilter = btn.getAttribute("data-filter");
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderProducts();
    });
});

// ==================== INITIAL RENDER ====================
renderProducts();

// All cart, modal, and checkout code has been removed.
// The shop is now a pure catalog – view only.