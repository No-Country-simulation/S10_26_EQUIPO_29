// Explicit opt-in; a missing service URL never enables demo data.
export const mockMode=()=>process.env.NEXT_PUBLIC_MOCK_MODE==='true';
export const unavailableAssistant={async ask(){const {AssistantError}=await import('./assistant.mjs');throw new AssistantError('provider_unavailable','');}};
