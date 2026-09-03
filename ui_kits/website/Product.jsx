function Product({params}){
const {Button,Tag,StatusBadge,PriceTag}=window.DysobayDesignSystem_9804fb;
const P=window.PRODUCTS;
const M=window.MEDIA;
const p=P.find(x=>x.id===params.id)||P[0];
return (<div style={{maxWidth:'var(--container-max)',margin:'0 auto',padding:'48px 40px 96px',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(340px,1fr))',gap:64,alignItems:'start'}}>
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
<image-slot id={`pdp-${p.id}-1`} src={M+p.images[0]} placeholder={`${p.name} — front`} style={{width:'100%',aspectRatio:'3/4',gridColumn:'1/3'}}></image-slot>
<image-slot id={`pdp-${p.id}-2`} src={M+p.images[1]} placeholder="Detail" style={{width:'100%',aspectRatio:'3/4'}}></image-slot>
<image-slot id={`pdp-${p.id}-3`} src={M+p.images[2]} placeholder="Detail" style={{width:'100%',aspectRatio:'3/4'}}></image-slot>
</div>
<div style={{paddingTop:24}}>
<div style={{fontFamily:'var(--font-body)',fontSize:'var(--text-eyebrow)',letterSpacing:'var(--tracking-wider)',textTransform:'uppercase',color:'var(--stone)'}}>{p.category}</div>
<div style={{fontFamily:'var(--font-display)',fontSize:'var(--text-h1)',marginTop:8}}>{p.name}</div>
<div style={{marginTop:16}}><PriceTag price={p.price}/></div>
<div style={{marginTop:16,display:'flex',gap:10,flexWrap:'wrap'}}><Tag tone="clay">One Piece Only</Tag><Tag>{p.size}</Tag></div>
<div style={{marginTop:12}}><StatusBadge status={p.status}/></div>
<div style={{fontFamily:'var(--font-body)',fontSize:'var(--text-body)',lineHeight:'var(--leading-relaxed)',color:'var(--stone)',marginTop:28,maxWidth:440}}>
Cut once, in a single size, by hand in our Dubai atelier. When this piece sells, the design retires with it — no restock, no reissue.
</div>
<div style={{display:'flex',gap:12,marginTop:32,flexWrap:'wrap'}}>
<a href="#cart" style={{textDecoration:'none',pointerEvents:p.status==='sold'?'none':'auto'}}><Button variant="primary" size="lg" disabled={p.status==='sold'}>{p.status==='sold'?'Sold Out':'Add to Bag'}</Button></a>
<a href="#wishlist" style={{textDecoration:'none'}}><Button variant="secondary" size="lg">Add to Wishlist</Button></a>
</div>
<div style={{marginTop:40,borderTop:'1px solid var(--line)',paddingTop:24,fontFamily:'var(--font-body)',fontSize:'var(--text-body-sm)',color:'var(--stone)'}}>
<a href="#sizeguide" style={{color:'inherit',textDecoration:'underline',textUnderlineOffset:4}}>Size guide</a> &nbsp;·&nbsp; <a href="#faq" style={{color:'inherit',textDecoration:'underline',textUnderlineOffset:4}}>Shipping &amp; care</a>
</div>
</div>
</div>);
}
window.Screens=window.Screens||{};window.Screens.Product=Product;
