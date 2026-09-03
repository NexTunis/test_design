export function PriceTag({price,compareAt}){
return React.createElement('div',{style:{display:'flex',alignItems:'baseline',gap:'10px',fontFamily:'var(--font-body)'}},
React.createElement('span',{style:{fontSize:'var(--text-h4)',color:'var(--ink)'}},price),
compareAt&&React.createElement('span',{style:{fontSize:'var(--text-body-sm)',color:'var(--stone-light)',textDecoration:'line-through'}},compareAt)
);
}
