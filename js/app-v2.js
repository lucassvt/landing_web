/**
 * LA MASCOTERA - Selector de Región V2
 * Versión con carruseles laterales
 */

// ==========================================
// CONFIGURACIÓN DE TIENDAS
// ==========================================

const TIENDAS_CONFIG = {
    tucuman: {
        nombre: 'Tucumán',
        url: 'https://lamascotera-tucuman.mitiendanube.com',
        grupo: 'principal'
    },
    salta_santiago: {
        nombre: 'Salta / Santiago',
        url: 'https://lamascotera-salta.mitiendanube.com',
        grupo: 'principal'
    },
    neuquen: {
        nombre: 'Neuquén',
        url: 'https://lamascotera-neuquen.mitiendanube.com',
        grupo: 'principal'
    },
    cordoba: {
        nombre: 'Córdoba',
        url: 'https://lamascotera-franquicias.mitiendanube.com',
        grupo: 'franquicia'
    },
    mendoza: {
        nombre: 'Mendoza',
        url: 'https://lamascotera-franquicias.mitiendanube.com',
        grupo: 'franquicia'
    },
    jujuy: {
        nombre: 'Jujuy',
        url: 'https://lamascotera-franquicias.mitiendanube.com',
        grupo: 'franquicia'
    },
    resto_pais: {
        nombre: 'Resto del país',
        url: 'https://lamascotera-tucuman.mitiendanube.com',
        grupo: 'envios'
    }
};

const STORAGE_KEY = 'lamascotera_region';

// Configuración de carruseles
const CAROUSEL_CONFIG = {
    left: {
        interval: 3500,
        element: 'carouselLeft',
        dots: 'dotsLeft'
    },
    right: {
        interval: 4500, // Diferente tiempo para efecto más dinámico
        element: 'carouselRight',
        dots: 'dotsRight'
    }
};

// ==========================================
// INICIALIZACIÓN
// ==========================================

function init() {
    clearSavedRegion();
    setupEventListeners();
    initCarousels();
}

// ==========================================
// CARRUSELES
// ==========================================

function initCarousels() {
    Object.keys(CAROUSEL_CONFIG).forEach(side => {
        const config = CAROUSEL_CONFIG[side];
        const track = document.getElementById(config.element);
        const dotsContainer = document.getElementById(config.dots);

        if (!track || !dotsContainer) return;

        const slides = track.querySelectorAll('.carousel-slide');
        if (slides.length <= 1) return;

        // Crear dots
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => goToSlide(side, index));
            dotsContainer.appendChild(dot);
        });

        // Iniciar rotación automática
        let currentSlide = 0;

        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            dotsContainer.children[currentSlide].classList.remove('active');

            currentSlide = (currentSlide + 1) % slides.length;

            slides[currentSlide].classList.add('active');
            dotsContainer.children[currentSlide].classList.add('active');
        }

        // Guardar referencia para control manual
        track.dataset.currentSlide = currentSlide;
        track.carouselInterval = setInterval(nextSlide, config.interval);

        // Pausar al hover
        track.addEventListener('mouseenter', () => {
            clearInterval(track.carouselInterval);
        });

        track.addEventListener('mouseleave', () => {
            track.carouselInterval = setInterval(nextSlide, config.interval);
        });
    });
}

function goToSlide(side, index) {
    const config = CAROUSEL_CONFIG[side];
    const track = document.getElementById(config.element);
    const dotsContainer = document.getElementById(config.dots);

    if (!track || !dotsContainer) return;

    const slides = track.querySelectorAll('.carousel-slide');
    const dots = dotsContainer.querySelectorAll('.carousel-dot');

    // Remover active de todos
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Activar el seleccionado
    slides[index].classList.add('active');
    dots[index].classList.add('active');

    track.dataset.currentSlide = index;
}

// ==========================================
// SELECTOR DE REGIÓN
// ==========================================

function setupEventListeners() {
    const regionCards = document.querySelectorAll('.region-card');

    regionCards.forEach(card => {
        card.addEventListener('click', handleRegionClick);
    });
}

function handleRegionClick(event) {
    const card = event.currentTarget;
    const region = card.dataset.region;

    if (!region || !TIENDAS_CONFIG[region]) {
        console.error('Región no válida:', region);
        return;
    }

    card.classList.add('loading');

    const rememberCheckbox = document.getElementById('rememberRegion');
    const shouldRemember = rememberCheckbox ? rememberCheckbox.checked : false;

    if (shouldRemember) {
        saveRegion(region);
    }

    showToast(`Redirigiendo a ${TIENDAS_CONFIG[region].nombre}...`);

    setTimeout(() => {
        redirectToStore(region, false);
    }, 800);
}

function redirectToStore(region, isAutoRedirect) {
    const tienda = TIENDAS_CONFIG[region];

    if (!tienda || !tienda.url) {
        console.error('URL de tienda no configurada para:', region);
        return;
    }

    const isPlaceholder = tienda.url.includes('mitiendanube.com');

    if (isPlaceholder) {
        showToast(`${tienda.nombre} - URL pendiente de configurar`);

        setTimeout(() => {
            document.querySelectorAll('.region-card').forEach(card => {
                card.classList.remove('loading');
            });
        }, 1500);
        return;
    }

    if (isAutoRedirect) {
        showToast(`Bienvenido de nuevo! Redirigiendo a ${tienda.nombre}...`);
        setTimeout(() => {
            window.location.href = tienda.url;
        }, 1000);
    } else {
        window.location.href = tienda.url;
    }
}

// ==========================================
// LOCAL STORAGE
// ==========================================

function saveRegion(region) {
    try {
        localStorage.setItem(STORAGE_KEY, region);
    } catch (error) {
        console.warn('No se pudo guardar la región en localStorage:', error);
    }
}

function getSavedRegion() {
    try {
        return localStorage.getItem(STORAGE_KEY);
    } catch (error) {
        console.warn('No se pudo leer localStorage:', error);
        return null;
    }
}

function clearSavedRegion() {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.warn('No se pudo limpiar localStorage:', error);
    }
}

// ==========================================
// TOAST
// ==========================================

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = toast.querySelector('.toast-message');

    if (toastMessage) {
        toastMessage.textContent = message;
    }

    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ==========================================
// UTILIDADES
// ==========================================

function checkForRegionChange() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('cambiar') === '1') {
        clearSavedRegion();
    }
}

checkForRegionChange();

// ==========================================
// INICIALIZAR
// ==========================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Exponer globalmente
window.LaMascotera = {
    clearSavedRegion,
    getSavedRegion,
    TIENDAS_CONFIG
};
