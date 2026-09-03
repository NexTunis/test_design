export function ProductCard({image,name,price,tag,size='M'}){
return React.createElement('div',{style:{display:'flex',flexDirection:'column',gap:'12px',fontFamily:'var(--font-body)'}},
React.createElement('div',{style:{position:'relative',aspectRatio:'3/4',background:'var(--sand)',overflow:'hidden'}},
image,
tag&&React.createElement('span',{style:{position:'absolute',top:'12px',left:'12px',background:'var(--clay)',color:'var(--paper)',fontSize:'var(--text-caption)',letterSpacing:'var(--tracking-wider)',textTransform:'uppercase',padding:'5px 10px'}},tag)
),
React.createElement('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'baseline'}},
React.createElement('span',{style:{fontFamily:'var(--font-display)',fontSize:'17px',color:'var(--ink)'}},name),
React.createElement('span',{style:{fontSize:'var(--text-body-sm)',color:'var(--stone)'}},price)
),
React.createElement('span',{style:{fontSize:'var(--text-caption)',color:'var(--stone-light)',letterSpacing:'var(--tracking-wide)',textTransform:'uppercase'}},'One piece only · ',size)
);
}
