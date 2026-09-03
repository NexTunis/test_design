function Collections(){
const {ProductCard}=window.DysobayDesignSystem_9804fb;
const P=window.PRODUCTS;
const M=window.MEDIA;
const cats=['All','Outerwear','Tailoring','Dresses','Shirts'];
// The category strip used to be decoration: hardcoded active state, no filter.
const [cat,setCat]=React.useState('All');
const shown=cat==='All'?P:P.filter(p=>p.category===cat);
return (<div style={{maxWidth:'var(--container-max)',margin:'0 auto',padding:'56px 40px 96px'}}>
<div style={{textAlign:'center',marginBottom:48}}>
<div style={{fontFamily:'var(--font-display)',fontSize:'var(--text-display-2)'}}>Collections</div>
<div style={{fontFamily:'var(--font-body)',color:'var(--stone)',marginTop:12}}>{shown.length} {shown.length===1?'piece':'pieces'}. Each one, once.</div>
</div>
<div style={{display:'flex',gap:24,justifyContent:'center',flexWrap:'wrap',marginBottom:48}}>
{cats.map(c=>(<button key={c} type="button" onClick={()=>setCat(c)} style={{background:'none',border:'none',cursor:'pointer',padding:'0 0 4px',fontFamily:'var(--font-body)',fontSize:'var(--text-body-sm)',letterSpacing:'var(--tracking-wide)',textTransform:'uppercase',color:c===cat?'var(--ink)':'var(--stone)',borderBottom:c===cat?'1px solid var(--ink)':'1px solid transparent'}} aria-pressed={c===cat}>{c}</button>))}
</div>
{shown.length===0
?<div style={{textAlign:'center',fontFamily:'var(--font-body)',color:'var(--stone)',padding:'64px 0'}}>Nothing in this category right now. Every piece leaves for good.</div>
:<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(230px,1fr))',gap:32}}>
{shown.map(p=>(<a key={p.id} href={`#product?id=${p.id}`} style={{textDecoration:'none',color:'inherit'}}>
<ProductCard image={<image-slot id={`col-${p.id}`} src={M+p.images[0]} placeholder={p.name} style={{width:'100%',height:'100%'}}></image-slot>} name={p.name} price={p.price} tag={p.tag} size={p.size}/>
</a>))}
</div>}
</div>);
}
window.Screens=window.Screens||{};window.Screens.Collections=Collections;
