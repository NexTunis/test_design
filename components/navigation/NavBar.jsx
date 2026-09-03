// Label -> route. Every nav link previously rendered href="#", which in a
// hash-routed app resolves to the home screen — so the whole nav was dead.
const NAVBAR_ROUTES={Home:'#home',Manifesto:'#manifesto',About:'#about',Collections:'#collections',Contact:'#contact',Lookbook:'#lookbook',Journal:'#journal',Search:'#search',Wishlist:'#wishlist',Cart:'#cart','New Arrivals':'#collections','Size Guide':'#sizeguide',FAQ:'#faq'};
const navbarHref=(l)=>NAVBAR_ROUTES[l]||'#'+String(l).toLowerCase().replace(/[^a-z0-9]/g,'');
export function NavBar({links=['Home','Manifesto','About','Collections','Contact'],active='Home',cartCount=0,hrefFor=navbarHref,cartHref='#cart'}){
const wrap={display:'flex',alignItems:'center',justifyContent:'space-between',gap:'24px',padding:'20px 40px',background:'var(--paper)',borderBottom:'1px solid var(--line)',fontFamily:'var(--font-body)',flexWrap:'wrap'};
const linkStyle=(l)=>({fontSize:'var(--text-body-sm)',letterSpacing:'var(--tracking-wide)',textTransform:'uppercase',color:l===active?'var(--ink)':'var(--stone)',textDecoration:'none',borderBottom:l===active?'1px solid var(--ink)':'1px solid transparent',paddingBottom:'2px',whiteSpace:'nowrap'});
return React.createElement('nav',{style:wrap,'aria-label':'Primary'},
React.createElement('a',{href:hrefFor('Home'),style:{fontFamily:'var(--font-display)',fontSize:'20px',letterSpacing:'.03em',whiteSpace:'nowrap',color:'var(--ink)',textDecoration:'none'}},'DYSOBAY'),
React.createElement('div',{style:{display:'flex',gap:'22px',flexWrap:'wrap',minWidth:0}},links.map(l=>React.createElement('a',{key:l,href:hrefFor(l),'aria-current':l===active?'page':undefined,style:linkStyle(l)},l))),
React.createElement('a',{href:cartHref,style:{fontSize:'var(--text-body-sm)',letterSpacing:'var(--tracking-wide)',textTransform:'uppercase',color:'var(--ink)',whiteSpace:'nowrap',textDecoration:'none'}},`Cart (${cartCount})`)
);
}
