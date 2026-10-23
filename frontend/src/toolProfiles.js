import localProfiles from './mocks/tool-profiles.fixtures.json' with {type:'json'};
import {catalogRecords} from './data/catalog.mjs';
import {integrationIdeasForTool} from './data/integrationIdeas.mjs';
// Summaries/features remain explicitly curated local content, outside Repo.
export const profiles=Object.fromEntries(catalogRecords.map(tool=>[tool.id,{
 ...localProfiles[tool.id],ideas:integrationIdeasForTool(tool)
}]));
