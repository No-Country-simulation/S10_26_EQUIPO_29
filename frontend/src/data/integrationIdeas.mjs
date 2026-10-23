import fixtures from '../mocks/integration-ideas.fixtures.json' with {type:'json'};
import pending from '../mocks/integration-ideas-pending.fixtures.json' with {type:'json'};
const types={rest_api:'API REST',docker:'Docker',sdk:'SDK',webhook:'Webhook'};
const difficulties={low:'Básica',medium:'Intermedia',high:'Avanzada'};
export const integrationIdeaRecords=fixtures;
export function toIntegrationIdea(idea){
 return {id:idea.id,title:idea.title,summary:idea.summary,type:types[idea.integration_type],stack:idea.compatible_stack,
 dependencies:idea.dependencies??[],difficulty:difficulties[idea.difficulty],triggers:idea.triggers??[],
 snippet:idea.snippet??null,snippetLanguage:idea.snippet_language??null,docs:idea.docs_url,
 reviewLabel:idea.reviewed_at?'Revisada':idea.generated_by==='llm'?'Sugerida por IA · sin revisar':'Borrador editorial · sin revisar'};
}
export function integrationIdeasForTool(tool){
 if(tool.archived)return [];
 return fixtures.filter(idea=>idea.full_name===tool.full_name).map(toIntegrationIdea);
}
// Old SQL/JavaScript examples remain isolated until the team agrees how to classify them.
export const pendingIntegrationIdeas=pending;
