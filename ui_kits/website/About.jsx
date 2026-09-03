function About(){
const {Button}=window.DysobayDesignSystem_9804fb;
const M=window.MEDIA;
return (<div>
<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(340px,1fr))'}}>
<image-slot id="about-portrait" src={M+'editorial-9to5.jpg'} placeholder="Portrait of Haifa Ghodhbane" style={{width:'100%',height:640}}></image-slot>
<div style={{padding:'80px 56px',display:'flex',flexDirection:'column',justifyContent:'center'}}>
<div style={{fontFamily:'var(--font-body)',fontSize:'var(--text-eyebrow)',letterSpacing:'var(--tracking-wider)',textTransform:'uppercase',color:'var(--stone)'}}>Founder</div>
<div style={{fontFamily:'var(--font-display)',fontSize:'var(--text-h1)',marginTop:12}}>Haifa Ghodhbane</div>
<div style={{fontFamily:'var(--font-body)',fontSize:'var(--text-body-lg)',lineHeight:'var(--leading-relaxed)',color:'var(--stone)',marginTop:24}}>
After decades in the corporate machine, Haifa stepped out to build something radically different. What began as a personal rebellion became a fashion project built on an unusual idea — one design, one piece, never repeated. In a world addicted to mass production, our work celebrates individuality and the courage to stand apart.
</div>
</div>
</div>

<div style={{maxWidth:800,margin:'0 auto',padding:'80px 40px',fontFamily:'var(--font-body)',fontSize:'var(--text-body-lg)',lineHeight:'var(--leading-relaxed)',color:'var(--ink)'}}>
<p>Each piece is a declaration of individuality in a world of replications. We work with small tailor shops whose talent brings our dreams to reality every day, one design at a time.</p>
<p>But the brand's vision doesn't stop at aesthetics. It believes fashion has a responsibility to engage with the world it dresses, speaking openly on issues that matter. We, at Dysobay, refuse to disconnect from reality, and use fashion as both a form of expression and a voice in the conversations shaping our time.</p>
<p style={{fontFamily:'var(--font-display)',fontSize:'var(--text-h3)',marginTop:32}}>So if you are someone bold enough to walk this unusual path, step into our bay.</p>
</div>

<div style={{background:'var(--sand)',padding:'80px 40px'}}>
<div style={{maxWidth:'var(--container-max)',margin:'0 auto'}}>
<div style={{fontFamily:'var(--font-display)',fontSize:'var(--text-h2)',marginBottom:32}}>Milan Fashion Week</div>
<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:32,fontFamily:'var(--font-body)'}}>
<div><div style={{fontFamily:'var(--font-display)',fontSize:32,color:'var(--clay)'}}>Sep 2024</div><div style={{marginTop:8,color:'var(--stone)',lineHeight:'var(--leading-relaxed)'}}>Debut — introducing Dysobay's vision of individuality, artistic expression, and limited-edition fashion to an international audience.</div></div>
<div><div style={{fontFamily:'var(--font-display)',fontSize:32,color:'var(--clay)'}}>SS25</div><div style={{marginTop:8,color:'var(--stone)',lineHeight:'var(--leading-relaxed)'}}>Color Disobedience — fearless colour combinations, expressive prints, and bold silhouettes celebrating the freedom to stand apart.</div></div>
<div><div style={{fontFamily:'var(--font-display)',fontSize:32,color:'var(--clay)'}}>2026</div><div style={{marginTop:8,color:'var(--stone)',lineHeight:'var(--leading-relaxed)'}}>A third showing, continuing the commitment to one-of-a-kind craftsmanship and fashion as self-expression rather than mass production.</div></div>
</div>
</div>
</div>
<div style={{textAlign:'center',padding:'80px 40px'}}><a href="#manifesto" style={{textDecoration:'none'}}><Button variant="secondary" size="lg">Read the Manifesto</Button></a></div>
</div>);
}
window.Screens=window.Screens||{};window.Screens.About=About;
