function Faq(){
const [open,setOpen]=React.useState(0);
return (<div style={{maxWidth:800,margin:'0 auto',padding:'64px 40px 96px'}}>
<div style={{fontFamily:'var(--font-display)',fontSize:'var(--text-h1)',marginBottom:32}}>Frequently Asked</div>
{window.FAQS.map((f,i)=>(<div key={i} style={{borderBottom:'1px solid var(--line)'}}>
<div onClick={()=>setOpen(open===i?-1:i)} style={{display:'flex',justifyContent:'space-between',padding:'22px 0',cursor:'pointer',fontFamily:'var(--font-display)',fontSize:'var(--text-h4)'}}>
<span>{f.q}</span><span style={{color:'var(--stone)'}}>{open===i?'−':'+'}</span>
</div>
{open===i&&<div style={{paddingBottom:22,fontFamily:'var(--font-body)',color:'var(--stone)',lineHeight:'var(--leading-relaxed)',maxWidth:600}}>{f.a}</div>}
</div>))}
</div>);
}
window.Screens=window.Screens||{};window.Screens.Faq=Faq;
