import {catalogRecords} from './data/catalog.mjs';
// Catalog and detail consume the same adapted UI records.
export const tools=catalogRecords;
export const cardDetails=Object.fromEntries(catalogRecords.map(record=>[record.name,record]));
