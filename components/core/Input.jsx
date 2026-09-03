export function Input({label,placeholder,type='text',value,onChange,error,style}){
return React.createElement('div',{style:{display:'flex',flexDirection:'column',gap:'6px',...style}},
label&&React.createElement('label',{style:{fontFamily:'var(--font-body)',fontSize:'var(--text-caption)',letterSpacing:'var(--tracking-wider)',textTransform:'uppercase',color:'var(--stone)'}},label),
React.createElement('input',{type,placeholder,value,onChange,style:{fontFamily:'var(--font-body)',fontSize:'var(--text-body)',padding:'12px 14px',border:`1px solid ${error?'var(--error)':'var(--line)'}`,borderRadius:'var(--radius-sm)',background:'var(--paper)',color:'var(--ink)',outline:'none'}}),
error&&React.createElement('span',{style:{fontSize:'var(--text-caption)',color:'var(--error)'}},error)
);
}
