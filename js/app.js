/**
 * LA MASCOTERA - Selector de Región
 * Maneja la selección de región y redirección a Tienda Nube
 */

// ==========================================
// CONFIGURACIÓN DE TIENDAS
// Modificar estas URLs con las URLs reales de cada Tienda Nube
// ==========================================

const TIENDAS_CONFIG = {
    // Cuenta Dux Principal
    tucuman: {
        nombre: 'Tucumán',
        url: 'https://lamascotera-tucuman.mitiendanube.com', // Reemplazar con URL real
        grupo: 'principal'
    },
    salta_santiago: {
        nombre: 'Salta / Santiago',
        url: 'https://lamascotera-salta.mitiendanube.com', // Reemplazar con URL real
        grupo: 'principal'
    },
    neuquen: {
        nombre: 'Neuquén',
        url: 'https://lamascotera-neuquen.mitiendanube.com', // Reemplazar con URL real
        grupo: 'principal'
    },

    // Cuenta Dux Franquicias
    cordoba: {
        nombre: 'Córdoba',
        url: 'https://lamascotera-franquicias.mitiendanube.com', // Reemplazar con URL real
        grupo: 'franquicia'
    },
    mendoza: {
        nombre: 'Mendoza',
        url: 'https://lamascotera-franquicias.mitiendanube.com', // Reemplazar con URL real
        grupo: 'franquicia'
    },
    jujuy: {
        nombre: 'Jujuy',
        url: 'https://lamascotera-franquicias.mitiendanube.com', // Reemplazar con URL real
        grupo: 'franquicia'
    },

    // Resto del país (envíos desde Tucumán)
    resto_pais: {
        nombre: 'Resto del país',
        url: 'https://lamascotera-tucuman.mitiendanube.com', // Misma tienda que Tucumán
        grupo: 'envios'
    }
};

// Clave para localStorage
const STORAGE_KEY = 'lamascotera_region';

// Configuración del slider
const SLIDER_INTERVAL = 4000; // Cambiar slide cada 4 segundos

// ==========================================
// FUNCIONES PRINCIPALES
// ==========================================

/**
 * Inicializa la aplicación
 */
function init() {
    // TEMPORAL: Limpiar región guardada y desactivar auto-redirect
    // hasta que las URLs estén configuradas
    clearSavedRegion();

    // Configurar los event listeners
    setupEventListeners();

    // Iniciar slider de fondo (solo en desktop)
    initBackgroundSlider();

    // NOTA: Cuando las URLs estén listas, descomentar este código:
    /*
    const savedRegion = getSavedRegion();
    if (savedRegion && TIENDAS_CONFIG[savedRegion]) {
        redirectToStore(savedRegion, true);
    } else {
        setupEventListeners();
    }
    */
}

/**
 * Configura los event listeners para las tarjetas de región
 */
function setupEventListeners() {
    const regionCards = document.querySelectorAll('.region-card');

    regionCards.forEach(card => {
        card.addEventListener('click', handleRegionClick);
    });
}

/**
 * Maneja el click en una tarjeta de región
 * @param {Event} event
 */
function handleRegionClick(event) {
    const card = event.currentTarget;
    const region = card.dataset.region;

    if (!region || !TIENDAS_CONFIG[region]) {
        console.error('Región no válida:', region);
        return;
    }

    // Agregar clase de loading
    card.classList.add('loading');

    // Verificar si debe recordar la selección
    const rememberCheckbox = document.getElementById('rememberRegion');
    const shouldRemember = rememberCheckbox ? rememberCheckbox.checked : false;

    if (shouldRemember) {
        saveRegion(region);
    }

    // Mostrar toast y redirigir
    showToast(`Redirigiendo a ${TIENDAS_CONFIG[region].nombre}...`);

    // Pequeño delay para mostrar feedback visual
    setTimeout(() => {
        redirectToStore(region, false);
    }, 800);
}

/**
 * Redirige a la tienda correspondiente
 * @param {string} region - Identificador de la región
 * @param {boolean} isAutoRedirect - Si es redirección automática (región guardada)
 */
function redirectToStore(region, isAutoRedirect) {
    const tienda = TIENDAS_CONFIG[region];

    if (!tienda || !tienda.url) {
        console.error('URL de tienda no configurada para:', region);
        return;
    }

    // TEMPORAL: Verificar si la URL es un placeholder
    const isPlaceholder = tienda.url.includes('mitiendanube.com');

    if (isPlaceholder) {
        // Mostrar mensaje de que aún no está configurada
        showToast(`${tienda.nombre} - URL pendiente de configurar`);

        // Quitar estado de loading del botón
        setTimeout(() => {
            document.querySelectorAll('.region-card').forEach(card => {
                card.classList.remove('loading');
            });
        }, 1500);
        return;
    }

    if (isAutoRedirect) {
        // Mostrar mensaje breve antes de redirigir
        showToast(`Bienvenido de nuevo! Redirigiendo a ${tienda.nombre}...`);
        setTimeout(() => {
            window.location.href = tienda.url;
        }, 1000);
    } else {
        window.location.href = tienda.url;
    }
}

/**
 * Guarda la región seleccionada en localStorage
 * @param {string} region
 */
function saveRegion(region) {
    try {
        localStorage.setItem(STORAGE_KEY, region);
    } catch (error) {
        console.warn('No se pudo guardar la región en localStorage:', error);
    }
}

/**
 * Obtiene la región guardada de localStorage
 * @returns {string|null}
 */
function getSavedRegion() {
    try {
        return localStorage.getItem(STORAGE_KEY);
    } catch (error) {
        console.warn('No se pudo leer localStorage:', error);
        return null;
    }
}

/**
 * Elimina la región guardada (para usar en la tienda si quieren cambiar)
 */
function clearSavedRegion() {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.warn('No se pudo limpiar localStorage:', error);
    }
}

/**
 * Muestra un toast con un mensaje
 * @param {string} message
 */
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = toast.querySelector('.toast-message');

    if (toastMessage) {
        toastMessage.textContent = message;
    }

    toast.classList.add('show');

    // Ocultar después de 3 segundos (por si no hay redirección)
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ==========================================
// SLIDER DE FONDO (DESKTOP)
// ==========================================

/**
 * Inicializa el slider de fondo para desktop
 */
function initBackgroundSlider() {
    const slides = document.querySelectorAll('.fake-slide');

    // Si no hay slides o solo hay uno, no hacer nada
    if (slides.length <= 1) return;

    let currentSlide = 0;

    // Función para cambiar al siguiente slide
    function nextSlide() {
        // Quitar clase active del slide actual
        slides[currentSlide].classList.remove('active');

        // Avanzar al siguiente slide
        currentSlide = (currentSlide + 1) % slides.length;

        // Agregar clase active al nuevo slide
        slides[currentSlide].classList.add('active');
    }

    // Iniciar el intervalo
    setInterval(nextSlide, SLIDER_INTERVAL);
}

// ==========================================
// UTILIDADES PARA USAR DESDE LA TIENDA
// ==========================================

/**
 * Función para llamar desde la tienda para permitir cambiar de región
 * Ejemplo: <a href="URL_LANDING?cambiar=1">Cambiar región</a>
 */
function checkForRegionChange() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('cambiar') === '1') {
        clearSavedRegion();
    }
}

// Verificar si se quiere cambiar de región
checkForRegionChange();

// ==========================================
// INICIALIZAR AL CARGAR
// ==========================================

// Esperar a que el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Exponer funciones útiles globalmente (para debug o uso externo)
window.LaMascotera = {
    clearSavedRegion,
    getSavedRegion,
    TIENDAS_CONFIG
};
