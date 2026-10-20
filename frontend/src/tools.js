import {catalogRecords,toTool,toCardDetail} from './data/catalog.mjs';

// Compatibility exports keep catalog and detail on the same mock records.
export const tools=catalogRecords.map(toTool);
export const cardDetails=Object.fromEntries(catalogRecords.map(record=>[record.name,toCardDetail(record)]));

// Curated demo palettes; PostgreSQL follows the supplied Figma reference.
// These tokens can come from each tool's catalog record when an API is connected.
export const brandPalettes = {
 PostgreSQL: { start: '#0f1839', end: '#002ec5', tag: '#2749ba' },
 Keycloak: { start: '#10252e', end: '#075477', tag: '#14617b' },
 Meilisearch: { start: '#30152e', end: '#802563', tag: '#8b306e' },
 Ollama: { start: '#202020', end: '#414141', tag: '#505050' },
 Plausible: { start: '#171c42', end: '#3847a3', tag: '#4654b1' },
 Lago: { start: '#152a21', end: '#245d40', tag: '#2b684b' },
 Qdrant: { start: '#32131e', end: '#8a2144', tag: '#a32850' },
 Umami: { start: '#171717', end: '#363636', tag: '#494949' },
 Typesense: { start: '#302011', end: '#815020', tag: '#875323' }
};
export const defaultBrand = { start: '#222222', end: '#303030', tag: '#454545' };

