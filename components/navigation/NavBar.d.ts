export interface NavBarProps{
links?:string[];
active?:string;
cartCount?:number;
/** Label -> href. Defaults to the hash routes used by the website UI kit. */
hrefFor?:(label:string)=>string;
cartHref?:string;
}
