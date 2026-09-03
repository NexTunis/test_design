export function StatusBadge({status='in-stock'}){
const map={
'in-stock':{label:'In Stock',color:'var(--success)'},
'last-piece':{label:'Last Piece',color:'var(--clay)'},
'sold':{label:'Sold',color:'var(--stone)'}
};
const s=map[status];
return React.createElement('span',{style:{display:'inline-flex',alignItems:'center',gap:'6px',fontFamily:'var(--font-body)',fontSize:'var(--text-caption)',letterSpacing:'var(--tracking-wide)',textTransform:'uppercase',color:'var(--ink)'}},
React.createElement('span',{style:{width:'6px',height:'6px',borderRadius:'50%',background:s.color}}),
s.label
);
}
