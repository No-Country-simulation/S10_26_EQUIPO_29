import {useBrandIdentity,markBrandFailed} from './brandIdentity';
export function BrandIcon({tool}){
 const identity=useBrandIdentity(tool);
 return identity.fallback?<span className="brand-initials" aria-hidden="true">{identity.initials}</span>:<img src={identity.logo} alt="" onError={()=>markBrandFailed(identity.logo)}/>;
}
