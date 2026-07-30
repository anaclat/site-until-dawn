/**
 * Until Dawn - Script Principal
 * Funcionalidades: Scroll animations, Menu mobile, Scroll to top,
 * Reading progress, Search modal, Theme toggle, Intersection Observer
 */

(function() {
    'use strict';

    // ===== LOADING SCREEN =====
    window.addEventListener('load', function() {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            setTimeout(function() {
                loadingScreen.classList.add('hidden');
                setTimeout(function() {
                    loadingScreen.remove();
                }, 500);
            }, 800);
        }
    });

    // ===== SCROLL TO TOP BUTTON =====
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    window.addEventListener('scroll', function() {
        if (scrollTopBtn) {
            if (window.scrollY > 400) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }
    });

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===== READING PROGRESS BAR =====
    const progressBar = document.querySelector('.reading-progress');
    
    window.addEventListener('scroll', function() {
        if (!progressBar) return;
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });

    // ===== MOBILE MENU TOGGLE =====
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.main-nav ul');
    
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', function() {
            navList.classList.toggle('open');
            const isOpen = navList.classList.contains('open');
            menuToggle.setAttribute('aria-expanded', isOpen);
            menuToggle.textContent = isOpen ? '✕' : '☰';
        });
    }

    // Close menu when clicking a link (mobile)
    document.querySelectorAll('.nav-link').forEach(function(link) {
        link.addEventListener('click', function() {
            if (navList) navList.classList.remove('open');
            if (menuToggle) menuToggle.textContent = '☰';
        });
    });

    // ===== INTERSECTION OBSERVER - ANIMATIONS ON SCROLL =====
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.classList.add('loaded');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe cast members and mechanic cards
    document.querySelectorAll('.cast-member, .mechanic-card, .story-point, .curiosity-card, .cast-card').forEach(function(el) {
        observer.observe(el);
    });

    // ===== SMOOTH SCROLL FOR INTERNAL LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ===== THEME TOGGLE (DARK/LIGHT) =====
    const themeToggle = document.querySelector('.theme-toggle');
    const html = document.documentElement;
    
    if (themeToggle) {
        const savedTheme = localStorage.getItem('until-dawn-theme');
        if (savedTheme === 'light') {
            html.classList.add('light-mode');
            themeToggle.textContent = '🌙';
        }
        
        themeToggle.addEventListener('click', function() {
            html.classList.toggle('light-mode');
            const isLight = html.classList.contains('light-mode');
            themeToggle.textContent = isLight ? '🌙' : '☀️';
            localStorage.setItem('until-dawn-theme', isLight ? 'light' : 'dark');
        });
    }

    // ===== SEARCH MODAL =====
    const searchModal = document.querySelector('.search-modal');
    const searchInput = document.querySelector('.search-input');
    const searchClose = document.querySelector('.search-close');
    
    // Keyboard shortcut (Ctrl+K or Cmd+K)
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            if (searchModal) {
                searchModal.classList.toggle('active');
                if (searchModal.classList.contains('active') && searchInput) {
                    searchInput.focus();
                }
            }
        }
        if (e.key === 'Escape' && searchModal) {
            searchModal.classList.remove('active');
        }
    });

    if (searchClose && searchModal) {
        searchClose.addEventListener('click', function() {
            searchModal.classList.remove('active');
        });
    }

    if (searchModal) {
        searchModal.addEventListener('click', function(e) {
            if (e.target === searchModal) {
                searchModal.classList.remove('active');
            }
        });
    }

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            const resultsContainer = document.querySelector('.search-results');
            if (!resultsContainer) return;
            
            resultsContainer.innerHTML = '';
            
            if (query.length < 2) return;
            
            // Searchable content data
            const searchData = [
                { title: 'Sinopse', content: 'Um ano após o misterioso desaparecimento de sua irmã, Clover e seus amigos partem para o vale remoto.', page: 'index.html' },
                { title: 'Ella Rubin - Clover', content: 'Protagonista central, busca encontrar sua irmã desaparecida.', page: 'elenco.html' },
                { title: 'Peter Stormare - Dr. Alan Hill', content: 'Psicólogo que interage com os personagens.', page: 'elenco.html' },
                { title: 'Maia Mitchell - Melanie', content: 'Irmã mais velha de Clover que desaparece misteriosamente.', page: 'elenco.html' },
                { title: 'Michael Cimino - Max', content: 'Ex-namorado de Clover, acompanha o grupo.', page: 'elenco.html' },
                { title: 'Odessa A\'zion - Nina', content: 'Melhor amiga de Clover.', page: 'elenco.html' },
                { title: 'Belmont Cameli - Abe', content: 'Namorado de Nina, parte do grupo preso.', page: 'elenco.html' },
                { title: 'Ji Young Yoo - Megan', content: 'Meia-irmã de Max, uma das vítimas dos Wendigos.', page: 'elenco.html' },
                { title: 'Efeito Borboleta', content: 'Toda decisão do jogador tem impacto direto e irreversível na narrativa.', page: 'extras.html' },
                { title: 'Quick Time Event (QTE)', content: 'Sequências de ação onde o jogador deve apertar botões rapidamente.', page: 'extras.html' },
                { title: 'Wendigos', content: 'Seres canibais da mitologia indígena algonquina.', page: 'extras.html' },
                { title: 'Supermassive Games', content: 'Desenvolvedora do jogo original Until Dawn (2015).', page: 'extras.html' },
                { title: 'Trailer Oficial', content: 'Until Dawn - Trailer Oficial Dublado em Português.', page: 'index.html' },
                { title: 'Totens do Futuro', content: 'Artefatos indígenas que dão vislumbres fragmentados do futuro.', page: 'extras.html' },
                { title: 'Montanha Blackwood', content: 'Cenário isolado onde se passa a história.', page: 'extras.html' }
            ];
            
            const results = searchData.filter(function(item) {
                return item.title.toLowerCase().includes(query) || 
                       item.content.toLowerCase().includes(query);
            });
            
            if (results.length === 0) {
                resultsContainer.innerHTML = '<div class="search-result-item">Nenhum resultado encontrado para "' + query + '"</div>';
                return;
            }
            
            results.forEach(function(result) {
                const div = document.createElement('div');
                div.className = 'search-result-item';
                div.innerHTML = '<strong>' + result.title + '</strong><br><small style="color: var(--silver);">' + result.content.substring(0, 60) + '...</small>';
                div.addEventListener('click', function() {
                    searchModal.classList.remove('active');
                    window.location.href = result.page;
                });
                resultsContainer.appendChild(div);
            });
        });
    }

    // ===== NAVBAR SHADOW ON SCROLL =====
    const mainNav = document.querySelector('.main-nav');
    
    window.addEventListener('scroll', function() {
        if (mainNav) {
            if (window.scrollY > 100) {
                mainNav.style.background = 'linear-gradient(to bottom, rgba(0, 0, 0, 0.99) 0%, rgba(90, 0, 0, 0.95) 100%)';
            } else {
                mainNav.style.background = 'linear-gradient(to bottom, rgba(0, 0, 0, 0.98) 0%, rgba(90, 0, 0, 0.9) 100%)';
            }
        }
    });

    // ===== CAST MEMBER ANIMATION DELAY =====
    const castMembers = document.querySelectorAll('.cast-member');
    castMembers.forEach(function(member, index) {
        member.style.transitionDelay = (index * 0.1) + 's';
    });

    // ===== LAZY IMAGE LOAD WITH FADE =====
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    }, { rootMargin: '50px' });

    lazyImages.forEach(function(img) {
        imageObserver.observe(img);
    });

    // ===== ACTIVE NAV LINK HIGHLIGHT =====
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(function(link) {
        const href = link.getAttribute('href');
        if (href === currentPath) {
            link.classList.add('active');
        }
    });

    // ===== CONSOLE EASTER EGG =====
    console.log('%c🎬 Until Dawn - Terror Psicológico', 'font-size: 20px; color: #8b0000; font-weight: bold;');
    console.log('%c"Cada escolha tem uma consequência."', 'font-size: 14px; color: #d4af37; font-style: italic;');
    console.log('%cDesenvolvido por Ana - IFSC', 'font-size: 12px; color: #c0c0c0;');

})();
