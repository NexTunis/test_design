function Home(){
const {Button,ProductCard}=window.DysobayDesignSystem_9804fb;
const P=window.PRODUCTS;
const M=window.MEDIA;
React.useEffect(()=>{
if(!window.gsap||!window.ScrollTrigger)return;
gsap.registerPlugin(ScrollTrigger);
const tweens=gsap.utils.toArray('[data-reveal]').map(el=>gsap.fromTo(el,{opacity:0,y:28},{opacity:1,y:0,duration:.8,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 82%',once:true}}));
// Kill only what this screen created — the old cleanup called
// ScrollTrigger.getAll().kill(), which also destroyed every trigger any
// other mounted screen owned.
return ()=>tweens.forEach(t=>{if(t.scrollTrigger)t.scrollTrigger.kill();t.kill();});
},[]);
return (<div>
<div style={{position:'relative',height:'92vh',minHeight:520}}>
<image-slot id="home-hero" src={M+'hero-runway.gif'} placeholder="Full-bleed campaign video or hero image" style={{width:'100%',height:'100%'}}></image-slot>
<div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,rgba(0,0,0,.15) 0%,rgba(0,0,0,.2) 35%,rgba(0,0,0,.75) 100%)',pointerEvents:'none'}}></div>
<div style={{position:'absolute',bottom:56,left:40,right:40,color:'#fff',maxWidth:640,textShadow:'0 2px 16px rgba(0,0,0,.5)',pointerEvents:'none'}}>
<div style={{fontFamily:'var(--font-display)',fontSize:'clamp(2.5rem,6vw,5rem)',lineHeight:1.02}}>One design.<br/>One piece.<br/>Never repeated.</div>
<div style={{marginTop:24,pointerEvents:'auto'}}><a href="#collections" style={{textDecoration:'none'}}><Button variant="accent" size="lg">Shop the Collection</Button></a></div>
</div>
</div>

<div data-reveal style={{maxWidth:'var(--container-max)',margin:'0 auto',padding:'96px 40px',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))',gap:64,alignItems:'center'}}>
<div style={{textAlign:'left'}}>
<div style={{fontFamily:'var(--font-body)',fontSize:'var(--text-eyebrow)',letterSpacing:'var(--tracking-wider)',textTransform:'uppercase',color:'var(--stone)'}}>The Manifesto</div>
<div style={{fontFamily:'var(--font-display)',fontSize:'var(--text-h1)',lineHeight:'var(--leading-tight)',marginTop:16}}>Why do you dress? Why do you choose? Why do you stand apart? Your clothes should answer.</div>
<div style={{marginTop:28}}><a href="#manifesto" style={{fontFamily:'var(--font-body)',fontSize:'var(--text-body-sm)',letterSpacing:'var(--tracking-wide)',textTransform:'uppercase',color:'var(--ink)',textDecoration:'underline',textUnderlineOffset:4}}>Read the full manifesto →</a></div>
</div>
<a href="#manifesto"><image-slot id="home-manifesto-poster" src="../../assets/posters/manifesto-poster.jpg" placeholder="Manifesto poster" style={{width:'100%',aspectRatio:'3/4'}}></image-slot></a>
</div>

<div data-reveal style={{padding:'0 40px 96px',maxWidth:'var(--container-max)',margin:'0 auto'}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',gap:16,marginBottom:32}}>
<div style={{fontFamily:'var(--font-display)',fontSize:'var(--text-h2)'}}>New Drop</div>
<a href="#collections" style={{fontFamily:'var(--font-body)',fontSize:'var(--text-body-sm)',color:'var(--stone)',textDecoration:'none',whiteSpace:'nowrap'}}>View all →</a>
</div>
<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(230px,1fr))',gap:28}}>
{P.slice(0,4).map(p=>(<a key={p.id} href={`#product?id=${p.id}`} style={{textDecoration:'none',color:'inherit'}}>
<ProductCard image={<image-slot id={`home-${p.id}`} src={M+p.images[0]} placeholder={p.name} style={{width:'100%',height:'100%'}}></image-slot>} name={p.name} price={p.price} tag={p.tag} size={p.size}/>
</a>))}
</div>
</div>

<div data-reveal style={{background:'var(--sand)',padding:'96px 40px',display:'flex',alignItems:'center',gap:64,flexWrap:'wrap'}}>
<div style={{flex:1,minWidth:280}}><image-slot id="home-editorial" src={M+'kit-collar-label.jpg'} placeholder="Editorial campaign image" credit="Real hangtag/label mockup from the client's brand kit" style={{width:'100%',aspectRatio:'4/5'}}></image-slot></div>
<div style={{flex:1,minWidth:280,maxWidth:520}}>
<div style={{fontFamily:'var(--font-brush)',fontSize:48,color:'var(--clay)',lineHeight:1}}>Not Mass Approved</div>
<div style={{fontFamily:'var(--font-body)',fontSize:'var(--text-body-lg)',lineHeight:'var(--leading-relaxed)',marginTop:20,color:'var(--stone)'}}>Milan Fashion Week, three times over. Every collection made once, worn by whoever chose it first — because the masses never approve of authenticity.</div>
<div style={{marginTop:28}}><a href="#about" style={{color:'var(--ink)',fontFamily:'var(--font-body)',fontSize:'var(--text-body-sm)',letterSpacing:'var(--tracking-wide)',textTransform:'uppercase',textDecoration:'underline',textUnderlineOffset:4}}>Meet Haifa →</a></div>
</div>
</div>

<div data-reveal style={{padding:'96px 40px',maxWidth:'var(--container-max)',margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))',gap:64,alignItems:'center'}}>
<div><image-slot id="home-milan" src={M+'look-motion-01.jpg'} placeholder="Milan Fashion Week runway/backstage image" style={{width:'100%',aspectRatio:'1/1'}}></image-slot></div>
<div>
<div style={{fontFamily:'var(--font-body)',fontSize:'var(--text-eyebrow)',letterSpacing:'var(--tracking-wider)',textTransform:'uppercase',color:'var(--stone)'}}>Milan Fashion Week</div>
<div style={{fontFamily:'var(--font-display)',fontSize:'var(--text-h2)',marginTop:12}}>Three seasons on the same stage, never the same piece twice.</div>
<div style={{fontFamily:'var(--font-body)',fontSize:'var(--text-body)',lineHeight:'var(--leading-relaxed)',marginTop:16,color:'var(--stone)'}}>From the September 2024 debut to Color Disobedience for Spring/Summer 2025, Dysobay has shown at Milan Fashion Week three times — each collection built on one-of-a-kind craftsmanship rather than repeat production.</div>
<div style={{marginTop:24}}><a href="#lookbook" style={{color:'var(--ink)',fontFamily:'var(--font-body)',fontSize:'var(--text-body-sm)',letterSpacing:'var(--tracking-wide)',textTransform:'uppercase',textDecoration:'underline',textUnderlineOffset:4}}>See the lookbook →</a></div>
</div>
</div>

<div data-reveal style={{padding:'0 40px 120px',maxWidth:'var(--container-max)',margin:'0 auto'}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',gap:16,marginBottom:32}}>
<div style={{fontFamily:'var(--font-display)',fontSize:'var(--text-h2)'}}>From the Journal</div>
<a href="#journal" style={{fontFamily:'var(--font-body)',fontSize:'var(--text-body-sm)',color:'var(--stone)',textDecoration:'none',whiteSpace:'nowrap'}}>Read more →</a>
</div>
<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:28}}>
{window.JOURNAL.map(a=>(<a key={a.id} href="#journal" style={{textDecoration:'none',color:'inherit'}}>
<image-slot id={`home-journal-${a.id}`} src={M+a.image} placeholder="Journal cover image" style={{width:'100%',aspectRatio:'4/3'}}></image-slot>
<div style={{fontFamily:'var(--font-display)',fontSize:'var(--text-h4)',marginTop:16}}>{a.title}</div>
<div style={{fontFamily:'var(--font-body)',fontSize:'var(--text-body-sm)',color:'var(--stone)',marginTop:6}}>{a.excerpt}</div>
</a>))}
</div>
</div>

<div data-reveal style={{background:'var(--ink)',padding:'72px 40px',display:'flex',justifyContent:'center',alignItems:'center',gap:56,flexWrap:'wrap'}}>
<div style={{background:'var(--paper)',padding:'12px 20px',borderRadius:4}}><img src="../../assets/logo/dx-mark.jpg" alt="Dysobay X mark" style={{height:48,width:'auto',display:'block'}}/></div>
<div style={{background:'var(--paper)',padding:'12px 20px',borderRadius:4}}><img src="../../assets/logo/barcode.jpg" alt="Dysobay barcode motif" style={{height:48,width:'auto',display:'block'}}/></div>
<div style={{fontFamily:'var(--font-body)',fontSize:'var(--text-body-sm)',letterSpacing:'var(--tracking-wide)',textTransform:'uppercase',color:'var(--paper)'}}>Not Mass Approved</div>
</div>
</div>);
}
window.Screens=window.Screens||{};window.Screens.Home=Home;
