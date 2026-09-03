// Same dead-link fix as NavBar: every footer link shipped as href="#".
const FOOTER_ROUTES={Collections:'#collections',Lookbook:'#lookbook',Journal:'#journal','New Arrivals':'#collections','Size Guide':'#sizeguide',FAQ:'#faq',Contact:'#contact','Shipping Policy':'#faq','Refund Policy':'#faq',Wishlist:'#wishlist',Search:'#search'};
const footerHref=(l)=>FOOTER_ROUTES[l]||'#'+String(l).toLowerCase().replace(/[^a-z0-9]/g,'');
export function Footer({hrefFor=footerHref,instagramHref='https://www.instagram.com/dysobay_/'}){
const col={display:'flex',flexDirection:'column',gap:'10px'};
const link={fontSize:'var(--text-body-sm)',color:'var(--stone)',textDecoration:'none'};
const heading={fontSize:'var(--text-caption)',letterSpacing:'var(--tracking-wider)',textTransform:'uppercase',color:'var(--stone)'};
const group=(title,items)=>React.createElement('div',{key:title,style:col},React.createElement('span',{style:heading},title),items.map(l=>React.createElement('a',{key:l,href:hrefFor(l),style:link},l)));
return React.createElement('footer',{style:{background:'var(--sand)',color:'var(--ink)',padding:'64px 40px 32px',fontFamily:'var(--font-body)',borderTop:'1px solid var(--line)'}},
React.createElement('div',{style:{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:'40px',maxWidth:'1400px',margin:'0 auto'}},
React.createElement('div',{style:{fontFamily:'var(--font-display)',fontSize:'28px',maxWidth:'320px'}},'DYSOBAY',React.createElement('div',{style:{fontFamily:'var(--font-body)',fontSize:'var(--text-body-sm)',color:'var(--stone)',marginTop:'12px',lineHeight:'var(--leading-relaxed)'}},'One design. One piece. Never repeated.')),
group('Shop',['Collections','Lookbook','Journal']),
group('Support',['Size Guide','FAQ','Contact','Shipping Policy','Refund Policy']),
React.createElement('div',{style:col},React.createElement('span',{style:heading},'Follow'),React.createElement('a',{href:instagramHref,target:'_blank',rel:'noopener noreferrer',style:link},'Instagram @dysobay_'))
),
React.createElement('div',{style:{textAlign:'center',fontSize:'var(--text-caption)',color:'var(--stone)',marginTop:'56px'}},'© Dysobay. Not Mass Approved.')
);
}
