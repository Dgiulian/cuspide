# Servicios de Listings - Documentación

Este módulo proporciona funciones optimizadas para obtener listados de propiedades desde Sanity CMS.

## Características Principales

✅ **React.cache()** - Deduplicación automática de requests dentro del mismo render  
✅ **Cache inteligente** - Diferentes duraciones según estabilidad de datos  
✅ **Mapeo centralizado** - Conversión consistente de Sanity → Domain model  
✅ **Manejo de errores** - Graceful degradation con logs  
✅ **Fragmentos GROQ** - Queries consistentes y mantenibles  
✅ **TypeScript** - Tipado completo

## Estructura

```
services/
├── index.ts              # Exportaciones principales
├── listings.ts           # Funciones básicas de fetch
├── listing-search.ts     # Búsqueda y filtros avanzados
├── listing-mapper.ts     # Mapeo Sanity → Property
└── [archivos legacy]     # Mantenidos para compatibilidad

infrastructure/
├── sanity-helpers.ts     # Utilidades compartidas (urlFor, fragmentos, cache)
└── sanity.ts            # Cliente Sanity base
```

## Uso

### Importaciones recomendadas

```typescript
// Nuevo sistema (recomendado)
import { 
  getAllListings, 
  getFeaturedProperties, 
  getListingBySlug,
  searchListings 
} from "@/services";

// O importar directamente del módulo específico
import { getAllListings } from "@/services/listings";
import { searchListings } from "@/services/listing-search";
```

### Funciones disponibles

#### listings.ts

```typescript
// Obtener todas las propiedades (cache: 30s)
const listings = await getAllListings();

// Obtener propiedades destacadas (cache: 60s)
const featured = await getFeaturedProperties();

// Obtener una propiedad por slug (cache: 30s)
const listing = await getListingBySlug("casa-en-neuquen");

// Obtener ubicaciones únicas (cache: 1 hora)
const locations = await getUniqueLocations();
// Resultado: [{ city: "Neuquén", state: "Neuquén" }, ...]

// Obtener ciudades únicas (cache: 1 hora)
const cities = await getUniqueCities();
// Resultado: ["Neuquén", "Cipolletti", ...]
```

#### listing-search.ts

```typescript
// Búsqueda con filtros (cache: 30s)
const results = await searchListings({
  type: "casa",
  city: "Neuquén",
  minPrice: 50000,
  maxPrice: 200000,
  bedrooms: 3,
  hasGarage: true,
});

// Contar resultados sin fetch datos completos
const count = await getListingsCount({ type: "departamento" });

// Propiedades relacionadas
const related = await getRelatedListings(
  currentSlug,
  propertyType,
  city,
  3 // limit
);

// Rango de precios disponibles
const { min, max } = await getPriceRange();
```

## Duración de Cache

| Constante | Valor | Uso |
|-----------|-------|-----|
| `SHORT` | 30s | Listados, búsquedas |
| `MEDIUM` | 60s | Destacados |
| `LONG` | 5min | Rangos de precio |
| `VERY_LONG` | 1h | Ubicaciones, ciudades |

## React.cache() - Deduplicación

Todas las funciones usan `cache()` de React, lo que significa:

```typescript
// En el mismo render, estas llamadas se deduplican:
const listing1 = await getListingBySlug("casa-1");
const listing2 = await getListingBySlug("casa-1"); // Usa cache, no hace doble request

// Pero slugs diferentes hacen requests separados:
const listing3 = await getListingBySlug("casa-2"); // Nuevo request
```

## Manejo de Errores

Todas las funciones devuelven arrays vacíos o `null` en caso de error:

```typescript
const listings = await getAllListings();
// Si hay error: devuelve [] (array vacío)

const listing = await getListingBySlug("invalid");
// Si no existe o hay error: devuelve null
```

Errores se loguean en consola para debugging.

## Fragmentos GROQ

El fragmento `LISTING_FRAGMENT` asegura que todas las queries obtengan los mismos campos:

```typescript
const LISTING_FRAGMENT = `{
  _id, title, price, currency, slug, featured, status, publishedAt,
  property-> { _id, title, type, description, rooms, bathrooms, 
    lot_size, garage, slug, image_cover, images, location, city, state }
}`;
```

## Migración desde servicios antiguos

Los servicios antiguos siguen funcionando (mantenidos para compatibilidad):

```typescript
// Antiguo (todavía funciona)
import { getAllListings } from "@/services/get-all-listings";

// Nuevo (recomendado)
import { getAllListings } from "@/services/listings";
// o
import { getAllListings } from "@/services";
```

## Mejoras vs. Implementación Anterior

| Aspecto | Antes | Ahora |
|---------|-------|-------|
| **Duplicación de código** | Alta (cada archivo repetía lógica) | Baja (helpers centralizados) |
| **Cache** | Simple (30s para todo) | Inteligente (varía según datos) |
| **Deduplicación** | Ninguna | React.cache() automático |
| **Manejo de errores** | Mínimo | Completo con logs |
| **TypeScript** | Casting con `as` | Tipos estrictos |
| **Imágenes** | Solo cover en listados | Todas las imágenes mapeadas |
| **Relacionados** | No existía | Nueva función incluida |

## Performance

- **Menos requests**: Deduplicación automática
- **Cache optimizado**: Datos estáticos cacheados más tiempo
- **Consultas eficientes**: Fragmentos GROQ consistentes
- **Payload reducido**: Imágenes con opciones de resize

## Próximos Pasos Sugeridos

1. Agregar paginación para listados grandes
2. Implementar infinite scroll con cursor-based pagination
3. Agregar búsqueda full-text con Sanity's search
4. Implementar optimistic updates para favoritos
5. Agregar analytics de búsqueda
