function Contact(){
const {Input,Button}=window.DysobayDesignSystem_9804fb;
return (<div style={{maxWidth:600,margin:'0 auto',padding:'64px 40px 96px'}}>
<div style={{fontFamily:'var(--font-display)',fontSize:'var(--text-h1)',marginBottom:12}}>Contact</div>
<div style={{fontFamily:'var(--font-body)',color:'var(--stone)',marginBottom:32,lineHeight:'var(--leading-relaxed)'}}>Questions about a piece, press, or collaborations — write to us directly.</div>
<div style={{display:'flex',flexDirection:'column',gap:20}}>
<Input label="Name" placeholder="Your name"/>
<Input label="Email" placeholder="you@example.com"/>
<div style={{display:'flex',flexDirection:'column',gap:6}}>
<label style={{fontFamily:'var(--font-body)',fontSize:'var(--text-caption)',letterSpacing:'var(--tracking-wider)',textTransform:'uppercase',color:'var(--stone)'}}>Message</label>
<textarea rows={5} placeholder="Tell us what you're looking for" style={{fontFamily:'var(--font-body)',fontSize:'var(--text-body)',padding:'12px 14px',border:'1px solid var(--line)',borderRadius:'var(--radius-sm)',resize:'vertical'}}></textarea>
</div>
<Button variant="primary" size="lg">Send Message</Button>
</div>
<div style={{marginTop:48,borderTop:'1px solid var(--line)',paddingTop:24,fontFamily:'var(--font-body)',fontSize:'var(--text-body-sm)',color:'var(--stone)'}}>
Instagram <a href="https://www.instagram.com/dysobay_/" target="_blank" rel="noopener noreferrer" style={{color:'var(--ink)'}}>@dysobay_</a> · Dubai, UAE
</div>
</div>);
}
window.Screens=window.Screens||{};window.Screens.Contact=Contact;
