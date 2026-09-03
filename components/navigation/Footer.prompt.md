Full-width footer on `var(--sand)` with wordmark + tagline, three link columns (Shop, Support, Follow) and a closing line. Content is fixed brand copy; links resolve to hash routes by default — pass `hrefFor` to retarget them.

```jsx
<Footer/>
<Footer hrefFor={l => `/${l.toLowerCase().replace(/\s+/g,'-')}`}/>
```
