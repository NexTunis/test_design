function Manifesto(){
const lines=[
{n:'4',title:'Four Foundations of Rebellion',body:'Reject mass production. Embrace singular creation. Celebrate imperfection. Choose authenticity over approval.'},
{n:'25',title:'Against Fifteen Minutes of Fame',body:'Warhol promised everyone fifteen minutes. We promise you a lifetime of authenticity. Fame fades. We craft for the lifetime.'},
{n:'19',title:'Nineteen Out of Twenty',body:'Almost complete, but beautifully unfinished. Perfection is overrated. We celebrate the authentic incomplete.'},
{n:'15',title:'Return to Why',body:'Why do you dress? Why do you choose? Why do you stand apart? Your clothes should answer.'},
{n:'2',title:'The Binary Choice',body:'Mass or singular. Follow or lead. Safe or fearless. Choose defiance.'},
{n:'1',title:'The Singular Truth',body:'Only one piece exists. Only one you exists. Only one design per creation. Never repeated. Never replicated.'},
{n:'25y',title:'The Choice Symbol',body:'Visually, Y splits into two paths. We are the path less chosen.'}
];
return (<div style={{background:'var(--ink)',color:'var(--paper)'}}>
<div style={{padding:'120px 40px 80px',textAlign:'center'}}>
<div style={{fontFamily:'var(--font-body)',fontSize:'var(--text-eyebrow)',letterSpacing:'var(--tracking-wider)',color:'var(--clay)'}}>D.Y.S.O.B.A.Y &nbsp; 4.25.19.15.2.1.25</div>
<div style={{fontFamily:'var(--font-display)',fontSize:'clamp(3rem,10vw,7rem)',marginTop:24,transform:'rotate(-4deg)',display:'inline-block',color:'var(--clay)'}}>Manifesto</div>
</div>
<div style={{maxWidth:900,margin:'0 auto',padding:'0 40px 120px',display:'flex',flexDirection:'column',gap:64}}>
{lines.map(l=>(<div key={l.n} style={{display:'flex',gap:32}}>
<div style={{fontFamily:'var(--font-display)',fontSize:64,color:'var(--denim)',minWidth:100}}>{l.n}</div>
<div>
<div style={{fontFamily:'var(--font-display)',fontSize:'var(--text-h3)',marginBottom:10}}>{l.title}</div>
<div style={{fontFamily:'var(--font-body)',fontSize:'var(--text-body-lg)',lineHeight:'var(--leading-relaxed)',color:'var(--stone-light)'}}>{l.body}</div>
</div>
</div>))}
<div style={{textAlign:'center',marginTop:40}}>
<div style={{fontFamily:'var(--font-brush)',fontSize:40,color:'var(--paper)'}}>Not Mass Approved</div>
<div style={{fontFamily:'var(--font-body)',fontSize:'var(--text-body-sm)',color:'var(--stone-light)',marginTop:8}}>Because the masses never approve of authenticity.</div>
</div>
</div>
</div>);
}
window.Screens=window.Screens||{};window.Screens.Manifesto=Manifesto;
