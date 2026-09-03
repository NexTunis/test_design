export function Tag({children,tone='default'}){
const tones={
default:{background:'transparent',color:'var(--ink)',border:'1px solid var(--ink)'},
clay:{background:'var(--clay)',color:'var(--paper)',border:'1px solid var(--clay)'},
denim:{background:'var(--denim)',color:'var(--paper)',border:'1px solid var(--denim)'},
outline:{background:'transparent',color:'var(--stone)',border:'1px solid var(--line)'}
};
return React.createElement('span',{style:{...tones[tone],fontFamily:'var(--font-body)',fontSize:'var(--text-caption)',letterSpacing:'var(--tracking-wider)',textTransform:'uppercase',padding:'5px 10px',borderRadius:'2px',display:'inline-block',lineHeight:1}},children);
}
