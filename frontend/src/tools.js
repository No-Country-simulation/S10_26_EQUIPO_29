import {catalogRecords,toTool,toCardDetail} from './data/catalog.mjs';

// Compatibility exports keep catalog and detail on the same mock records.
export const tools=catalogRecords.map(toTool);
export const cardDetails=Object.fromEntries(catalogRecords.map(record=>[record.name,toCardDetail(record)]));

