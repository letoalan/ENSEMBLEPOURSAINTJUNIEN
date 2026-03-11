// ========================================
// SCRIPT PRINCIPAL - ESJ 2026
// ========================================

document.addEventListener('DOMContentLoaded', () => {

    // ========================================
    // ACCORDION FUNCTIONALITY (Section 3)
    // ========================================

    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            // Close other items
            accordionItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.accordion-content').style.maxHeight = null;
                    otherItem.querySelector('.toggle-icon').textContent = '+';
                }
            });

            // Toggle current item
            item.classList.toggle('active');
            const content = item.querySelector('.accordion-content');
            const icon = item.querySelector('.toggle-icon');

            if (item.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
                icon.textContent = '-';
            } else {
                content.style.maxHeight = null;
                icon.textContent = '+';
            }
        });
    });

    // ========================================
    // MOBILE MENU TOGGLE
    // ========================================

    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'white';
                navLinks.style.padding = '1rem';
                navLinks.style.boxShadow = '0 5px 10px rgba(0,0,0,0.1)';
            }
        });
    }

    // ========================================
    // SMOOTH SCROLLING
    // ========================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Close mobile menu if open
            if (window.innerWidth <= 768 && navLinks && navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            }

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // STICKY HEADER
    // ========================================

    const nav = document.querySelector('.main-nav');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            nav.style.background = 'transparent';
            nav.style.boxShadow = 'none';
        }
    });

    // ========================================
    // RESET MOBILE MENU ON RESIZE
    // ========================================

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.style.display = '';
            navLinks.style.flexDirection = '';
            navLinks.style.position = '';
            navLinks.style.top = '';
            navLinks.style.left = '';
            navLinks.style.width = '';
            navLinks.style.background = '';
            navLinks.style.padding = '';
            navLinks.style.boxShadow = '';
        }
    });

    // ========================================
    // ANIMATIONS SECTION 1 - INTERSECTION OBSERVER
    // ========================================

    // Configuration de l'Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // L'élément doit être visible à 15%
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Ajouter la classe 'visible' pour déclencher l'animation
                entry.target.classList.add('visible');

                // Optionnel : arrêter d'observer une fois animé (économie de ressources)
                // Commentez la ligne ci-dessous si vous voulez que l'animation se répète
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observer tous les paragraphes avec animation fade-in
    const fadeElements = document.querySelectorAll('.fade-in-paragraph');
    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // Observer les pull-quotes
    const pullQuotes = document.querySelectorAll('.pull-quote');
    pullQuotes.forEach(el => {
        observer.observe(el);
    });

    // Observer les blocs action-summary
    const actionSummaries = document.querySelectorAll('.action-summary');
    actionSummaries.forEach(el => {
        observer.observe(el);
    });

    // Observer les text-emphasis
    const textEmphasis = document.querySelectorAll('.text-emphasis');
    textEmphasis.forEach(el => {
        observer.observe(el);
    });

    // Observer le HR animé
    const animatedHr = document.querySelector('.animated-hr');
    if (animatedHr) {
        observer.observe(animatedHr);
    }

    // ========================================
    // ANIMATION SPÉCIALE : COMPTEUR DE STATS (optionnel)
    // ========================================

    // Fonction pour animer des compteurs (si vous ajoutez des stats plus tard)
    function animateCounter(element, target, duration = 2000, suffix = '') {
        let start = 0;
        const increment = target / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start) + suffix;
            }
        }, 16);
    }

    // Exemple d'utilisation (décommentez si vous ajoutez des stats)
    // const statNumbers = document.querySelectorAll('.stat-number');
    // statNumbers.forEach(stat => {
    //     const target = parseInt(stat.getAttribute('data-target'));
    //     const suffix = stat.getAttribute('data-suffix') || '';
    //     animateCounter(stat, target, 2000, suffix);
    // });

    // ========================================
    // EFFET PARALLAXE LÉGER SUR LES GRID-ITEMS (optionnel)
    // ========================================

    const gridItems = document.querySelectorAll('.grid-item.text-col');

    gridItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px)';
        });

        item.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });

    // ========================================
    // ANIMATION DES ICÔNES EMPHASIS AU SCROLL
    // ========================================

    const emphasisIcons = document.querySelectorAll('.emphasis-icon');

    const iconObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animation de rebond sur l'icône
                entry.target.style.animation = 'bounceIn 0.6s ease';
                iconObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    emphasisIcons.forEach(icon => {
        iconObserver.observe(icon);
    });

    // ========================================
    // ANIMATION PROGRESSIVE DES ITEMS DE LISTE
    // ========================================

    const projectLists = document.querySelectorAll('.project-list');

    projectLists.forEach(list => {
        const items = list.querySelectorAll('li');

        const listObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '0';
                            item.style.transform = 'translateX(-20px)';

                            setTimeout(() => {
                                item.style.transition = 'all 0.4s ease';
                                item.style.opacity = '1';
                                item.style.transform = 'translateX(0)';
                            }, 50);
                        }, index * 100); // Délai progressif
                    });
                    listObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        listObserver.observe(list);
    });

    // ========================================
    // EFFET TYPING SUR LES PULL-QUOTES (optionnel, effet "wow")
    // ========================================

    // Décommentez si vous voulez un effet "machine à écrire" sur les citations
    /*
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.textContent = '';

        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    const pullQuotesTyping = document.querySelectorAll('.pull-quote');
    const typingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const originalText = entry.target.textContent;
                typeWriter(entry.target, originalText, 30);
                typingObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    pullQuotesTyping.forEach(quote => {
        typingObserver.observe(quote);
    });
    */

    // ========================================
    // GESTION DES PERFORMANCES - DESACTIVER ANIMATIONS SI PREFERS-REDUCED-MOTION
    // ========================================

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (prefersReducedMotion.matches) {
        // Désactiver toutes les animations CSS
        document.querySelectorAll('.fade-in-paragraph, .pull-quote, .text-emphasis, .action-summary').forEach(el => {
            el.style.animation = 'none';
            el.style.transition = 'none';
        });
    }

    // ========================================
    // LOG DE DÉBOGAGE (à retirer en production)
    // ========================================

    console.log('✅ Script ESJ 2026 chargé avec succès');
    console.log(`📊 Éléments animés détectés :`);
    console.log(`   - ${fadeElements.length} paragraphes fade-in`);
    console.log(`   - ${pullQuotes.length} pull-quotes`);
    console.log(`   - ${actionSummaries.length} action-summary`);
    console.log(`   - ${textEmphasis.length} text-emphasis`);
    console.log(`   - ${accordionItems.length} items accordion`);

});

// ========================================
// KEYFRAME POUR ANIMATION BOUNCE (icônes)
// ========================================

// Cette animation est définie en CSS, mais voici le code si vous voulez la créer dynamiquement :
/*
const style = document.createElement('style');
style.textContent = `
    @keyframes bounceIn {
        0% { transform: scale(0); opacity: 0; }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); opacity: 1; }
    }
`;
document.head.appendChild(style);
*/
