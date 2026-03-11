/**
 * Image Protection System
 * Protects candidate photos from casual downloading while maintaining accessibility
 * RGPD Compliant - No tracking, no cookies, no external dependencies
 */

(function () {
    'use strict';

    // Configuration
    const CONFIG = {
        protectionMessages: {
            rightClick: 'Cette image est protégée par le droit d\'auteur.',
            saveBlocked: 'L\'enregistrement de cette page est désactivé pour protéger les images.',
            devTools: 'Les outils de développement sont détectés.'
        },
        selectors: {
            protectedImages: '.candidate-card img, [data-protected="true"]',
            imageWrappers: '.card-image'
        }
    };

    // Initialize protection when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initProtection);
    } else {
        initProtection();
    }

    function initProtection() {
        console.log('🛡️ Initializing image protection system...');

        // Apply all protection layers
        preventRightClick();
        preventDragDrop();
        preventKeyboardShortcuts();
        addProtectionOverlays();
        implementLazyLoading();

        console.log('✅ Image protection system active');
    }

    /**
     * Prevent right-click context menu on protected images
     */
    function preventRightClick() {
        document.addEventListener('contextmenu', function (e) {
            const target = e.target;

            // Check if target is a protected image or within a protected wrapper
            if (target.matches(CONFIG.selectors.protectedImages) ||
                target.closest(CONFIG.selectors.imageWrappers)) {
                e.preventDefault();
                showNotification(CONFIG.protectionMessages.rightClick);
                return false;
            }
        }, false);
    }

    /**
     * Prevent drag and drop of images
     */
    function preventDragDrop() {
        const images = document.querySelectorAll(CONFIG.selectors.protectedImages);

        images.forEach(img => {
            // Set draggable attribute
            img.setAttribute('draggable', 'false');

            // Prevent drag start event
            img.addEventListener('dragstart', function (e) {
                e.preventDefault();
                return false;
            }, false);

            // Prevent mouse down for drag initiation
            img.addEventListener('mousedown', function (e) {
                if (e.button === 0) { // Left click
                    e.preventDefault();
                }
            }, false);
        });
    }

    /**
     * Block common keyboard shortcuts for saving/downloading
     */
    function preventKeyboardShortcuts() {
        document.addEventListener('keydown', function (e) {
            // Ctrl+S (Save)
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                showNotification(CONFIG.protectionMessages.saveBlocked);
                return false;
            }

            // Ctrl+Shift+S (Save As)
            if (e.ctrlKey && e.shiftKey && e.key === 'S') {
                e.preventDefault();
                showNotification(CONFIG.protectionMessages.saveBlocked);
                return false;
            }

            // F12 (Developer Tools) - just notify, don't block completely
            if (e.key === 'F12') {
                showNotification(CONFIG.protectionMessages.devTools, 'info');
            }

            // Ctrl+Shift+I (Developer Tools) - just notify, don't block completely
            if (e.ctrlKey && e.shiftKey && e.key === 'I') {
                showNotification(CONFIG.protectionMessages.devTools, 'info');
            }

            // Print Screen - can't actually prevent, just notify
            if (e.key === 'PrintScreen') {
                showNotification('Les captures d\'écran peuvent être protégées par les droits d\'auteur.', 'info');
            }
        }, false);
    }

    /**
     * Add invisible protection overlays on top of images
     */
    function addProtectionOverlays() {
        const imageWrappers = document.querySelectorAll(CONFIG.selectors.imageWrappers);

        imageWrappers.forEach(wrapper => {
            // Check if overlay already exists
            if (wrapper.querySelector('.image-protection-overlay')) {
                return;
            }

            // Create protection overlay
            const overlay = document.createElement('div');
            overlay.className = 'image-protection-overlay';
            overlay.setAttribute('aria-hidden', 'true');

            // Style the overlay (backup in case CSS doesn't load)
            overlay.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10;
                cursor: default;
                background: transparent;
            `;

            wrapper.style.position = 'relative';
            wrapper.appendChild(overlay);
        });
    }

    /**
     * Implement lazy loading for images (performance optimization)
     */
    function implementLazyLoading() {
        const images = document.querySelectorAll(CONFIG.selectors.protectedImages);

        // Check if browser supports native lazy loading
        if ('loading' in HTMLImageElement.prototype) {
            images.forEach(img => {
                if (!img.hasAttribute('loading')) {
                    img.setAttribute('loading', 'lazy');
                }
            });
            console.log('✅ Native lazy loading enabled');
        } else {
            // Fallback: Use Intersection Observer
            implementIntersectionObserver(images);
            console.log('✅ Intersection Observer lazy loading enabled');
        }
    }

    /**
     * Intersection Observer fallback for lazy loading
     */
    function implementIntersectionObserver(images) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;

                    // Load the image
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }

                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px', // Start loading 50px before entering viewport
            threshold: 0.01
        });

        images.forEach(img => {
            imageObserver.observe(img);
        });
    }

    /**
     * Show notification message to user
     */
    function showNotification(message, type = 'warning') {
        // Remove any existing notification
        const existing = document.querySelector('.image-protection-notification');
        if (existing) {
            existing.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'image-protection-notification';
        notification.setAttribute('role', 'alert');
        notification.setAttribute('aria-live', 'polite');

        // Set icon based on type
        const icon = type === 'info' ? 'ℹ️' : '🔒';
        notification.textContent = `${icon} ${message}`;

        // Style notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'info' ? '#4a9d5f' : '#d64370'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            font-family: 'Montserrat', sans-serif;
            font-size: 0.9rem;
            font-weight: 600;
            max-width: 300px;
            animation: slideInRight 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Auto-remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Add CSS animations for notifications
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Prevent text selection on protected images (additional layer)
    const preventSelectionStyle = document.createElement('style');
    preventSelectionStyle.textContent = `
        ${CONFIG.selectors.protectedImages} {
            user-select: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            -webkit-user-drag: none;
            -webkit-touch-callout: none;
        }
    `;
    document.head.appendChild(preventSelectionStyle);

})();
