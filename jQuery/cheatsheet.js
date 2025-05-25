// ##### https://learn.jquery.com/about-jquery/
// ######################### core ######################### //


/*** .READY() ***/
// first jquery detects that state is ready or not with this
// $(document).ready(func);
// or 
// $(func)


/*** WHERE SHOULD I ADD CDN CODE ***/
// the best place for adding jquery file is on the head section


/*** .NOCONFLICT() ***/
// if we want use the other library that this library use $ we can change the rules with
// var $HT = jQuery.noConflict();
// $HT(".class").on("click", func)


/*** .ATTR() ***/
// we can give the current value of an attribute or change it with this
// it will return the value of title
// $(".element").attr("title");
// it will add the value of title to hello there
// $(".element").attr("title", "hello there");
// it will remove title attribute
// $(".element").removeAttr("title");
// we can add multiple attributes in the same time with the aid of
// $( ".element" ).attr({
//     href: "newDestination.html",
//     rel: "nofollow",
//     title: "hello there"
// });
// and we can set a function in an attribute and use it later
// $( ".element" ).attr( "href", function( idx, href ) {
//     return "/new/" + href;
// }); //#####


/*** SELECTORS ***/
// by id
// $( "#myId" );
// by class
// $( ".myClass" );
// by attr
// $( "input[name='first_name']" );
// by congenital
//$( "#contents ul.people li" ); // but remember that this is overkill its better to write // $( "#contents li" );
// by multi targets
// $( "div.myClass, ul.people" );


/*** CHECK EXISTING ***/
// if you want know that this element is existing or not you should use
// if( $(".element").length ) {...}


/*** SAVE SELECTION ***/
// if you use an element multi times you should put it in an variable
// var MY__ELEMENT = $(".element");


/*** REFINING AND FILTERING ***/
// div.foo elements that contain <p> tags
// $( "div.foo" ).has( "p" );
// h1 elements that don't have a class of bar
// $( "h1" ).not( ".bar" );
// h1 elements that have a class of bar
// $( "h1" ).is( ".bar" );
// unordered list items with class of current
// $( "ul li" ).filter( ".current" );
// just the first unordered list item
// $( "ul li" ).first();
// just the last unordered list item
// $( "ul li" ).last();
// the sixth
// $( "ul li" ).eq( 5 );


/*** .HTML() ***/
// we can change the html tags or text that we have in an element or we can get it with this value
// it will return the html value
// $(".element").html()
// it will change the html value
// $(".element").html("hello there");


/*** CHAINING ***/
// we can use a selector but different change in the roots
// $( ".element" )
//     .find( "h3" )
//     .html( "text for h3" )
//     .end() // Restores the selection to all h3s in #content
//     .eq( 0 )
//     .html( "text for first element" );


/*** ELEMENT INFORMATION G&S ***/
// we have some methods which they help use to get or set data 
// .html() – Get or set the HTML contents.
// .text() – Get or set the text contents; HTML will be stripped.
// .attr() – Get or set the value of the provided attribute.
// .width() – Get or set the width in pixels of the first element in the selection as an integer.
// .height() – Get or set the height in pixels of the first element in the selection as an integer.
// .position() – Get an object with position information for the first element in the selection, relative to its first positioned ancestor. This is a getter only.
// .val() – Get or set the value of form elements. // #####


/*** PREPEND & AFTER & BEFORE & APPEND ***/
// append adding element or text to the end of selected element
// prepend adding element or text to the beginning of selected element
// after adding element or text to the front of selected element
// before adding element or text to the back of selected element


/*** .CLONE() ***/
// sometimes we want to append or appendTo something but we don't want to have change in the main
// element we can use copy
// $(".first__element").clone().appendTo($(".second__element"));


/*** .REMOVE() & .DETACH() ***/
// we have to way for deleting element from the page
// remove: without any way for recreating (no memory leak)
// detach: with recreating element and it can give a copy of removed element like remove
// var p;
// $( "button" ).click(function() {
//   if ( p ) {
//     p.prependTo( ".helloThere" );
//     p = null;
//   } else {
//     p = $( ".lorem_text" ).detach();
//   }
// });


/*** .EMPTY() ***/
// empty: we can use empty for clear all the text or html tags in an element


/*** CREATE ELEMENT ***/
// we have to way for creating element 
// first way
// let element = $("<strong class='bg-red'><i>hello there</i></strong>");
// second way
// let element = $("<strong></strong>", {
//     html: "<i>hello there</i>",
//     "class": "bg-red"
// });


/*** USE ARRAY FOR ADD ***/
// if you have multi elements and after creating them you want to put them in an element
// its better to use an ARRAY
// let element1 = $("<strong>hello there</strong>");
// let element2 = $("<h2>hello there</h2>");
// let element3 = $("<marker>hello there</marker>");
// let myItems = [element1, element2, element3];
// $(".container").append(myItems);


/*** .GET() ***/
// we have three way for selecting element with their number 
// first is using eq(num) we put a number from 0 to ... and it will select the first 
// number is 0
// second is using get(num) we put a number from 0 to ... and it will return the element like this
// <div>hello there</div>
// we cant put attr or width or any object in this element (it is native HTML)
// third is using number like putting number in an array
// let ALL__DIV = $("div")[0];
// we cant put attr or width or any object in this element (it is native HTML)


/*** CHECKING SAME ELEMENT ***/
// if we put the same element in and to different value if say they are the same it will
// return false its better to use .get() in this time
// alert($(".element") === $(".element")); // false 
// alert($(".element").get(0) === $(".element").get(0)); // true


/*** ORDER $ ***/
// Many developers prefix a $ to the name of variables that contain jQuery objects in order to help differentiate.
// var $element1 = $( ".element1" );
// var $element2 = $( ".element2" );


/*** TRAVERSING IN PARENTS ***/
// <div class="grandparent">
//    <div class="parent">
//        <div class="child">
//            <span class="subChild"></span>
//        </div>
//    </div>
// </div>
// Selecting an element's direct parent:
// $( "span.subChild" ).parent(); // returns [ div.child ]
// Selecting all the parents of an element that match a given selector:
// $( "span.subChild" ).parents( "div.parent" ); // returns [ div.parent ]
// $( "span.subChild" ).parents(); // returns [ div.child, div.parent, div.grandparent ]
// Selecting all the parents of an element up to, but *not including* the selector:
// $( "span.subChild" ).parentsUntil( "div.grandparent" ); // returns [ div.child, div.parent ]
// Selecting the closest parent, note that only one PARENT(NOT CHILD) will be selected
// and that the initial element itself is included in the search: 
// $( "span.subChild" ).closest( "div" ); // returns [ div.child ]
// $( "div.child" ).closest( "div" ); // returns [ div.child ] as the selector is also included in the search:


/*** TRAVERSING IN CHILDREN ***/
// we have two way for selecting children 
// shallow searching
// we use children for searching the children of the element
// $( ".element" ).children( "div" );
// deep searching
// we use find for searching the children of the element and the children of them
// $( ".element" ).find( "div" );


/*** TRAVERSING IN SIBLINGS ***/
// Selecting a next sibling of the selectors:
// $( "div.parent" ).next(); // returns [ div.surrogateParent1 ]
// Selecting a prev sibling of the selectors:
// $( "div.parent" ).prev(); // returns [] as No sibling exists before div.parent
// Selecting all the next siblings of the selector:
// $( "div.parent" ).nextAll(); // returns [ div.surrogateParent1, div.surrogateParent2 ]
// Selecting all the previous siblings of the selector:
// $( "div.surrogateParent2" ).prevAll(); // returns [ div.surrogateParent1, div.parent ]
// returns all the next or prev siblings but not the selected element
// $( ".element").siblings();
// nextUntil: returns element num 3, 4, 5 we don't have the targets element in selecting
// if our second targets be unknown it will work like nextAll();
// $(".element__num__2").nextUntil(".element__num__6");
// prevUntil: returns element num 5, 4, 3 we don't have the targets element in selecting
// if our second targets be unknown it will work like prevAll();
// $(".element__num__6").prevUntil(".element__num__2");


/*** .CSS() ***/
// we can get and set the value of an style in elements with css operator
// it will return the value of fontsize
// $(".element").css("font-size") 
// OR 
// $(".element").css("fontSize");
// it will put the value of center to font-size
// $(".element").css("text-align", "center");
// OR
// $(".element").css({
//    "text-align": "center",
//    "background": "green"
// })


/*** CLASSES ***/
// we can add a class to element like this
// $(".element").addClass("bg-danger");
// we can remove a class to element like this
// $(".element").removeClass("bg-danger");
// we can do this with toggleClass(if we have this class remove it if we don't have it add it) NICE!!
// $(".element").toggleClass("bg-danger")
// we can check that this element has this class like this
// if($(".element").hasClass("bg-danger")){}


/*** .DATA() ***/
// we can add some data to any element this data will be store in selected element like this
// $(".element").data("id", "392059037209382");
// you can give the value like this it will return "392059037209382"
// $(".element").data("id"); 


/*** UTILITY METHODS ***/
// removes leading and trailing whitespace it will return "hello there"
// $.trim("          hello there                "); 
// Iterates over arrays and objects or elements which selected
// $("element").each(function( idx, ele ) { // do it });
// $.each([1, 2, 3, 4, 5] ,function( idx, val ) { // do it });
// checking that something is that in our array or not
// if it find will send its index if it cant find it will send -1 it means no
// $.inArray("something", myArray) 
// we can use .extend() for this it will check that the first object property has the second
// if it has it will put the value of second object property put first object property and if 
// first object property doesn't have the second object property it will put it completely
// $.extend( firstObject, secondObject );
// we can send something as this in function
// var myFunction = function() {
//     console.log( this );
// };
// var myObject = {
//     sayHello: "hello there"
// };
// var myProxyFunction = $.proxy( myFunction, myObject );
// myProxyFunction(); // myObject


/*** EACH REQUIRED ***/
// The following is a list of methods that require .each():
// .attr() (getter)
// .css() (getter)
// .data() (getter)
// .height() (getter)
// .html() (getter)
// .innerHeight()
// .innerWidth()
// .offset() (getter)
// .outerHeight()
// .outerWidth()
// .position()
// .prop() (getter)
// .scrollLeft() (getter)
// .scrollTop() (getter)
// .val() (getter)
// .width() (getter)


/*** .MAP() ***/
// sometimes we want to create array based on all selected elements like
// we want to restore all the ids of all the selecting element we use this
// $( ".element" ).map( function(index, element) {
//     return element.id;
// }).get();


/*** .INDEX() ***/
// it will return the index of first thing that it find and has our options 
// its look to their parents and find their index like
// <div class="container">
//     <div class="one"></div>
//     <span class="two"></span>
//     <div class="three"></div>
//     <ul class="four"></ul>
// </div>
// $(".two").index() // 1
// $(".four").index() // 3
// $(".container div").index() // 0




// ######################### event ######################### //




/*** .CLICK ***/
// .click is shorthand for .on(click, func)

/*** JQUERY TIP NUM 1 ***/
// for using jquery on an element in this situation i should add $( this )
// $( "a" ).click(function( eventObject ) {
//     var elem = $( this );
//     if ( elem.attr( "href" ).match( /evil/ ) ) {
//         eventObject.preventDefault();
//         elem.addClass( "evil" );
//     }
// });


/*** MULTI EVENT ***/
// with same task
// $( "input" ).on(
//     "click change", // Bind handlers for multiple events
//     function() {
//         console.log( "An input was clicked or changed!" );
//     }
// );
// without same task
// $(".box").on({
//     "click": function() {console.log("clicked")},
//     "mouseover": function() {console.log("mouse is here")},
//     "mouseleave": function() {console.log("mouse is gone")}
// })


/*** .OFF() ***/
// for removing event we can use off
// var foo = function() { console.log( "foo" ); };
// var bar = function() { console.log( "bar" ); }; 
// $( "p" ).on( "click", foo ).on( "click", bar );
// $( "p" ).off( "click", bar );  // foo is still bound to the click event


/*** USING NAMESPACE ***/
// let $counter = 1;
// $(".box").on({
//     "click.firstNameSpace": logMe,
//     "click.secondNameSpace": function() {console.log("hello there")}
// })
// function logMe() {
//     $counter++;
//     if($counter >= 5){
//         $(".box").off("click.firstNameSpace")
//     }
//     console.log("log me");
// }
// the output will be like this
// log me
// hello there
// log me
// hello there
// log me
// hello there
// log me
// hello there
// hello there
// hello there
// hello there
// ...
// with nameSpace we are labeling that event and we cant pause events with off


/*** .ONE() ***/
// sometimes we want to play and event only once and we can use .one() here


/*** .HOVER() ***/
// we have hover which can give to argument first is when mouse enter second is for leave like that
// $(".box").hover(onEnter, onLeave)
// function onEnter() {
//     console.log("i am here")
// }
// function onLeave() {
//     console.log("i am going")
// }


/*** .BIND() {deprecated} ***/
// bind is the same with on but it is better to using on
// $(".element").bind("click", myFunc)


/*** .LIVE() {deprecated} ***/
// live is the same with on but it is better to using on
// $(".element").live("click", myFunc)


/*** .DELEGATE() {deprecated} ***/
// delegate is the other way for connecting elements to webpage but we have a very big different here
// my by i have 100 element with the class of box but i am giving this event to the element which they have
// .box__container in their parent
// $(".box__container").delegate(".box", "click", () => {console.log("this box is a child of sub_child of .box__container")})


/*** PASSING DATA TO THE EVENT HANDLER ***/
// we can pass our own data to and element with
// $(".element", {name: "name"}, function(event) {
//      console.log(event.data)
// }) 
// it will return {name: "name"}


/*** EVENT DELEGATION ***/
// what is our problem first of all we need to know what is happening 
// when we add an event to the page this event work for all the element which 
// they had been in the page before adding event for instance if i have an event for clicking
// on all the $(".element") and i add a new div with the class of "element" this event didn't
// work for my new div
// BUT WE CAN FIX THIS PROBLEM
// with using this shape of events
// $(".element__container").on('click', ".element", function() {})
// this event works for all types of events


//#####// SPECIAL EVENTS //#####//

// blur // focusing out on an input
// click // having event with clicking elements
// focus // clicking on an input
// focusin // clicking on an input (with this different  Unlike the focus() method, the focusin() method also triggers if any child elements get focus.)
// focusout // focusing out on an input (with this different focusout bubbles, while blur does not)
// load // when something loaded the function will play
// mouseenter // having event with going mouse on element
// mouseleave // having event with leaving mouse on element



// ######################### effect ######################### //
// .HIDE()
// it will give d-none to elements
// $(".element").hide();
// we can pass three things for its parameter the first is "slow" that element will scale(0) slowly
// we can pass "fast" that element will scale(0) a faster
// and "normal" its something between fast and slow 
// without any parameter we have no animation
// and we can pass a number in millisecond for its parameter
// $(".element").hide(500) // in half of second


// .SHOW()
// it will give back d-none from elements
// $(".element").show();
// we can pass three things for its parameter the first is "slow" that element will scale(1) slowly
// we can pass "fast" that element will scale(1) a faster
// and "normal" its something between fast and slow 
// without any parameter we have no animation
// and we can pass a number in millisecond for its parameter
// $(".element").show(500) // in half of second


// .SLIDEUP()
// we can give d-none to element with scaleY(0) animation
// $(".element").slideUp()
// we can pass for parameter "fast", "slow", "normal", "number in millisecond" like
// $(".element").slideUp(500) // in half of second


// .SLIDEDOWN()
// we can give back d-none from element with scaleY(1) animation
// $(".element").slideDown()
// we can pass for parameter "fast", "slow", "normal", "number in millisecond" like
// $(".element").slideDown(500) // in half of second


// .SLIDETOGGLE() 
// if the element is slideUp it will play slideDown
// if the element is slideDown it will play slideUp
// like the other toggles


// .FADEOUT()
// if we want to hide element with opacity(0)
// we can use fadeOut() we can pass "fast", "normal", "slow", "number in millisecond" as its parameter
// $(".element").fadeOut(1000) // give opacity(0) in 1 second


// .FADEIN()
// if we want to visible element with opacity(1)
// we can use fadeIn() we can pass "fast", "normal", "slow", "number in millisecond" as its parameter
// $(".element").fadeIn(1000) // give opacity(1) in 1 second


// .FADETOGGlE()
// if we want to hide and visible element(if its hide make in visible if its visible make it hide)
// we can use fadeToggle() we can pass "fast", "normal", "slow", "number in millisecond" as its parameter
// $(".element").fadeToggle(1000) // if its hide give opacity(1) in 1 second OR if its visible give opacity(0) in 1 second


// .TOGGLE()
// we can use an animation something between slide and fade effects
// we can use toggle() we can pass "fast", "normal", "slow", "number in millisecond" as its parameter
// $(".elements").toggle(1500) // if its active it make it inactive and if its inactive it make it active


// DOING SOMETHING AFTER ENDING ANIMATION
// it is not important that which of these effect is used
// we can do this method in all these situations
// $(".element").onOFEffects(500, function() {
//      please do this
// })


// .STOP()
// we can stop an animation with this
// it will stop all the animation in page
// $(".element").click(function(){
//     $("body *").filter(":animated").stop();
// })


// .DELAY()
// it will help us for having delay between effects
// we have to pass a parameter like a number with millisecond
// $(".element").hide(500).delay(1500).show(500);


// .ANIMATE()
// we can use .animate for having some simple animations in this situation the structure should be like this
// $(".element").on("click", function() {
//     $(".element").animate(
//         {
//             // here we have styles
//             // opacity: 0
//         },
//         // this is the duration
//         300,
//         function() {
//             // when the animation ended we can play this function
//         }
//     )
// })


// .QUEUE()
// in animations we could pass a function after duration for callback but .queue is here for helping us
// the function which we pass is for the time that the animation has ended
// $(".element").on("click", function() {
//     $(".element").animate(
//         {
//             opacity: 0
//         },
//         1000
//     ).queue(function() {
//         console.log("hello there")
//     })
// })
// we have some useless and professorial thing about queue here //##https://learn.jquery.com/effects/queue-and-dequeue-explained/


