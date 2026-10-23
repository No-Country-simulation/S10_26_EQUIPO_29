// Explicit local QA scenarios; never modify the published catalog to simulate bad data.
export function assistantScenarioOptions(scenario,catalog){
 const options={scenario};
 if(scenario==='slow')options.delay=6500;
 if(scenario==='timeout')Object.assign(options,{delay:30000,slowMs:1500,timeoutMs:6000});
 if(scenario==='archived_tool')options.catalog=catalog.map(tool=>tool.full_name==='keycloak/keycloak'?{...tool,archived:true}:tool);
 return options;
}
