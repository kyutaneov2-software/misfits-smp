// ============================================
// MISFITS STUDIO - MAIN JAVASCRIPT
// Fully Responsive Fantasy Minecraft Server Website
// ============================================

// ============================================
// CONFIGURATION
// ============================================
const CONFIG = {
    SERVER_IP: 'misfitsmc.mcsh.io',
    DISCORD_INVITE: 'https://discord.gg/gDtYVEB3Jr',
    CONTACT_EMAIL: 'misfitsmcofficial@gmail.com',
    API_ENDPOINTS: [
        'https://api.mcsrvstat.us/2/misfitsmc.mcsh.io',
        'https://api.mcstatus.io/v2/status/java/misfitsmc.mcsh.io'
    ],
    CACHE_TIMEOUT: 30000, // 30 seconds
    AUTO_SLIDE_DELAY: 5000, // 5 seconds
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 2000, // 2 seconds
    DEBUG: false,
    
    // Mystery heads configuration
    MYSTERY_HEADS: {
        COUNT: 20, // Number of different mystery head variations
        ICONS: [
            'fa-user-astronaut',
            'fa-user-ninja',
            'fa-user-secret',
            'fa-user-tie',
            'fa-hat-wizard',
            'fa-dragon',
            'fa-crown',
            'fa-ghost',
            'fa-skull',
            'fa-robot',
            'fa-user-alien',
            'fa-face-smile',
            'fa-face-smile-wink',
            'fa-face-smile-hearts',
            'fa-face-smile-horns',
            'fa-cat',
            'fa-dog',
            'fa-dove',
            'fa-fish',
            'fa-hippo'
        ],
        COLORS: [
            '#9f7aea', // light purple
            '#b794f4', // softer purple
            '#d6bcfa', // lavender
            '#e9d8fd', // light lavender
            '#c4b5fd', // medium lavender
            '#f0abfc', // pinkish purple
            '#e879f9', // magenta
            '#d8b4fe', // light magenta
            '#c084fc', // medium magenta
            '#a78bfa'  // indigo
        ]
    }
};

// ============================================
// STATE MANAGEMENT
// ============================================
const State = {
    statusCache: {
        data: null,
        timestamp: 0
    },
    gallery: {
        currentSlide: 1,
        autoSlideInterval: null,
        isPaused: false
    },
    isMenuOpen: false,
    retryCount: 0,
    isOnline: navigator.onLine,
    lastPlayerCount: 0
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Console log only in debug mode
 */
function debugLog(...args) {
    if (CONFIG.DEBUG) {
        console.log('[Misfits Studio]', ...args);
    }
}

/**
 * Debounce function for performance optimization
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Get random item from array
 */
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Generate a random mystery head icon
 */
function getRandomMysteryIcon() {
    return getRandomItem(CONFIG.MYSTERY_HEADS.ICONS);
}

/**
 * Generate a random color for mystery head
 */
function getRandomMysteryColor() {
    return getRandomItem(CONFIG.MYSTERY_HEADS.COLORS);
}

/**
 * Generate a unique mystery head class
 */
function getMysteryHeadClass(index) {
    const colorIndex = index % CONFIG.MYSTERY_HEADS.COLORS.length;
    return `mystery-head-${colorIndex + 1}`;
}

/**
 * Show notification message
 */
function showNotification(message, type = 'success') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.setAttribute('role', 'alert');
    
    // Set color based on type
    if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #ef4444, #f87171)';
    } else if (type === 'warning') {
        notification.style.background = 'linear-gradient(135deg, #f59e0b, #fbbf24)';
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// ============================================
// PAGE NAVIGATION
// ============================================

/**
 * Show a specific page
 */
function showPage(pageId) {
    debugLog('Navigating to:', pageId);
    
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show target page
    const targetPage = document.getElementById(pageId + '-page');
    if (targetPage) {
        targetPage.classList.add('active');
    } else {
        console.error('Page not found:', pageId + '-page');
        return;
    }
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        }
    });
    
    // Scroll to top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    // Close mobile menu if open
    if (window.innerWidth <= 768 && State.isMenuOpen) {
        closeMenu();
    }
}

// ============================================
// MOBILE MENU
// ============================================

/**
 * Toggle mobile menu
 */
function toggleMenu() {
    const burger = document.getElementById('burgerMenu');
    const navLinks = document.getElementById('navLinks');
    const overlay = document.getElementById('navOverlay');
    const body = document.body;
    
    if (!burger || !navLinks || !overlay) return;
    
    State.isMenuOpen = !State.isMenuOpen;
    
    burger.classList.toggle('active');
    navLinks.classList.toggle('active');
    overlay.classList.toggle('active');
    body.classList.toggle('menu-open');
    
    // Update ARIA attributes
    burger.setAttribute('aria-expanded', State.isMenuOpen);
}

/**
 * Close mobile menu
 */
function closeMenu() {
    const burger = document.getElementById('burgerMenu');
    const navLinks = document.getElementById('navLinks');
    const overlay = document.getElementById('navOverlay');
    const body = document.body;
    
    if (!burger || !navLinks || !overlay) return;
    
    State.isMenuOpen = false;
    
    burger.classList.remove('active');
    navLinks.classList.remove('active');
    overlay.classList.remove('active');
    body.classList.remove('menu-open');
    
    // Update ARIA attributes
    burger.setAttribute('aria-expanded', 'false');
}

// ============================================
// CLIPBOARD FUNCTIONS
// ============================================

/**
 * Copy server IP to clipboard
 */
function copyIP() {
    const textToCopy = CONFIG.SERVER_IP;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                showNotification('Server IP copied to clipboard! ✨');
            })
            .catch(err => {
                console.error('Clipboard error:', err);
                fallbackCopy(textToCopy);
            });
    } else {
        fallbackCopy(textToCopy);
    }
}

/**
 * Fallback copy method for older browsers
 */
function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    textArea.style.top = '0';
    document.body.appendChild(textArea);
    textArea.select();
    textArea.setSelectionRange(0, 99999);
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showNotification('Server IP copied to clipboard!');
        } else {
            showNotification('Failed to copy IP. Please copy manually.', 'error');
        }
    } catch (err) {
        console.error('Fallback copy error:', err);
        showNotification('Failed to copy IP. Please copy manually.', 'error');
    }
    
    document.body.removeChild(textArea);
}

// ============================================
// GALLERY FUNCTIONS
// ============================================

/**
 * Change gallery slide
 */
function changeSlide(direction) {
    const slides = document.querySelectorAll('.gallery-slide');
    const dots = document.querySelectorAll('.dot');
    
    if (slides.length === 0) return;
    
    // Remove active class from current slide
    slides[State.gallery.currentSlide - 1].classList.remove('active');
    if (dots.length >= State.gallery.currentSlide) {
        dots[State.gallery.currentSlide - 1].classList.remove('active');
    }
    
    // Update slide index
    State.gallery.currentSlide += direction;
    
    // Loop around
    if (State.gallery.currentSlide > slides.length) {
        State.gallery.currentSlide = 1;
    }
    if (State.gallery.currentSlide < 1) {
        State.gallery.currentSlide = slides.length;
    }
    
    // Add active class to new slide
    slides[State.gallery.currentSlide - 1].classList.add('active');
    if (dots.length >= State.gallery.currentSlide) {
        dots[State.gallery.currentSlide - 1].classList.add('active');
    }
    
    // Reset auto-advance timer
    resetAutoSlide();
}

/**
 * Go to specific slide
 */
function goToSlide(n) {
    const slides = document.querySelectorAll('.gallery-slide');
    const dots = document.querySelectorAll('.dot');
    
    if (slides.length === 0) return;
    
    // Validate slide number
    if (n < 1 || n > slides.length) return;
    
    // Remove active class from current slide
    slides[State.gallery.currentSlide - 1].classList.remove('active');
    if (dots.length >= State.gallery.currentSlide) {
        dots[State.gallery.currentSlide - 1].classList.remove('active');
    }
    
    // Set new slide
    State.gallery.currentSlide = n;
    
    // Add active class to new slide
    slides[State.gallery.currentSlide - 1].classList.add('active');
    if (dots.length >= State.gallery.currentSlide) {
        dots[State.gallery.currentSlide - 1].classList.add('active');
    }
    
    // Reset auto-advance timer
    resetAutoSlide();
}

/**
 * Start auto-advancing slides
 */
function startAutoSlide() {
    if (State.gallery.autoSlideInterval) {
        clearInterval(State.gallery.autoSlideInterval);
    }
    
    State.gallery.autoSlideInterval = setInterval(() => {
        if (!State.gallery.isPaused) {
            changeSlide(1);
        }
    }, CONFIG.AUTO_SLIDE_DELAY);
}

/**
 * Reset auto-advance timer
 */
function resetAutoSlide() {
    if (State.gallery.autoSlideInterval) {
        clearInterval(State.gallery.autoSlideInterval);
        startAutoSlide();
    }
}

/**
 * Stop auto-advancing slides
 */
function stopAutoSlide() {
    if (State.gallery.autoSlideInterval) {
        clearInterval(State.gallery.autoSlideInterval);
        State.gallery.autoSlideInterval = null;
    }
}

// ============================================
// SERVER STATUS API
// ============================================

/**
 * Fetch server status from multiple APIs
 */
async function fetchServerStatus() {
    debugLog('Fetching server status...');
    
    const now = Date.now();
    
    // Use cache if fresh
    if (State.statusCache.data && (now - State.statusCache.timestamp) < CONFIG.CACHE_TIMEOUT) {
        debugLog('Using cached data');
        updateUIWithStatus(State.statusCache.data);
        return;
    }
    
    // Try each API endpoint
    for (const endpoint of CONFIG.API_ENDPOINTS) {
        try {
            debugLog('Trying endpoint:', endpoint);
            
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);
            
            const response = await fetch(endpoint, {
                method: 'GET',
                mode: 'cors',
                headers: { 'Accept': 'application/json' },
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            debugLog('API response:', data);
            
            const parsedData = parseServerData(data, endpoint);
            
            if (parsedData) {
                debugLog('Successfully parsed data:', parsedData);
                State.statusCache.data = parsedData;
                State.statusCache.timestamp = now;
                State.retryCount = 0;
                updateUIWithStatus(parsedData);
                return;
            }
            
        } catch (error) {
            if (error.name === 'AbortError') {
                debugLog('Request timeout for:', endpoint);
            } else {
                debugLog('Request failed for:', endpoint, error.message);
            }
        }
    }
    
    // If all APIs fail, try to retry
    if (State.retryCount < CONFIG.RETRY_ATTEMPTS) {
        State.retryCount++;
        debugLog(`Retry attempt ${State.retryCount}/${CONFIG.RETRY_ATTEMPTS}`);
        setTimeout(fetchServerStatus, CONFIG.RETRY_DELAY * State.retryCount);
    } else {
        // Show offline
        debugLog('All APIs failed, showing offline');
        setServerOffline();
    }
}

/**
 * Parse server data based on API type
 */
function parseServerData(data, endpoint) {
    try {
        // mcsrvstat.us API
        if (endpoint.includes('mcsrvstat.us')) {
            return {
                online: data.online === true,
                players: {
                    online: data.players?.online || 0,
                    max: data.players?.max || 0
                    // We don't use the list since it's often unavailable
                },
                version: data.version || '1.21.1',
                motd: data.motd?.clean || ['Misfits Studio']
            };
        }
        
        // mcstatus.io API
        if (endpoint.includes('mcstatus.io')) {
            return {
                online: data.online || false,
                players: {
                    online: data.players?.online || 0,
                    max: data.players?.max || 0
                    // We don't use the list since it's often unavailable
                },
                version: data.version?.name || '1.21.1',
                motd: [data.motd?.clean || 'Misfits Studio']
            };
        }
        
        return null;
        
    } catch (error) {
        console.error('Parse error:', error);
        return null;
    }
}

/**
 * Update UI with server status data
 */
function updateUIWithStatus(data) {
    debugLog('Updating UI with:', data);
    
    // Update online count
    const onlineCount = document.getElementById('online-count');
    const maxPlayers = document.getElementById('max-players');
    const playersOnline = document.getElementById('players-online');
    const playerBar = document.getElementById('player-bar');
    const serverStatus = document.getElementById('server-status');
    const serverVersion = document.getElementById('server-version');
    const serverVersionStatus = document.getElementById('server-version-status');
    
    if (onlineCount) onlineCount.textContent = data.players.online;
    if (maxPlayers) maxPlayers.textContent = data.players.max;
    if (playersOnline) playersOnline.textContent = `${data.players.online}/${data.players.max}`;
    if (serverVersion) serverVersion.textContent = data.version;
    if (serverVersionStatus) serverVersionStatus.textContent = data.version;
    
    // Update player bar
    if (playerBar) {
        const percent = data.players.max > 0 ? (data.players.online / data.players.max) * 100 : 0;
        playerBar.style.width = percent + '%';
    }
    
    // Update server status text
    if (serverStatus) {
        serverStatus.innerHTML = data.online 
            ? '<span class="online-indicator"></span> Online'
            : '<i class="fas fa-circle" style="color: #ef4444; font-size: 0.8rem;"></i> Offline';
    }
    
    // Update mystery player heads based on online count
    updateMysteryPlayerHeads(data.players.online);
    
    // Store last player count for reference
    State.lastPlayerCount = data.players.online;
}

/**
 * Set server offline UI
 */
function setServerOffline() {
    debugLog('Setting server offline UI');
    
    const onlineCount = document.getElementById('online-count');
    const maxPlayers = document.getElementById('max-players');
    const playersOnline = document.getElementById('players-online');
    const playerBar = document.getElementById('player-bar');
    const serverStatus = document.getElementById('server-status');
    const serverTps = document.getElementById('server-tps');
    const tpsBar = document.getElementById('tps-bar');
    
    if (onlineCount) onlineCount.textContent = '0';
    if (maxPlayers) maxPlayers.textContent = '0';
    if (playersOnline) playersOnline.textContent = '0/0';
    if (playerBar) playerBar.style.width = '0%';
    if (serverTps) serverTps.textContent = '0.0';
    if (tpsBar) tpsBar.style.width = '0%';
    
    if (serverStatus) {
        serverStatus.innerHTML = '<i class="fas fa-circle" style="color: #ef4444; font-size: 0.8rem;"></i> Offline';
    }
    
    // Show no players
    updateMysteryPlayerHeads(0);
}

/**
 * Update mystery player heads grid based on online count
 */
function updateMysteryPlayerHeads(onlineCount) {
    const headsGrid = document.getElementById('player-heads-grid');
    const noPlayersMsg = document.getElementById('no-players');
    
    if (!headsGrid || !noPlayersMsg) return;
    
    if (onlineCount > 0) {
        headsGrid.style.display = 'grid';
        noPlayersMsg.style.display = 'none';
        
        // Generate mystery heads based on online count
        // We'll show up to 8 heads maximum for visual appeal
        const headsToShow = Math.min(onlineCount, 8);
        const mysteryHeads = [];
        
        // Create an array of mystery heads
        for (let i = 0; i < headsToShow; i++) {
            // Use deterministic but varied icons based on index
            const iconIndex = i % CONFIG.MYSTERY_HEADS.ICONS.length;
            const colorIndex = i % CONFIG.MYSTERY_HEADS.COLORS.length;
            const icon = CONFIG.MYSTERY_HEADS.ICONS[iconIndex];
            const color = CONFIG.MYSTERY_HEADS.COLORS[colorIndex];
            
            mysteryHeads.push(`
                <div class="player-head-card mystery-head" style="animation-delay: ${i * 0.1}s">
                    <div class="mystery-head-${colorIndex + 1}" style="font-size: 2rem; color: ${color};">
                        <i class="fas ${icon}"></i>
                    </div>
                    <div style="font-size: 0.7rem; color: var(--soft-lavender); margin-top: 0.3rem;">
                        <i class="fas fa-circle" style="color: #10b981; font-size: 0.5rem;"></i> Online
                    </div>
                </div>
            `);
        }
        
        headsGrid.innerHTML = mysteryHeads.join('');
        
        // Add a mystery message if there are more players than shown
        if (onlineCount > 8) {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'mystery-message';
            messageDiv.innerHTML = `<i class="fas fa-user-secret"></i> and ${onlineCount - 8} more adventurers...`;
            headsGrid.parentNode.appendChild(messageDiv);
            
            // Remove previous message if exists
            const oldMessage = headsGrid.parentNode.querySelector('.mystery-message:not(#no-players)');
            if (oldMessage && oldMessage !== messageDiv) {
                oldMessage.remove();
            }
        } else {
            // Remove any existing mystery message
            const oldMessage = headsGrid.parentNode.querySelector('.mystery-message');
            if (oldMessage) oldMessage.remove();
        }
        
    } else {
        headsGrid.style.display = 'none';
        noPlayersMsg.style.display = 'block';
        
        // Remove any existing mystery message
        const oldMessage = headsGrid.parentNode.querySelector('.mystery-message');
        if (oldMessage) oldMessage.remove();
    }
}

/**
 * Simulate TPS (since we can't get real TPS from public API)
 */
function simulateTPS() {
    const tpsElement = document.getElementById('server-tps');
    const tpsBar = document.getElementById('tps-bar');
    
    if (!tpsElement || !tpsBar) return;
    
    // Only update if server is online (based on status text)
    const serverStatus = document.getElementById('server-status');
    if (serverStatus && serverStatus.textContent.includes('Online')) {
        const tps = (19.0 + Math.random() * 1.0).toFixed(1);
        tpsElement.textContent = tps;
        tpsBar.style.width = (parseFloat(tps) / 20) * 100 + '%';
    } else {
        tpsElement.textContent = '0.0';
        tpsBar.style.width = '0%';
    }
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize the application
 */
function init() {
    debugLog('Initializing Misfits Studio...');
    
    // Show home page by default
    showPage('home');
    
    // Initialize gallery
    const gallery = document.querySelector('.gallery-carousel');
    if (gallery) {
        startAutoSlide();
        
        // Pause auto-advance on hover/touch
        const container = document.querySelector('.gallery-container');
        if (container) {
            container.addEventListener('mouseenter', () => {
                State.gallery.isPaused = true;
            });
            container.addEventListener('mouseleave', () => {
                State.gallery.isPaused = false;
            });
            
            // Touch events for mobile
            container.addEventListener('touchstart', () => {
                State.gallery.isPaused = true;
            });
            container.addEventListener('touchend', () => {
                State.gallery.isPaused = false;
            });
        }
    }
    
    // Fetch server status
    fetchServerStatus();
    setInterval(fetchServerStatus, 30000); // Update every 30 seconds
    setInterval(simulateTPS, 10000); // Update TPS every 10 seconds
    
    // Handle window resize with debounce for performance
    const debouncedResize = debounce(handleResize, 250);
    window.addEventListener('resize', debouncedResize);
    
    // Handle online/offline events
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Add keyboard navigation for gallery
    document.addEventListener('keydown', handleKeyboard);
    
    // Close menu when clicking nav links on mobile
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                closeMenu();
            }
        });
    });
    
    // Initialize all images with lazy loading
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        images.forEach(img => {
            img.setAttribute('loading', 'lazy');
        });
    }
    
    debugLog('Initialization complete');
}

/**
 * Handle window resize
 */
function handleResize() {
    if (window.innerWidth > 768 && State.isMenuOpen) {
        closeMenu();
    }
    
    // Adjust gallery height for better mobile experience
    const gallery = document.querySelector('.gallery-container');
    if (gallery) {
        // Force reflow for responsive images
        gallery.style.transform = 'translateZ(0)';
    }
}

/**
 * Handle online event
 */
function handleOnline() {
    State.isOnline = true;
    debugLog('Internet connection restored');
    showNotification('Internet connection restored. Refreshing server status...', 'success');
    State.retryCount = 0;
    fetchServerStatus();
}

/**
 * Handle offline event
 */
function handleOffline() {
    State.isOnline = false;
    debugLog('Internet connection lost');
    showNotification('Internet connection lost. Showing cached data...', 'warning');
}

/**
 * Handle keyboard navigation
 */
function handleKeyboard(e) {
    // Don't handle keyboard events when menu is open
    if (State.isMenuOpen) return;
    
    // Only handle if gallery is in viewport
    const gallery = document.querySelector('.gallery-container');
    if (!gallery) return;
    
    const rect = gallery.getBoundingClientRect();
    const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isInViewport) {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            changeSlide(-1);
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            changeSlide(1);
        }
    }
}

// ============================================
// START APPLICATION
// ============================================

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    // DOM is already loaded
    init();
}

// ============================================
// EXPORT GLOBALS
// ============================================
window.showPage = showPage;
window.copyIP = copyIP;
window.changeSlide = changeSlide;
window.goToSlide = goToSlide;
window.toggleMenu = toggleMenu;
window.closeMenu = closeMenu;