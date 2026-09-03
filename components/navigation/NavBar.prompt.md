Top site navigation: wordmark on the left, nav links in the middle, cart count on the right. Sits on `var(--paper)` with a hairline bottom border, no shadow. Links resolve to hash routes (`Collections` → `#collections`); pass `hrefFor` to point them somewhere else.

```jsx
<NavBar active="Collections" cartCount={2}/>
<NavBar links={['Home','Collections','Lookbook','Journal']} hrefFor={l => `/${l.toLowerCase()}`}/>
```
