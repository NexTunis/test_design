function Search(){
const {Input,ProductCard}=window.DysobayDesignSystem_9804fb;
const M=window.MEDIA;
const [q,setQ]=React.useState('coat');
const term=q.trim().toLowerCase();
const results=term?window.PRODUCTS.filter(p=>p.name.toLowerCase().includes(term)||p.category.toLowerCase().includes(term)):window.PRODUCTS;
return (<div style={{maxWidth:'var(--container-max)',margin:'0 auto',padding:'56px 40px 96px'}}>
<div style={{maxWidth:480,margin:'0 auto 40px'}}><Input placeholder="Search pieces…" value={q} onChange={e=>setQ(e.target.value)}/></div>
<div style={{fontFamily:'var(--font-body)',color:'var(--stone)',marginBottom:32,textAlign:'center'}}>{term?`${results.length} result${results.length!==1?'s':''} for “${q.trim()}”`:`${results.length} pieces, each one once.`}</div>
{results.length===0
?<div style={{textAlign:'center',fontFamily:'var(--font-body)',color:'var(--stone)',padding:'48px 0'}}>No piece matches that. Try a category — outerwear, tailoring, dresses, shirts.</div>
:<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(230px,1fr))',gap:28}}>
{/* results were previously unclickable — a search you cannot act on */}
{results.map(p=>(<a key={p.id} href={`#product?id=${p.id}`} style={{textDecoration:'none',color:'inherit'}}>
<ProductCard image={<image-slot id={`search-${p.id}`} src={M+p.images[0]} placeholder={p.name} style={{width:'100%',height:'100%'}}></image-slot>} name={p.name} price={p.price} tag={p.tag} size={p.size}/>
</a>))}
</div>}
</div>);
}
window.Screens=window.Screens||{};window.Screens.Search=Search;
