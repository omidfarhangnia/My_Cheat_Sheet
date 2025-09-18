// https://en.bem.info/methodology
// ######################### core ######################### //


/*** BEM ***/
// bem stands for Block Element Modifier
// BEM is a methodology (an starndard structure)


/*** BLOCK ***/
// A functionally independent page component that can be reused
// The block name describes its purpose (error) not state (red-text)
// you shouldn't set the external geometry (margin) or positioning for the block.
// You also shouldn't use CSS tag (p, a, div) or ID (#something) selectors when using BEM.
// Blocks can be nested in each other


/*** ELEMENT ***/
// an element is a part of a block that has no standalone meaning
// The element name describes its purpose
// the structure is block-name__element-name (double underscore (__))
// Elements can be nested inside each other.
// An element is always part of a block, not another element
// !!! WE DO NOT USE block__element__sub-element !!!
// we can not use element outside of the block


/*** MODIFIER ***/
// An entity that defines the appearance, state, or behavior of a block or element.
// The modifier name describes its appearance
// The structure of the modifier's full name follows the pattern:
// ** block-name--modifier-name (target is block)
// ** block-name__element-name--modifier-name (target is element)


/*** MIX ***/
// In BEM, Mixes let you combine the styles and behaviors of multiple BEM entities by applying 
// several BEM classes to a single HTML element simultaneously, all without duplicating code.
// *** wrong ***
// style
// .article, .footer div {
//     font-family: Arial, sans-serif;
//     font-size: 14px;
//     color: #000;
// }
// html
// <article class="article">...</article>
// <footer class="footer">
//     <div class="copyright">...</div>
// </footer>
// *** right ***
// style
// .text {
//     font-family: Arial, sans-serif;
//     font-size: 14px;
//     color: #000;
// }
// html
// <article class="article text">...</article>
// <footer class="footer">
//     <div class="copyright text">...</div>
// </footer>