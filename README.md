# La Mascotera - Landing Page Selector de Región

Landing page para seleccionar la región antes de redirigir a las diferentes tiendas de La Mascotera en Tienda Nube.

## Descripción

Este proyecto contiene dos versiones de la landing page:

- **index.html (V1)**: Modal sobre fondo simulado de tienda
- **index-v2.html (V2)**: Header fijo con carruseles laterales

## Estructura del Proyecto

```
lamascoteraLoguin/
├── index.html          # Landing V1 (modal sobre fondo)
├── index-v2.html       # Landing V2 (con carruseles)
├── css/
│   ├── styles.css      # Estilos V1
│   └── styles-v2.css   # Estilos V2
├── js/
│   ├── app.js          # JavaScript V1
│   └── app-v2.js       # JavaScript V2
├── assets/
│   └── logo La Mascotera.png
└── img/
    ├── Diversion.png           # Slide 1
    ├── Corte.png               # Slide 2
    ├── bannerhorizontal2_club.png  # Footer
    └── banners/                # Banners para V2
        ├── peluqueria.jpg
        ├── veterinaria.jpg
        ├── alimentos.jpg
        └── accesorios.jpg
```

## Especificaciones de Imágenes

### Slides del Slider (index.html)

| Imagen | Dimensiones | Formato | Uso |
|--------|-------------|---------|-----|
| Diversion.png | 1920 x 800 px | PNG/JPG | Slider de fondo |
| Corte.png | 1920 x 800 px | PNG/JPG | Slider de fondo |

**Recomendaciones:**
- Orientación horizontal
- Centrar contenido importante (se recorta con `object-fit: cover`)
- Alta calidad para soportar recorte en diferentes resoluciones

### Banner Footer

| Imagen | Dimensiones | Formato | Uso |
|--------|-------------|---------|-----|
| bannerhorizontal2_club.png | 1920 x 120 px | PNG | Footer promocional |

**Recomendaciones:**
- Se muestra completa con `object-fit: contain`
- Fondo que combine con el blanco del contenedor

### Banners Laterales (V2 - index-v2.html)

| Imagen | Dimensiones | Formato | Uso |
|--------|-------------|---------|-----|
| peluqueria.jpg | 280 x 400 px | JPG/PNG | Carrusel lateral |
| veterinaria.jpg | 280 x 400 px | JPG/PNG | Carrusel lateral |
| alimentos.jpg | 280 x 400 px | JPG/PNG | Carrusel lateral |
| accesorios.jpg | 280 x 400 px | JPG/PNG | Carrusel lateral |

**Nota:** Los carruseles laterales solo se muestran en pantallas de 1200px o más.

### Logo

| Imagen | Dimensiones | Formato | Uso |
|--------|-------------|---------|-----|
| logo La Mascotera.png | Variable (max 140px ancho) | PNG | Header/Navbar |

## Regiones Configuradas

| Región | Grupo | URL (placeholder) |
|--------|-------|-------------------|
| Tucumán | Principal | lamascotera-tucuman.mitiendanube.com |
| Salta / Santiago | Principal | lamascotera-salta.mitiendanube.com |
| Neuquén | Principal | lamascotera-neuquen.mitiendanube.com |
| Córdoba | Franquicia | lamascotera-franquicias.mitiendanube.com |
| Mendoza | Franquicia | lamascotera-franquicias.mitiendanube.com |
| Jujuy | Franquicia | lamascotera-franquicias.mitiendanube.com |
| Resto del país | Envíos | lamascotera-tucuman.mitiendanube.com |

## Configuración

Para configurar las URLs reales de las tiendas, editar el objeto `TIENDAS_CONFIG` en:
- `js/app.js` (para V1)
- `js/app-v2.js` (para V2)

## Características

- Diseño responsive (mobile-first)
- Slider automático con transiciones suaves
- Opción de recordar selección del usuario (localStorage)
- Toast de notificación al seleccionar región
- Simulación de navbar de Tienda Nube en desktop

## Tecnologías

- HTML5
- CSS3 (CSS Grid, Flexbox, Variables CSS)
- JavaScript Vanilla
- FontAwesome 6.5
- Google Fonts (Poppins)
