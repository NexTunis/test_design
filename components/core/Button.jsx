// type defaults to 'button': a bare <button> inside a form defaults to
// submit, which made every design-system Button a stray form submitter.
export function Button({variant='primary',size='md',children,disabled,onClick,style,type='button',ariaLabel}){
const base={fontFamily:'var(--font-body)',fontSize:size==='sm'?'var(--text-body-sm)':'var(--text-body)',letterSpacing:'var(--tracking-wide)',textTransform:'uppercase',fontWeight:600,border:'1px solid transparent',borderRadius:'var(--radius-sm)',padding:size==='sm'?'10px 18px':size==='lg'?'18px 36px':'14px 28px',cursor:disabled?'default':'pointer',transition:'background var(--dur-fast) var(--ease-out),color var(--dur-fast) var(--ease-out),border-color var(--dur-fast) var(--ease-out)',opacity:disabled?0.4:1,display:'inline-flex',alignItems:'center',justifyContent:'center',gap:'8px'};
const variants={
primary:{background:'var(--ink)',color:'var(--paper)',borderColor:'var(--ink)'},
secondary:{background:'transparent',color:'var(--ink)',borderColor:'var(--ink)'},
accent:{background:'var(--clay)',color:'var(--paper)',borderColor:'var(--clay)'},
ghost:{background:'transparent',color:'var(--ink)',borderColor:'transparent',textDecoration:'underline',textUnderlineOffset:'4px'}
};
return React.createElement('button',{type,style:{...base,...variants[variant],...style},disabled,onClick,'aria-label':ariaLabel},children);
}
