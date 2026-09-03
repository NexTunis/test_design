function SizeGuide(){
const rows=[['FR 36','US 4','UK 8','IT 40'],['FR 38','US 6','UK 10','IT 42'],['FR 40','US 8','UK 12','IT 44'],['FR 42','US 10','UK 14','IT 46']];
return (<div style={{maxWidth:800,margin:'0 auto',padding:'64px 40px 96px'}}>
<div style={{fontFamily:'var(--font-display)',fontSize:'var(--text-h1)',marginBottom:16}}>Size Guide</div>
<div style={{fontFamily:'var(--font-body)',color:'var(--stone)',marginBottom:32,lineHeight:'var(--leading-relaxed)'}}>Every Dysobay piece is cut to a single size — the one listed on the product page. Use this table to convert it to your usual sizing.</div>
<table style={{width:'100%',borderCollapse:'collapse',fontFamily:'var(--font-body)'}}>
<thead><tr>{['FR','US','UK','IT'].map(h=>(<th key={h} style={{textAlign:'left',padding:'12px 0',borderBottom:'1px solid var(--ink)',fontSize:'var(--text-caption)',letterSpacing:'var(--tracking-wider)',textTransform:'uppercase',color:'var(--stone)'}}>{h}</th>))}</tr></thead>
<tbody>{rows.map(r=>(<tr key={r[0]}>{r.map((c,i)=>(<td key={i} style={{padding:'14px 0',borderBottom:'1px solid var(--line)',fontSize:'var(--text-body)'}}>{c}</td>))}</tr>))}</tbody>
</table>
</div>);
}
window.Screens=window.Screens||{};window.Screens.SizeGuide=SizeGuide;
