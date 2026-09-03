function Checkout(){
const {Button}=window.DysobayDesignSystem_9804fb;
return (<div style={{maxWidth:640,margin:'0 auto',padding:'120px 40px',textAlign:'center'}}>
<div style={{fontFamily:'var(--font-brush)',fontSize:56,color:'var(--clay)'}}>Thank You</div>
<div style={{fontFamily:'var(--font-display)',fontSize:'var(--text-h2)',marginTop:16}}>Order #DYS-40182</div>
<div style={{fontFamily:'var(--font-body)',fontSize:'var(--text-body-lg)',color:'var(--stone)',lineHeight:'var(--leading-relaxed)',marginTop:20}}>
Your piece is now yours alone. We'll email tracking once it leaves our Dubai atelier — usually within 3–5 business days.
</div>
<div style={{marginTop:40}}><a href="#collections" style={{textDecoration:'none'}}><Button variant="secondary" size="lg">Continue Shopping</Button></a></div>
</div>);
}
window.Screens=window.Screens||{};window.Screens.Checkout=Checkout;
