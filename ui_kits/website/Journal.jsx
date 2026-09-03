function Journal(){
const M=window.MEDIA;
// Cards used to link to href="#", which the hash router reads as the home
// route — every journal card quietly bounced you back to the homepage.
return (<div style={{maxWidth:'var(--container-max)',margin:'0 auto',padding:'64px 40px 96px'}}>
<div style={{fontFamily:'var(--font-display)',fontSize:'var(--text-h1)',marginBottom:8}}>Journal</div>
<div style={{fontFamily:'var(--font-body)',color:'var(--stone)',marginBottom:40,maxWidth:'52ch',lineHeight:'var(--leading-relaxed)'}}>Notes from the atelier and the runway — why we refuse restocks, and what it costs to mean it.</div>
<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:32}}>
{window.JOURNAL.map(j=>(<article key={j.id}>
<image-slot id={`journal-${j.id}`} src={M+j.image} placeholder={j.title} style={{width:'100%',aspectRatio:'4/3'}}></image-slot>
<div style={{fontFamily:'var(--font-body)',fontSize:'var(--text-caption)',letterSpacing:'var(--tracking-wide)',textTransform:'uppercase',color:'var(--stone)',marginTop:16}}>{j.date}</div>
<div style={{fontFamily:'var(--font-display)',fontSize:'var(--text-h3)',marginTop:8}}>{j.title}</div>
<div style={{fontFamily:'var(--font-body)',fontSize:'var(--text-body-sm)',color:'var(--stone)',marginTop:8,lineHeight:'var(--leading-relaxed)'}}>{j.excerpt}</div>
</article>))}
</div>
</div>);
}
window.Screens=window.Screens||{};window.Screens.Journal=Journal;
