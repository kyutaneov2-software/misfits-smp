// main.js - 4-space indentation with real-time API

// ==================== CONFIGURATION ====================
const SERVER_IP = 'misfitsmc.mcsh.io';
const SERVER_PORT = 25565; // default Minecraft port
const DISCORD_INVITE = 'gDtYVEB3Jr'; 
const UPDATE_INTERVAL = 30000; // 30 seconds

// API endpoints (using public Minecraft server status APIs)
const MC_API_URL = `https://api.mcsrvstat.us/3/${SERVER_IP}`;
const MC_API_FALLBACK = `https://mcapi.us/server/status?ip=${SERVER_IP}&port=${SERVER_PORT}`;
const DISCORD_API_URL = `https://discord.com/api/v9/invites/${DISCORD_INVITE}?with_counts=true`;

// ==================== STARS CANVAS ====================
(function initStars() {
    const c = document.getElementById('stars-canvas');
    if (!c) return;
    const ctx = c.getContext('2d');
    let stars = [];
    
    function resize() {
        c.width = window.innerWidth;
        c.height = window.innerHeight;
        createStars();
    }
    
    function createStars() {
        stars = [];
        const n = Math.floor(c.width * c.height / 3000);
        for (let i = 0; i < n; i++) {
            stars.push({
                x: Math.random() * c.width,
                y: Math.random() * c.height,
                r: Math.random() * 1.2 + 0.1,
                a: Math.random(),
                speed: 0.0002 + Math.random() * 0.0004,
                phase: Math.random() * Math.PI * 2
            });
        }
    }
    
    function draw(t) {
        ctx.clearRect(0, 0, c.width, c.height);
        stars.forEach(s => {
            const alpha = s.a * (0.4 + 0.6 * Math.abs(Math.sin(t * s.speed + s.phase)));
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(220,210,255,${alpha})`;
            ctx.fill();
        });
        requestAnimationFrame(draw);
    }
    
    window.addEventListener('resize', resize);
    resize();
    requestAnimationFrame(draw);
})();

// ==================== CURSOR ====================
(function initCursor() {
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursor-ring');
    if (!cursor || !ring) return;
    
    let mx = 0, my = 0, rx = 0, ry = 0;
    
    document.addEventListener('mousemove', e => {
        mx = e.clientX;
        my = e.clientY;
        cursor.style.left = mx + 'px';
        cursor.style.top = my + 'px';
    });
    
    function animateRing() {
        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;
        ring.style.left = rx + 'px';
        ring.style.top = ry + 'px';
        requestAnimationFrame(animateRing);
    }
    
    animateRing();
    
    const interactive = document.querySelectorAll(
        'a, button, .btn-primary, .btn-secondary, .gallery-card, .faq-q, .server-ip-val, .nav-cta'
    );
    
    interactive.forEach(el => {
        el.addEventListener('mouseenter', () => {
            ring.style.width = '54px';
            ring.style.height = '54px';
            ring.style.opacity = '0.8';
        });
        el.addEventListener('mouseleave', () => {
            ring.style.width = '36px';
            ring.style.height = '36px';
            ring.style.opacity = '0.5';
        });
    });
})();


// ==================== GALLERY (Auto-detect) ====================
(function buildGallery() {
    const track = document.getElementById('galleryTrack');
    if (!track) return;
    
    // Define your images with their actual filenames
    const imageFiles = [
        { file: 'scene_1.webp', label: 'THE GRAND SPAWN' },
        { file: 'scene_2.webp', label: 'CHALLENGE YOURSELF' },
        { file: 'scene_3.webp', label: 'WHERE YOU START' },
        { file: 'scene_5.webp', label: 'SEASONAL SUNSETS' },
        { file: 'scene_6.webp', label: 'RANK COSMETICS' },
        { file: 'scene_7.webp', label: 'MYTHIC BOSSES' },
        { file: 'scene_8.webp', label: 'DUNGEON EXPLORATION' }
    ];
    
    // Try different extensions if needed
    const extensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
    
    // Double for seamless loop
    const doubled = [...imageFiles, ...imageFiles];
    track.innerHTML = '';
    
    doubled.forEach(item => {
        const card = document.createElement('div');
        card.className = 'gallery-card';
        
        // Try to load image with different extensions
        const tryLoadImage = (extIndex = 0) => {
            if (extIndex >= extensions.length) {
                // All extensions failed, show fallback
                showFallback();
                return;
            }
            
            const baseName = item.file.split('.')[0]; // Remove extension if present
            const testImg = new Image();
            testImg.src = `images/${baseName}${extensions[extIndex]}`;
            
            testImg.onload = () => {
                // Image loaded successfully
                const img = document.createElement('img');
                img.src = testImg.src;
                img.alt = item.label;
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'cover';
                img.style.transition = 'transform 0.5s, filter 0.5s';
                img.style.filter = 'brightness(0.7) saturate(0.8)';
                
                // Add hover effects
                card.addEventListener('mouseenter', () => {
                    img.style.transform = 'scale(1.08)';
                    img.style.filter = 'brightness(0.9) saturate(1.1)';
                });
                
                card.addEventListener('mouseleave', () => {
                    img.style.transform = 'scale(1)';
                    img.style.filter = 'brightness(0.7) saturate(0.8)';
                });
                
                card.appendChild(img);
                
                // Add overlay and label
                const overlay = document.createElement('div');
                overlay.className = 'gallery-card-overlay';
                card.appendChild(overlay);
                
                const label = document.createElement('div');
                label.className = 'gallery-card-label';
                label.textContent = item.label;
                card.appendChild(label);
            };
            
            testImg.onerror = () => {
                // Try next extension
                tryLoadImage(extIndex + 1);
            };
        };
        
        function showFallback() {
            console.warn(`Failed to load image for: ${item.label}`);
            
            const fallback = document.createElement('div');
            fallback.className = 'card-bg';
            fallback.style.background = 'linear-gradient(135deg, #1a162e, #0d0b1a)';
            fallback.style.display = 'flex';
            fallback.style.alignItems = 'center';
            fallback.style.justifyContent = 'center';
            fallback.style.flexDirection = 'column';
            fallback.innerHTML = `
                <svg class="icon-svg" style="width: 3rem; height: 3rem; margin-bottom: 0.5rem;" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <path d="M3 9h18M9 21V9"/>
                </svg>
                <span style="font-size: 0.8rem; opacity: 0.7;">${item.label}</span>
            `;
            card.appendChild(fallback);
            
            // Add overlay and label
            const overlay = document.createElement('div');
            overlay.className = 'gallery-card-overlay';
            card.appendChild(overlay);
            
            const label = document.createElement('div');
            label.className = 'gallery-card-label';
            label.textContent = item.label;
            card.appendChild(label);
        }
        
        // Start trying to load the image
        tryLoadImage(0);
        
        track.appendChild(card);
    });
})();

// ==================== FEATURES (icon map) ====================
(function buildFeatures() {
    const grid = document.getElementById('featuresGrid');
    if (!grid) return;
    
    const features = [
        { 
            title: 'AuraSkills', 
            desc: 'Master 11 ancient disciplines — Farming, Mining, Archery, Alchemy and more. Each skill branches into unique abilities as you reach higher tiers of mastery.', 
            tag: '100 Levels Each', 
            icon: 'star' 
        },
        { 
            title: 'AuraMobs', 
            desc: 'Every creature pulses with a unique aura. Read signs, adapt strategy, dominate monsters.', 
            tag: 'Dynamic Encounters', 
            icon: 'eye' 
        },
        { 
            title: 'Mythical Dungeons', 
            desc: 'Five tiers of ancient ruins — form parties, descend into darkness, claim treasures.', 
            tag: '5 Difficulty Tiers', 
            icon: 'layers' 
        },
        { 
            title: 'Epic Bosses', 
            desc: 'The Ominous Wither and other legendary beasts stir beneath the realm.', 
            tag: 'Legendary Encounters', 
            icon: 'skull' 
        },
        { 
            title: 'Realistic Seasons', 
            desc: 'Weather turns, crops respond, the world breathes with natural cycles.', 
            tag: 'Dynamic World', 
            icon: 'sun' 
        },
        { 
            title: 'Rank Cosmetics', 
            desc: 'Rise through 7 prestige ranks and unlock exclusive visual rewards.', 
            tag: '7 Unique Ranks', 
            icon: 'award' 
        },
        { 
            title: 'Player Economy', 
            desc: 'A thriving market powered by player hands. Trade, auction, barter.', 
            tag: 'Auction House', 
            icon: 'dollar-sign' 
        },
        { 
            title: 'Land Claims', 
            desc: 'Stake your territory with GriefPrevention. Build your empire safe.', 
            tag: 'Protected Builds', 
            icon: 'shield' 
        },
        { 
            title: 'Free Exploration', 
            desc: 'Warp to community hubs, randomly teleport, carve your own path.', 
            tag: 'Open World', 
            icon: 'compass' 
        }
    ];
    
    const iconMap = {
        star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
        eye: '<circle cx="12" cy="12" r="3"/><path d="M22 12c-2.667 4.667-6 7-10 7s-7.333-2.333-10-7c2.667-4.667 6-7 10-7s7.333 2.333 10 7z"/>',
        layers: '<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>',
        skull: '<circle cx="12" cy="12" r="10"/><circle cx="9" cy="9" r="1"/><circle cx="15" cy="9" r="1"/><path d="M9 16c1 1 2 1 3 1s2 0 3-1"/>',
        sun: '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>',
        award: '<circle cx="12" cy="8" r="6"/><path d="M8 14l-2 7 6-3 6 3-2-7"/>',
        'dollar-sign': '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
        shield: '<path d="M12 2L3 6v6c0 5.5 9 10 9 10s9-4.5 9-10V6l-9-4z"/>',
        compass: '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>'
    };
    
    features.forEach(f => {
        const card = document.createElement('div');
        card.className = 'feature-card reveal';
        card.innerHTML = `
            <span class="feature-icon"><svg class="icon-svg icon-large" viewBox="0 0 24 24">${iconMap[f.icon]}</svg></span>
            <div class="feature-title">${f.title}</div>
            <p class="feature-desc">${f.desc}</p>
            <span class="feature-tag">${f.tag}</span>
        `;
        grid.appendChild(card);
    });
})();

// ==================== RANKS with Mystical Tooltips (Icons Only) ====================
(function buildRanks() {
    const path = document.getElementById('ranksPath');
    if (!path) return;
    
    const ranks = [
        { 
            name: 'Wanderer', 
            icon: 'map', 
            time: 'Start', 
            locked: false,
            lore: 'Fresh eyes upon the realm, untested but full of promise. The path ahead is unwritten.',
            abilities: ['Basic skills access', 'Wanderer kit', 'land claims'],
            requirement: 'Join the server',
            blessing: 'Curiosity',
            quote: 'Every legend begins with a single step'
        },
        { 
            name: 'Rooted', 
            icon: 'anchor', 
            time: '4 Hours', 
            locked: false,
            lore: 'You have found your footing. The realm acknowledges your presence and grants you a place to call home.',
            abilities: ['Bonus land claims', '/sethome 2', 'Auction house access', 'Wanderer rank perks'],
            requirement: '4 hours playtime',
            blessing: 'Stability',
            quote: 'Deep roots hold fast against any storm'
        },
        { 
            name: 'Delver', 
            icon: 'pickaxe', 
            time: '12 Hours', 
            locked: true,
            lore: 'The depths call to you. Ancient ruins whisper your name, and the earth yields its secrets.',
            abilities: ['Bonus land claims', '/sethome 3', 'Bonus skill XP', 'Rooted rank perks'],
            requirement: '12 hours + Complete tutorial dungeon',
            blessing: 'Treasure sense',
            quote: 'The deepest shadows hide the brightest gems'
        },
        { 
            name: 'Artisan', 
            icon: 'hammer', 
            time: '24 Hours', 
            locked: true,
            lore: 'Your hands shape the world. What was once raw material becomes masterwork.',
            abilities: ['1 Exclusive Item', '/Nickname command', 'Delver rank perks'],
            requirement: '24 hours + Craft 100 items',
            blessing: 'Creation',
            quote: 'From earth and fire, legends are forged'
        },
        { 
            name: 'Seasoned', 
            icon: 'zap', 
            time: '7 Days', 
            locked: true,
            lore: 'The trials have tempered you. You are no longer a visitor — you are part of the realm\'s fabric.',
            abilities: ['1 Exclusive Items', 'Special Title', 'Artisan rank perks'],
            requirement: '7 days + Kill 50 mobs',
            blessing: 'Resilience',
            quote: 'What does not break me only makes me stronger'
        },
        { 
            name: 'Luminous', 
            icon: 'moon', 
            time: '30 Days', 
            locked: true,
            lore: 'Light radiates from within. Others seek your guidance; you have become a beacon in the darkness.',
            abilities: ['1 Exclusive Item', 'Glowing effect toggle', 'Skill level boost', 'Special Role in Discord', 'Seasoned rank perks'],
            requirement: '30 days + Complete epic boss',
            blessing: 'Inspiration',
            quote: 'A single flame can illuminate the darkest path'
        },
        { 
            name: 'Starbound', 
            icon: 'star', 
            time: '45 Days', 
            locked: true,
            lore: 'You have transcended mortal limitations. The stars themselves acknowledge your legend.',
            abilities: ['1 Exclusive Item', 'Custom particle effects', 'Hero status', 'Named in server lore', 'Luminous rank perks'],
            requirement: '45 days + Legendary status',
            blessing: 'Heroism',
            quote: 'Among the stars, your name is written forever'
        }
    ];
    
    const iconMap = {
        map: '<polygon points="3 6 12 2 21 6 12 10 3 6"/><line x1="12" y1="10" x2="12" y2="22"/><path d="M8 12v4"/><path d="M16 12v4"/>',
        anchor: '<circle cx="12" cy="5" r="3"/><line x1="12" y1="22" x2="12" y2="8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/>',
        pickaxe: '<path d="M14 10l6-6"/><path d="M4 20l6-6"/><path d="M18 4l2 2-8 8-2-2 8-8z"/><path d="M10 10l-4 4 2 2 4-4"/>',
        hammer: '<path d="M15 12l-6 6"/><path d="M8 8l6 6"/><path d="M21 12a9 9 0 0 0-9-9M6 3l3 3-3 3-3-3 3-3z"/><path d="M12 21a9 9 0 0 0 9-9"/>',
        zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
        moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
        star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
        // Additional icons for tooltips
        locked: '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
        unlocked: '<path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>',
        blessing: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
        time: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
        requirement: '<path d="M12 2v4M12 22v-4M4 12H2M22 12h-2M19.07 4.93l-2.83 2.83M6.9 17.1l-2.82 2.82M17.1 6.9l2.82-2.82M4.93 19.07l2.83-2.83"/>'
    };
    
    ranks.forEach((r, i) => {
        if (i > 0) {
            const conn = document.createElement('div');
            conn.className = 'rank-connector';
            path.appendChild(conn);
        }
        
        const node = document.createElement('div');
        node.className = 'rank-node' + (r.locked ? ' locked' : '');
        
        // Create abilities list HTML
        const abilitiesList = r.abilities.map(ability => 
            `<li>${ability}</li>`
        ).join('');
        
        node.innerHTML = `
            <div class="rank-gem">
                <span><svg class="icon-svg" viewBox="0 0 24 24">${iconMap[r.icon]}</svg></span>
            </div>
            <div class="rank-name">${r.name}</div>
            <div class="rank-time">${r.time}</div>
            
            <!-- Mystical Tooltip (Icons Only) -->
            <div class="rank-tooltip">
                <div class="rank-tooltip-ornament top"></div>
                
                <div class="rank-tooltip-title">
                    <svg class="icon-svg tooltip-title-icon" viewBox="0 0 24 24">
                        ${r.locked ? iconMap.locked : iconMap.unlocked}
                    </svg>
                    ${r.name}
                </div>
                
                <div class="rank-tooltip-quote">"${r.quote}"</div>
                
                <div class="rank-tooltip-lore">${r.lore}</div>
                
                <div class="rank-tooltip-stats">
                    <div class="rank-tooltip-stat">
                        <svg class="icon-svg stat-icon" viewBox="0 0 24 24">${iconMap.time}</svg>
                        <span class="stat-label">Time</span>
                        <span class="stat-value">${r.time}</span>
                    </div>
                    <div class="rank-tooltip-stat">
                        <svg class="icon-svg stat-icon" viewBox="0 0 24 24">${iconMap.blessing}</svg>
                        <span class="stat-label">Blessing</span>
                        <span class="stat-value">${r.blessing}</span>
                    </div>
                    <div class="rank-tooltip-stat">
                        <svg class="icon-svg stat-icon" viewBox="0 0 24 24">${r.locked ? iconMap.locked : iconMap.unlocked}</svg>
                        <span class="stat-label">Status</span>
                        <span class="stat-value ${r.locked ? 'locked' : 'unlocked'}">${r.locked ? 'Locked' : 'Unlocked'}</span>
                    </div>
                </div>
                
                <div class="rank-tooltip-abilities">
                    <div class="abilities-title">
                        <svg class="icon-svg" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                        Abilities
                    </div>
                    <ul class="abilities-list">
                        ${abilitiesList}
                    </ul>
                </div>
                
                <div class="rank-tooltip-requirement">
                    <svg class="icon-svg requirement-icon" viewBox="0 0 24 24">${iconMap.requirement}</svg>
                    <span class="requirement-label">Requirement:</span>
                    <span class="requirement-text">${r.requirement}</span>
                </div>
                
                <div class="rank-tooltip-ornament bottom"></div>
            </div>
        `;
        
        path.appendChild(node);
    });
    
    // Add mobile touch support
    if (window.innerWidth <= 768) {
        document.querySelectorAll('.rank-node').forEach(node => {
            node.addEventListener('click', (e) => {
                e.stopPropagation();
                
                // Close other tooltips
                document.querySelectorAll('.rank-node').forEach(n => {
                    if (n !== node) {
                        n.classList.remove('active');
                    }
                });
                
                // Toggle current tooltip
                node.classList.toggle('active');
            });
        });
        
        // Close tooltips when clicking elsewhere
        document.addEventListener('click', () => {
            document.querySelectorAll('.rank-node').forEach(node => {
                node.classList.remove('active');
            });
        });
    }
})();

// ==================== LORE AUDIO BUTTON ====================
(function initLoreAudio() {
    const btn = document.getElementById('loreAudioBtn');
    const audio = document.getElementById('loreAudio');
    if (!btn || !audio) return;
    
    // Example free track - replace with actual sound file
    audio.src = 'audio/MisfitsLoreMusic.mp3';
    
    btn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play().catch(e => console.log('Audio play failed:', e));
            btn.innerHTML = `
                <svg class="icon-svg" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                <span>Silence the chant</span>
            `;
        } else {
            audio.pause();
            btn.innerHTML = `
                <svg class="icon-svg" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                <span>Hear the whispers</span>
            `;
        }
    });
    
    audio.addEventListener('ended', () => {
        btn.innerHTML = `
            <svg class="icon-svg" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            <span>Hear the whispers</span>
        `;
    });
})();

// ==================== FAQ ====================
(function buildFaq() {
    const list = document.getElementById('faqList');
    if (!list) return;
    
    const faqs = [
        { q: 'How do I join the server?', a: 'Use the IP address: misfitsmc.mcsh.io — supports Java Edition versions 1.8 through 1.21.11' },
        { q: 'Do I need a premium account?', a: 'No! The server is fully cracked — you can join without a paid Minecraft account.' },
        { q: 'Is the server always online?', a: 'Yes, 24/7. If it shows offline, just connect and wait a moment — it will respond shortly.' },
        { q: 'What commands do I need to start?', a: '/register [password] to set up, then /kit wanderer for starter gear. Use /rtp to explore, /shop to trade, and /warp for key locations.' },
        { q: 'Do supporters get rewards?', a: 'Yes! Dedicated supporters receive exclusive cosmetics, rank perks, and are immortalized on the Champions list.' },
        { q: 'How do I get help?', a: 'Join the Discord and open a support ticket. Staff are active and will assist you promptly.' },
        { q: 'Is it available to bedrock players?', a: 'No, the server is currently only available to Java Edition players. As we expand, we may consider adding Bedrock support in the future.' },
        { q: 'Are there any rules I should know?', a: 'Be respectful to others, no griefing, and follow the Discord guidelines. Full rules are available on the discord.' }
    ];
    
    list.innerHTML = '';
    
    faqs.forEach(f => {
        const item = document.createElement('div');
        item.className = 'faq-item';
        item.innerHTML = `
            <div class="faq-q">${f.q}<div class="faq-arrow"></div></div>
            <div class="faq-a">${f.a}</div>
        `;
        
        item.querySelector('.faq-q').addEventListener('click', () => {
            const wasOpen = item.classList.contains('open');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
            if (!wasOpen) item.classList.add('open');
        });
        
        list.appendChild(item);
    });
})();

// ==================== WORLDS GRID (with SVG icons) ====================
(function buildWorlds() {
    const grid = document.getElementById('worldsGrid');
    if (!grid) return;
    
    grid.innerHTML = `
        <div class="world-card unlocked">
            <div class="world-bg" style="background:linear-gradient(135deg,#0f2a0f,#1a3d1a)">
                <svg class="icon-svg" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M2 12h20"/>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
            </div>
            <div class="world-overlay"></div>
            <div class="world-content">
                <div class="world-name">The Overworld</div>
                <div class="world-req">✦ Open to All Adventurers</div>
            </div>
            <div class="world-lock">
                <svg class="icon-svg" viewBox="0 0 24 24">
                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                </svg>
            </div>
        </div>
        <div class="world-card">
            <div class="world-bg" style="background:linear-gradient(135deg,#2a0a00,#4a1500)">
                <svg class="icon-svg" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="4"/>
                    <path d="M12 2v4M22 12h-4M12 20v4M4 12H2M20 20l-3-3M20 4l-3 3M4 4l3 3M4 20l3-3"/>
                </svg>
            </div>
            <div class="world-overlay"></div>
            <div class="world-content">
                <div class="world-name">The Nether</div>
                <div class="world-req">⚠ Combined Skill Level 50+</div>
            </div>
            <div class="world-lock">
                <svg class="icon-svg" viewBox="0 0 24 24">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
            </div>
        </div>
        <div class="world-card">
            <div class="world-bg" style="background:linear-gradient(135deg,#0a0a1a,#1a1a3a)">
                <svg class="icon-svg" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="2"/>
                    <path d="M12 2v2M22 12h-2M12 20v2M4 12H2M17.66 6.34l-1.41 1.41M6.34 17.66l1.41-1.41M17.66 17.66l-1.41-1.41M6.34 6.34l1.41 1.41"/>
                </svg>
            </div>
            <div class="world-overlay"></div>
            <div class="world-content">
                <div class="world-name">The End</div>
                <div class="world-req">⚠ Combined Skill Level 75+</div>
            </div>
            <div class="world-lock">
                <svg class="icon-svg" viewBox="0 0 24 24">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
            </div>
        </div>
        <div class="world-card">
            <div class="world-bg" style="background:linear-gradient(135deg,#1a001a,#2d003d)">
                <svg class="icon-svg" viewBox="0 0 24 24">
                    <path d="M21 12a9 9 0 0 0-9-9M3 12a9 9 0 0 0 9 9M12 3v18"/>
                    <circle cx="12" cy="12" r="2" fill="none"/>
                </svg>
            </div>
            <div class="world-overlay"></div>
            <div class="world-content">
                <div class="world-name">Mystery Realm</div>
                <div class="world-req">⚠ Find the Hidden Portal</div>
            </div>
            <div class="world-lock">
                <svg class="icon-svg" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
            </div>
        </div>
    `;
})();

// ==================== FOUNDERS (static) ====================
(function buildFounders() {
    const row = document.getElementById('foundersRow');
    if (!row) return;
    
    row.innerHTML = `
        <div class="founder-card">
            <div class="founder-avatar"><svg class="icon-svg" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/></svg></div>
            <div class="founder-name">KyutaOfficial</div>
            <div class="founder-role">Realm Keeper</div>
        </div>
        <div class="founder-card">
            <div class="founder-avatar"><svg class="icon-svg" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg></div>
            <div class="founder-name">GhostKun</div>
            <div class="founder-role">World Architect</div>
        </div>
    `;
})();

// ==================== SUPPORTERS (dynamic from JSON) ====================
(async function loadSupporters() {
    const grid = document.getElementById('supportersGrid');
    if (!grid) return;
    
    try {
        // In a real project, replace with actual URL e.g. '/data/supporters.json'
        // For demonstration, we use fetch but provide fallback
        const response = await fetch('supporters.json').catch(() => null);
        let supporters = ['ChannuBeans', 'CLONEX5323', 'Reyma']; // fallback
        
        if (response && response.ok) {
            supporters = await response.json();
        } else {
            console.log('Using default supporters (mock)');
        }
        
        grid.innerHTML = '';
        
        supporters.forEach(name => {
            const badge = document.createElement('div');
            badge.className = 'supporter-badge';
            badge.innerHTML = `
                <svg class="icon-svg" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                ${name}
            `;
            grid.appendChild(badge);
        });
    } catch (e) {
        console.warn('Could not load supporters', e);
    }
})();

// ==================== REALTIME SERVER STATUS API ====================

// Update server status with real data
async function updateServerStatus() {
    try {
        // Try primary API first
        let response = await fetch(MC_API_URL);
        let data = await response.json();
        
        if (data && data.online) {
            updateStatusUI(data);
        } else {
            // Try fallback API
            const fallbackResponse = await fetch(MC_API_FALLBACK);
            const fallbackData = await fallbackResponse.json();
            
            if (fallbackData && fallbackData.online) {
                // Convert fallback data format to match primary
                const convertedData = {
                    online: fallbackData.online,
                    version: fallbackData.server?.name || '1.21.1',
                    players: {
                        online: fallbackData.players?.now || 0,
                        max: fallbackData.players?.max || 100
                    },
                    motd: fallbackData.motd
                };
                updateStatusUI(convertedData);
            } else {
                setOfflineStatus();
            }
        }
    } catch (error) {
        console.error('Error fetching server status:', error);
        setOfflineStatus();
    }
    
    // Update last updated timestamp
    const lastUpdated = document.getElementById('last-updated');
    if (lastUpdated) {
        const now = new Date();
        lastUpdated.textContent = now.toLocaleTimeString();
    }
}

// Update UI with server data
function updateStatusUI(data) {
    const statusDot = document.getElementById('status-dot');
    const statusText = document.getElementById('status-text');
    const serverVersion = document.getElementById('server-version');
    const serverPlayers = document.getElementById('server-players');
    const serverTPS = document.getElementById('server-tps');
    const uptimeBar = document.getElementById('uptime-bar');
    
    if (statusDot) {
        statusDot.style.background = '#4ade80';
        statusDot.style.boxShadow = '0 0 8px #4ade80';
    }
    if (statusText) statusText.textContent = 'Online';
    
    if (serverVersion && data.version) {
        // Extract clean version number
        const versionMatch = data.version.match(/\d+\.\d+(\.\d+)?/);
        serverVersion.textContent = versionMatch ? `Java ${versionMatch[0]}` : 'Java 1.21.1';
    }
    
    if (serverPlayers && data.players) {
        const online = data.players.online || 0;
        const max = data.players.max || 100;
        serverPlayers.textContent = `${online} / ${max}`;
        
        // Update uptime bar based on player count percentage (just for visual)
        if (uptimeBar && max > 0) {
            const percentage = Math.min((online / max) * 100, 100);
            uptimeBar.style.width = `${percentage}%`;
        }
    }
    
    // Simulate TPS based on player count (in reality you'd need server-side plugin)
    if (serverTPS && data.players) {
        const online = data.players.online || 0;
        if (online > 50) {
            serverTPS.textContent = '19.8 ✦ Stable';
        } else if (online > 30) {
            serverTPS.textContent = '19.9 ✦ Great';
        } else if (online > 10) {
            serverTPS.textContent = '20.0 ✦ Smooth';
        } else {
            serverTPS.textContent = '20.0 ✦ Perfect';
        }
    }
}

// Set offline status
function setOfflineStatus() {
    const statusDot = document.getElementById('status-dot');
    const statusText = document.getElementById('status-text');
    const serverPlayers = document.getElementById('server-players');
    const uptimeBar = document.getElementById('uptime-bar');
    const serverTPS = document.getElementById('server-tps');
    
    if (statusDot) {
        statusDot.style.background = '#ef4444';
        statusDot.style.boxShadow = '0 0 8px #ef4444';
    }
    if (statusText) statusText.textContent = 'Offline';
    if (serverPlayers) serverPlayers.textContent = '0 / 0';
    if (uptimeBar) uptimeBar.style.width = '0%';
    if (serverTPS) serverTPS.textContent = '-- ✦ Waiting';
}

// ==================== DISCORD API ====================
async function updateDiscordStats() {
    try {
        const response = await fetch(DISCORD_API_URL);
        const data = await response.json();
        
        if (data && data.approximate_member_count) {
            const discordMembers = document.getElementById('discord-members');
            if (discordMembers) {
                const count = data.approximate_member_count;
                discordMembers.textContent = count > 1000 ? 
                    `${Math.floor(count/1000)}k+` : 
                    `${count}+`;
            }
        }
    } catch (error) {
        console.error('Error fetching Discord stats:', error);
    }
}

// ==================== INITIALIZE REAL-TIME UPDATES ====================
(function initRealTimeUpdates() {
    // Initial updates
    updateServerStatus();
    updateDiscordStats();
    
    // Set up interval for regular updates
    setInterval(() => {
        updateServerStatus();
        updateDiscordStats();
    }, UPDATE_INTERVAL);
    
    // Also update when page becomes visible again
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            updateServerStatus();
            updateDiscordStats();
        }
    });
})();

// ==================== REVEAL ON SCROLL ====================
(function observeReveal() {
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
})();

// ==================== COPY IP ====================
window.copyIP = function() {
    navigator.clipboard.writeText(SERVER_IP).then(() => {
        const t = document.getElementById('toast');
        t.classList.add('show');
        setTimeout(() => t.classList.remove('show'), 2500);
    });
};