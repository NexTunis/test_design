function Wishlist(){
const {ProductCard,Button}=window.DysobayDesignSystem_9804fb;
const M=window.MEDIA;
const [ids,setIds]=React.useState(window.PRODUCTS.filter(p=>p.status!=='sold').slice(0,3).map(p=>p.id));
const items=ids.map(id=>window.PRODUCTS.find(p=>p.id===id)).filter(Boolean);
return (<div style={{maxWidth:'var(--container-max)',margin:'0 auto',padding:'56px 40px 96px'}}>
<div style={{fontFamily:'var(--font-display)',fontSize:'var(--text-h1)',marginBottom:8}}>Wishlist</div>
<div style={{fontFamily:'var(--font-body)',color:'var(--stone)',marginBottom:40}}>Pieces move fast — one buyer, one piece. Saving one does not hold it.</div>
{items.length===0
?<div style={{fontFamily:'var(--font-body)',color:'var(--stone)',padding:'48px 0',textAlign:'center'}}>
Nothing saved yet. <a href="#collections" style={{color:'var(--ink)'}}>Browse the collection →</a>
</div>
:<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:28}}>
{items.map(p=>(<div key={p.id}>
<a href={`#product?id=${p.id}`} style={{textDecoration:'none',color:'inherit'}}>
<ProductCard image={<image-slot id={`wish-${p.id}`} src={M+p.images[0]} placeholder={p.name} style={{width:'100%',height:'100%'}}></image-slot>} name={p.name} price={p.price} tag={p.tag} size={p.size}/>
</a>
<div style={{display:'flex',gap:8,marginTop:12}}>
<a href="#cart" style={{textDecoration:'none',flex:1}}><Button variant="secondary" style={{width:'100%'}}>Add to Bag</Button></a>
<Button variant="secondary" onClick={()=>setIds(ids.filter(id=>id!==p.id))} ariaLabel={`Remove ${p.name} from wishlist`}>×</Button>
</div>
</div>))}
</div>}
</div>);
}
window.Screens=window.Screens||{};window.Screens.Wishlist=Wishlist;
