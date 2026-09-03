function Lookbook(){
const M=window.MEDIA;
return (<div>
<div style={{padding:'64px 40px 40px',textAlign:'center'}}>
<div style={{fontFamily:'var(--font-display)',fontSize:'var(--text-display-2)'}}>Lookbook</div>
<div style={{fontFamily:'var(--font-body)',color:'var(--stone)',marginTop:12}}>Milan Fashion Week &amp; studio editorial</div>
</div>
<div style={{padding:'0 40px 40px',maxWidth:'var(--container-max)',margin:'0 auto'}}>
<image-slot id="look-runway" src={M+'hero-runway.gif'} placeholder="Runway film" style={{width:'100%',aspectRatio:'16/9'}}></image-slot>
</div>
<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:4}}>
{window.LOOKBOOK.map((s,i)=>(<image-slot key={i} id={`look-${i}`} src={M+s.src} placeholder={s.caption} style={{width:'100%',aspectRatio:'3/4'}}></image-slot>))}
</div>
<div style={{textAlign:'center',padding:'64px 40px',fontFamily:'var(--font-body)',color:'var(--stone)'}}>
Each look above exists as exactly one garment. Some are already gone. <a href="#collections" style={{color:'var(--ink)'}}>See what is still available →</a>
</div>
</div>);
}
window.Screens=window.Screens||{};window.Screens.Lookbook=Lookbook;
