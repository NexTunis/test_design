function parseHash(){
const h=window.location.hash.replace('#','')||'home';
const [route,qs]=h.split('?');
const params={};
if(qs)qs.split('&').forEach(pair=>{const [k,v]=pair.split('=');params[k]=decodeURIComponent(v||'');});
return {route,params};
}
const ROUTE_MAP={home:'Home',manifesto:'Manifesto',about:'About',collections:'Collections',product:'Product',cart:'Cart',checkout:'Checkout',lookbook:'Lookbook',sizeguide:'SizeGuide',faq:'Faq',journal:'Journal',search:'Search',wishlist:'Wishlist',contact:'Contact'};
const NAV_ACTIVE={home:'Home',manifesto:'Manifesto',about:'About',collections:'Collections',product:'Collections',lookbook:'Lookbook',journal:'Journal',contact:'Contact'};
function App(){
const {NavBar,Footer}=window.DysobayDesignSystem_9804fb;
const [state,setState]=React.useState(parseHash());
const screenRef=React.useRef(null);
React.useEffect(()=>{
const onHash=()=>{
const next=parseHash();
const el=screenRef.current;
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!window.gsap||!el||reduce){setState(next);window.scrollTo(0,0);return;}
gsap.to(el,{opacity:0,y:12,duration:.22,ease:'power1.in',onComplete:()=>{
setState(next);
requestAnimationFrame(()=>{
window.scrollTo(0,0);
// fromTo, not to: a plain `to` leaves the screen stuck invisible if the
// tween is interrupted by a second navigation mid-fade.
if(screenRef.current)gsap.fromTo(screenRef.current,{opacity:0,y:12},{opacity:1,y:0,duration:.35,ease:'power2.out'});
});
}});
};
window.addEventListener('hashchange',onHash);
return ()=>window.removeEventListener('hashchange',onHash);
},[]);
const Screen=window.Screens[ROUTE_MAP[state.route]]||window.Screens.Home;
const quickLinks=Object.keys(ROUTE_MAP);
return (<div style={{fontFamily:'var(--font-body)',background:'var(--paper)',color:'var(--ink)'}}>
<NavBar links={['Home','Collections','Lookbook','Manifesto','Journal','About','Contact']} active={NAV_ACTIVE[state.route]||'Home'} cartCount={2}/>
<div ref={screenRef}><Screen params={state.params}/></div>
<Footer/>
<details style={{position:'fixed',bottom:16,right:16,background:'var(--ink)',color:'var(--paper)',borderRadius:4,fontSize:11,letterSpacing:'.04em',textTransform:'uppercase',zIndex:999,fontFamily:'var(--font-body)'}}>
<summary style={{padding:'8px 12px',cursor:'pointer',listStyle:'none'}}>Prototype nav</summary>
<div style={{display:'flex',flexDirection:'column',gap:2,padding:'0 12px 10px',maxHeight:220,overflowY:'auto'}}>
{quickLinks.map(r=>(<a key={r} href={`#${r}`} style={{color:state.route===r?'var(--clay)':'var(--paper)',textDecoration:'none',padding:'2px 0'}}>{r}</a>))}
</div>
</details>
</div>);
}
ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
