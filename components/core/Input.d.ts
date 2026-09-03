export interface InputProps{
label?:string;
placeholder?:string;
type?:string;
value?:string;
onChange?:(e:React.ChangeEvent<HTMLInputElement>)=>void;
error?:string;
style?:React.CSSProperties;
}
