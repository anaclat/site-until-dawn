// script.js - VERSÃO COMPLETA E OTIMIZADA
document.addEventListener('DOMContentLoaded', function() {
    // Configuração inicial
    const config = {
        enableAnimations: !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        isMobile: window.innerWidth < 768
    };

    console.log('🔮 Until Dawn - Site inicializado');
    console.log('📱 Mobile:', config.isMobile);
    console.log('🎬 Animações habilitadas:', config.enableAnimations);

    // Inicializar todos os efeitos
    initBasicEffects(config);

    // Inicialização específica por página
    if (document.querySelector('.full-cast-grid')) {
        initCastPage(config);
    }

    if (document.querySelector('.mechanics-section')) {
        initExtrasPage(config);
    }

    // Inicializar seção do trailer se existir
    if (document.querySelector('.trailer-section')) {
        initTrailerSection(config);
    }

    // Carregamento otimizado de imagens
    initLazyLoading();

    // Monitoramento de performance
    initPerformanceMonitoring();
});

function initBasicEffects(config) {
    // Efeito de digitação - apenas se animações estão habilitadas
    if (config.enableAnimations) {
        initTypingEffect();
    }

    // Efeitos de parallax otimizados
    initParallax();

    // Efeitos de hover com debounce
    initHoverEffects();

    // Efeito de glitch aleatório
    if (config.enableAnimations) {
        initRandomGlitch();
    }

    // Navegação suave
    initSmoothNavigation();

    // Efeitos de sangue interativos
    initBloodEffects(config);

    // Sistema de áudio ambiente
    initAmbientAudio();
}

function initTypingEffect() {
    const tagline = document.querySelector('.tagline');
    if (!tagline) return;

    const originalText = tagline.textContent;
    if (!originalText.trim()) return;

    tagline.textContent = '';
    tagline.style.minHeight = getComputedStyle(tagline).height;

    let i = 0;
    function typeWriter() {
        if (i < originalText.length) {
            tagline.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 80);
        }
    }
    setTimeout(typeWriter, 1500);
}

function initParallax() {
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.main-header');
        const bloodDrips = document.querySelector('.blood-drips');
        const fogOverlay = document.querySelector('.fog-overlay');
        
        if (header) {
            header.style.transform = `translateY(${scrolled * 0.4}px)`;
        }
        if (bloodDrips) {
            bloodDrips.style.transform = `translateY(${scrolled * 0.2}px) rotate(${scrolled * 0.05}deg)`;
        }
        if (fogOverlay) {
            fogOverlay.style.transform = `translateY(${scrolled * 0.1}px) scale(${1 + scrolled * 0.0001})`;
        }
        
        // Efeito de sombra na navegação
        const nav = document.querySelector('.main-nav');
        if (nav) {
            const opacity = Math.min(scrolled / 300, 0.9);
            nav.style.background = `linear-gradient(to bottom, 
                rgba(0, 0, 0, ${opacity}) 0%, 
                rgba(90, 0, 0, ${opacity * 0.9}) 100%)`;
        }
        
        ticking = false;
    }

    const scrollHandler = debounce(function() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, 10);

    window.addEventListener('scroll', scrollHandler, { passive: true });
}

function initHoverEffects() {
    // Efeitos de hover otimizados
    const cards = document.querySelectorAll('.cast-member, .crew-member, .mechanic-card, .cast-card, .curiosity-card, .story-point');
    
    const hoverHandler = {
        enter: function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.transition = 'all 0.3s ease';
            this.style.zIndex = '10';
            
            // Efeito de brilho sutil
            this.style.boxShadow = 
                '0 20px 40px rgba(139, 0, 0, 0.4), 0 0 30px rgba(139, 0, 0, 0.2)';
        },
        leave: function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.zIndex = '1';
            this.style.boxShadow = '';
        }
    };

    cards.forEach(card => {
        card.addEventListener('mouseenter', hoverHandler.enter, { passive: true });
        card.addEventListener('mouseleave', hoverHandler.leave, { passive: true });
        
        // Suporte para dispositivos touch
        card.addEventListener('touchstart', function() {
            this.style.transform = 'translateY(-4px) scale(1.01)';
        }, { passive: true });
        
        card.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = 'translateY(0) scale(1)';
            }, 150);
        }, { passive: true });
    });

    // Efeito de pulsação nas fotos do elenco
    const photos = document.querySelectorAll('.cast-photo');
    photos.forEach(photo => {
        const pulseInterval = setInterval(() => {
            if (Math.random() > 0.8 && isElementInViewport(photo)) {
                photo.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    photo.style.transform = 'scale(1)';
                }, 300);
            }
        }, Math.random() * 8000 + 4000);

        // Cleanup no unmount
        photo.dataset.intervalId = pulseInterval;
    });

    // Efeitos especiais nos links de navegação
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.textShadow = '0 0 10px rgba(212, 175, 55, 0.8)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.textShadow = '';
        });
    });
}

function initRandomGlitch() {
    let glitchTimeout;

    function randomGlitch() {
        const titles = document.querySelectorAll('.section-title, .cast-details h3, .glitch-text');
        if (titles.length === 0) return;

        const randomTitle = titles[Math.floor(Math.random() * titles.length)];
        
        if (randomTitle && isElementInViewport(randomTitle)) {
            randomTitle.style.animation = 'glitch 0.3s ease';
            setTimeout(() => {
                randomTitle.style.animation = '';
            }, 300);
        }
        
        // Agendar próximo glitch
        glitchTimeout = setTimeout(randomGlitch, Math.random() * 8000 + 4000);
    }
    
    // Iniciar apenas se não for mobile para melhor performance
    if (!window.matchMedia('(max-width: 768px)').matches) {
        glitchTimeout = setTimeout(randomGlitch, 5000);
    }

    // Cleanup function
    return () => {
        if (glitchTimeout) {
            clearTimeout(glitchTimeout);
        }
    };
}

function initSmoothNavigation() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href !== '#!') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    
                    // Adicionar efeito de clique
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 150);
                    
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

function initBloodEffects(config) {
    if (!config.enableAnimations) return;

    // Criar efeitos de sangue interativos
    document.addEventListener('click', function(e) {
        if (Math.random() > 0.7) { // 30% de chance
            createBloodEffect(e.clientX, e.clientY);
        }
    });

    // Efeito de respingos aleatórios
    setInterval(() => {
        if (Math.random() > 0.8 && document.hasFocus()) {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            createBloodEffect(x, y);
        }
    }, 10000);
}

function createBloodEffect(x, y) {
    const blood = document.createElement('div');
    blood.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: var(--blood-red);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        left: ${x}px;
        top: ${y}px;
        opacity: 0.8;
        transform: scale(0);
        animation: bloodSplash 0.6s ease-out forwards;
    `;

    document.body.appendChild(blood);

    // Criar respingos
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const drip = document.createElement('div');
            drip.style.cssText = `
                position: fixed;
                width: 2px;
                height: 15px;
                background: var(--blood-red);
                pointer-events: none;
                z-index: 9999;
                left: ${x + Math.random() * 20 - 10}px;
                top: ${y}px;
                opacity: 0.6;
                transform: rotate(${Math.random() * 30 - 15}deg) scaleY(0);
                transform-origin: top center;
                animation: bloodDrip 0.8s ease-out ${i * 0.1}s forwards;
            `;
            document.body.appendChild(drip);

            // Remover após animação
            setTimeout(() => {
                if (drip.parentNode) {
                    drip.parentNode.removeChild(drip);
                }
            }, 1000);
        }, i * 100);
    }

    // Remover após animação
    setTimeout(() => {
        if (blood.parentNode) {
            blood.parentNode.removeChild(blood);
        }
    }, 600);
}

// Adicionar estas animações de sangue no CSS
const bloodStyles = document.createElement('style');
bloodStyles.textContent = `
    @keyframes bloodSplash {
        0% { transform: scale(0); opacity: 0; }
        50% { transform: scale(1.5); opacity: 0.8; }
        100% { transform: scale(1); opacity: 0; }
    }
    
    @keyframes bloodDrip {
        0% { transform: rotate(15deg) scaleY(0); opacity: 0; }
        50% { transform: rotate(15deg) scaleY(1); opacity: 0.6; }
        100% { transform: rotate(15deg) scaleY(0); opacity: 0; }
    }
`;
document.head.appendChild(bloodStyles);

function initAmbientAudio() {
    // Sistema de áudio ambiente opcional
    const audioContext = window.AudioContext || window.webkitAudioContext;
    
    if (audioContext && !window.matchMedia('(max-width: 768px)').matches) {
        try {
            const ctx = new audioContext();
            
            // Criar oscilador para som ambiente sutil
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();
            
            oscillator.type = 'sine';
            oscillator.frequency.value = 60;
            gainNode.gain.value = 0.02;
            
            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);
            
            // Iniciar apenas após interação do usuário
            document.addEventListener('click', function startAudio() {
                oscillator.start();
                document.removeEventListener('click', startAudio);
            }, { once: true });
            
            // Modulação aleatória para criar atmosfera
            setInterval(() => {
                if (Math.random() > 0.5) {
                    oscillator.frequency.setValueAtTime(
                        60 + Math.random() * 10, 
                        ctx.currentTime
                    );
                }
            }, 3000);
            
        } catch (error) {
            console.log('🔇 Áudio ambiente não suportado:', error.message);
        }
    }
}

function initCastPage(config) {
    console.log('🎭 Inicializando página do elenco...');
    
    const castMembers = document.querySelectorAll('.cast-member');
    if (castMembers.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                    
                    // Efeito sequencial para fotos
                    const photo = entry.target.querySelector('.cast-photo');
                    if (photo) {
                        setTimeout(() => {
                            photo.style.transform = 'scale(1.1) rotate(5deg)';
                            setTimeout(() => {
                                photo.style.transform = 'scale(1) rotate(0deg)';
                            }, 300);
                        }, index * 100 + 200);
                    }
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '50px' 
    });

    castMembers.forEach((member, index) => {
        member.style.opacity = '0';
        member.style.transform = 'translateY(50px) scale(0.9)';
        member.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(member);
    });

    // Efeitos específicos para cards do elenco
    const castCards = document.querySelectorAll('.cast-card');
    castCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const img = this.querySelector('img');
            const overlay = this.querySelector('.cast-overlay');
            
            if (img) {
                img.style.transform = 'scale(1.15)';
            }
            if (overlay) {
                overlay.style.opacity = '1';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const img = this.querySelector('img');
            const overlay = this.querySelector('.cast-overlay');
            
            if (img) {
                img.style.transform = 'scale(1)';
            }
            if (overlay) {
                overlay.style.opacity = '0';
            }
        });
    });
}

function initExtrasPage(config) {
    console.log('🎮 Inicializando página de extras...');
    
    // Efeito de revelação para as mecânicas do jogo
    const mechanicCards = document.querySelectorAll('.mechanic-card');
    const tableRows = document.querySelectorAll('.cast-table tr');
    const gameImages = document.querySelectorAll('.game-image');

    if (mechanicCards.length > 0) {
        const mechanicsObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        
                        // Efeito de brilho sequencial
                        setTimeout(() => {
                            entry.target.style.boxShadow = 
                                '0 0 30px rgba(139, 0, 0, 0.3)';
                            setTimeout(() => {
                                entry.target.style.boxShadow = '';
                            }, 1000);
                        }, 500);
                    }, index * 150);
                    mechanicsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        mechanicCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            card.style.transition = `all 0.8s ease ${index * 0.15}s`;
            mechanicsObserver.observe(card);
        });
    }

    // Efeitos de hover na tabela de elenco
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.background = 'rgba(139, 0, 0, 0.1)';
            this.style.transition = 'all 0.2s ease';
        }, { passive: true });
        
        row.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.background = '';
        }, { passive: true });
    });

    // Efeito de hover nas imagens do jogo
    gameImages.forEach(image => {
        image.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.1) contrast(1.1) sepia(0.1)';
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'all 0.3s ease';
        }, { passive: true });
        
        image.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(1) contrast(1) sepia(0)';
            this.style.transform = 'scale(1)';
        }, { passive: true });
    });

    // Contador de mecânicas para debug
    const mechanicCount = document.querySelectorAll('.mechanic-card').length;
    console.log(`🎯 Página de Extras carregada com ${mechanicCount} mecânicas principais`);
}

function initTrailerSection(config) {
    console.log('🎬 Inicializando seção do trailer...');
    
    const videoWrapper = document.querySelector('.video-wrapper');
    const iframe = document.querySelector('.video-wrapper iframe');
    
    if (!iframe) return;

    // Adicionar loading state
    videoWrapper.classList.add('loading');

    // Configurar iframe para melhor performance
    iframe.setAttribute('loading', 'lazy');
    iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
    
    // Parâmetros otimizados do YouTube
    const videoUrl = new URL(iframe.src);
    videoUrl.searchParams.set('autoplay', '0');
    videoUrl.searchParams.set('mute', '0');
    videoUrl.searchParams.set('controls', '1');
    videoUrl.searchParams.set('showinfo', '0');
    videoUrl.searchParams.set('rel', '0');
    videoUrl.searchParams.set('enablejsapi', '1');
    iframe.src = videoUrl.toString();

    // Quando o iframe carregar, remover loading
    iframe.addEventListener('load', function() {
        videoWrapper.classList.remove('loading');
        console.log('✅ Trailer carregado com sucesso!');
        
        // Adicionar efeito de confirmação
        videoWrapper.style.boxShadow = '0 0 30px rgba(76, 175, 80, 0.3)';
        setTimeout(() => {
            videoWrapper.style.boxShadow = '';
        }, 2000);
    });
    
    // Adicionar tratamento de erro
    iframe.addEventListener('error', function() {
        videoWrapper.classList.remove('loading');
        console.error('❌ Erro ao carregar o trailer');
        
        showTrailerError(videoWrapper);
    });
    
    // Estatísticas de engajamento
    let interactionCount = 0;
    const trailerStats = {
        clicks: 0,
        hoverTime: 0,
        hoverStart: null
    };

    videoWrapper.addEventListener('click', function() {
        trailerStats.clicks++;
        interactionCount++;
        console.log(`🎯 Trailer interagido ${interactionCount} vezes`);
    });

    videoWrapper.addEventListener('mouseenter', function() {
        trailerStats.hoverStart = Date.now();
    });

    videoWrapper.addEventListener('mouseleave', function() {
        if (trailerStats.hoverStart) {
            trailerStats.hoverTime += Date.now() - trailerStats.hoverStart;
            trailerStats.hoverStart = null;
        }
    });

    // Efeitos visuais no hover do trailer
    videoWrapper.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
        this.style.borderColor = 'var(--blood-red)';
    });

    videoWrapper.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.borderColor = 'rgba(139, 0, 0, 0.3)';
    });

    // Log de estatísticas periódico
    setInterval(() => {
        if (trailerStats.clicks > 0 || trailerStats.hoverTime > 0) {
            console.log('📊 Estatísticas do Trailer:', {
                clicks: trailerStats.clicks,
                hoverTime: `${(trailerStats.hoverTime / 1000).toFixed(1)}s`,
                totalInteractions: interactionCount
            });
        }
    }, 30000);
}

function showTrailerError(container) {
    const errorMsg = document.createElement('div');
    errorMsg.className = 'video-error';
    errorMsg.innerHTML = `
        <div class="error-content">
            <div class="error-icon">⚠️</div>
            <h4>Trailer Indisponível</h4>
            <p>Não foi possível carregar o trailer oficial.</p>
            <a href="https://www.youtube.com/watch?v=W--kUNMg1-E" target="_blank" class="error-link">
                ▶ Assistir no YouTube
            </a>
        </div>
    `;
    
    errorMsg.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        color: var(--silver);
        z-index: 10;
        background: rgba(0, 0, 0, 0.9);
        padding: 2rem;
        border-radius: 10px;
        border: 2px solid var(--blood-red);
        min-width: 250px;
    `;
    
    const errorLink = errorMsg.querySelector('.error-link');
    errorLink.style.cssText = `
        color: var(--gold);
        text-decoration: none;
        border: 1px solid var(--gold);
        padding: 0.8rem 1.5rem;
        border-radius: 5px;
        margin-top: 1rem;
        display: inline-block;
        transition: all 0.3s ease;
        font-family: 'Cinzel', serif;
        text-transform: uppercase;
        letter-spacing: 1px;
    `;
    
    errorLink.addEventListener('mouseenter', function() {
        this.style.background = 'var(--gold)';
        this.style.color = 'var(--deep-black)';
        this.style.transform = 'scale(1.05)';
    });
    
    errorLink.addEventListener('mouseleave', function() {
        this.style.background = 'transparent';
        this.style.color = 'var(--gold)';
        this.style.transform = 'scale(1)';
    });

    container.appendChild(errorMsg);
}

function initLazyLoading() {
    // Configurar lazy loading para imagens que não estão no viewport inicial
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    
                    // Adicionar transição suave
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.6s ease';
                    
                    img.onload = function() {
                        img.style.opacity = '1';
                    };
                    
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '50px' 
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback para browsers antigos
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

function initPerformanceMonitoring() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const perfData = performance.timing;
                const loadTime = perfData.loadEventEnd - perfData.navigationStart;
                const domReadyTime = perfData.domContentLoadedEventEnd - perfData.navigationStart;
                
                console.log('⚡ Métricas de Performance:', {
                    'Tempo Total': `${loadTime}ms`,
                    'DOM Ready': `${domReadyTime}ms`,
                    'Usável em': `${domReadyTime}ms`
                });
                
                // Alertar se o carregamento for muito lento
                if (loadTime > 3000) {
                    console.warn('⚠️ Site carregando lentamente. Considere otimizar imagens.');
                }
            }, 0);
        });
    }
}

// Utility functions
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

function isElementInViewport(el) {
    if (!el) return false;
    
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Handler de errors global
window.addEventListener('error', function(e) {
    console.error('❌ Erro capturado:', {
        message: e.error?.message,
        file: e.filename,
        line: e.lineno,
        column: e.colno
    });
});

// Handler para promises não tratadas
window.addEventListener('unhandledrejection', function(e) {
    console.error('❌ Promise rejeitada:', e.reason);
});

// Cleanup no unload
window.addEventListener('beforeunload', function() {
    // Limpar intervals
    const photos = document.querySelectorAll('.cast-photo');
    photos.forEach(photo => {
        if (photo.dataset.intervalId) {
            clearInterval(parseInt(photo.dataset.intervalId));
        }
    });
    
    console.log('👋 Until Dawn - Site descarregado');
});

// Export para uso em outros módulos (se necessário)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        debounce,
        throttle,
        isElementInViewport
    };
}