export interface ButtonProps{
variant?:'primary'|'secondary'|'accent'|'ghost';
size?:'sm'|'md'|'lg';
children:React.ReactNode;
disabled?:boolean;
onClick?:()=>void;
style?:React.CSSProperties;
/** Defaults to 'button' so the control never submits a surrounding form by accident. */
type?:'button'|'submit'|'reset';
/** Accessible name — required when the label is a glyph such as x or +. */
ariaLabel?:string;
}
