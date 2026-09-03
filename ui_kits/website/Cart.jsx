function Cart(){
const {Button,PriceTag}=window.DysobayDesignSystem_9804fb;
const M=window.MEDIA;
// The remove button used to be inert and the subtotal was a hardcoded string
// that drifted the moment the bag changed — both now follow real state.
const [ids,setIds]=React.useState(window.PRODUCTS.slice(0,2).map(p=>p.id));
const items=ids.map(id=>window.PRODUCTS.find(p=>p.id===id)).filter(Boolean);
const subtotal=items.reduce((s,p)=>s+window.PRICE_AED(p),0);
return (<div style={{maxWidth:900,margin:'0 auto',padding:'64px 40px 96px'}}>
<div style={{fontFamily:'var(--font-display)',fontSize:'var(--text-h1)',marginBottom:40}}>Your Bag</div>
{items.length===0
?<div style={{fontFamily:'var(--font-body)',color:'var(--stone)',padding:'48px 0',textAlign:'center'}}>
Your bag is empty. <a href="#collections" style={{color:'var(--ink)'}}>See what is still available →</a>
</div>
:<div>
{items.map(p=>(<div key={p.id} style={{display:'flex',gap:24,padding:'24px 0',borderBottom:'1px solid var(--line)'}}>
<a href={`#product?id=${p.id}`} style={{flexShrink:0}}><image-slot id={`cart-${p.id}`} src={M+p.images[0]} placeholder={p.name} style={{width:110,height:140}}></image-slot></a>
<div style={{flex:1}}>
<a href={`#product?id=${p.id}`} style={{fontFamily:'var(--font-display)',fontSize:'var(--text-h4)',color:'var(--ink)',textDecoration:'none'}}>{p.name}</a>
<div style={{fontFamily:'var(--font-body)',fontSize:'var(--text-body-sm)',color:'var(--stone)',marginTop:6}}>Size {p.size} · One piece only</div>
<div style={{marginTop:14}}><PriceTag price={p.price}/></div>
</div>
<button type="button" onClick={()=>setIds(ids.filter(id=>id!==p.id))} aria-label={`Remove ${p.name} from bag`} style={{alignSelf:'flex-start',background:'none',border:'none',fontSize:18,color:'var(--stone)',cursor:'pointer'}}>×</button>
</div>))}
<div style={{display:'flex',justifyContent:'space-between',padding:'28px 0',fontFamily:'var(--font-body)',fontSize:'var(--text-h4)'}}>
<span>Subtotal</span><span>{window.FORMAT_AED(subtotal)}</span>
</div>
<a href="#checkout" style={{textDecoration:'none',display:'block'}}><Button variant="primary" size="lg" style={{width:'100%'}}>Checkout</Button></a>
</div>}
</div>);
}
window.Screens=window.Screens||{};window.Screens.Cart=Cart;
