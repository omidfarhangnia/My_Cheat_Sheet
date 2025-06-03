// https://www.typescriptlang.org/docs/handbook/intro.html
/* ######################### HANDBOOK ######################### */


/*** INTERFACE ***/
// An interface declaration is another way to name an object type
// interface User {
//   name: string;
//   id: number;
// }
// const user: User = {
//   name: "Hayes",
//   id: 0,
// };


/*** TYPE IN FUNCTION ***/
// get data with User type as param
// function func1(user: User) {
// }
// return data with User type 
// function func1(): User {
// }


/*** NEW TYPES ***/
// any (allow anything)
// unknown (ensure someone using this type declares what the type is) 
// ** unknown and any are similar but unknown is safer because is limited
// never (it’s not possible that this type could happen for example some function like error function never return anything)
// and void (a function which returns undefined or has no return value)


/*** UNION ***/
// structre
// type MyBool = true | false;
// string or an array of strings
// function getLength(obj: string | string[]) {
//   return obj.length;
// }


/*** GENERICS ***/
// get type dynamic set type dynamic
// function returnAnyThing<T>(arg: T): T {
//   return arg;
// }


/*** GENERICS FOR MULTI ARGS ***/
// function saySomething<T, U>(arg1: T, arg2: U) {
//   console.log(arg1);
//   console.log(arg2);
// }
// saySomething<string, number>("hello", 42);


/*** CONSTRAINTS IN GENERICS ***/
// setting limit for T
// function myFunc<T extends { name: string }>(a: T) {
//   console.log(a.name);
// }
// myFunc({ name: "omid" });


/*** GENERICS CLASS ***/
// class myGenClass<T, U> {
//   tValue: T;
//   uValue: U;
//   constructor(t: T, u: U) {
//     this.tValue = t;
//     this.uValue = u;
//   }
//   getT() {
//     console.log(this.tValue);
//   }
//   getU() {
//     console.log(this.uValue);
//   }
//   setT(newT: T) {
//     this.tValue = newT;
//   }
//   setU(newU: U) {
//     this.uValue = newU;
//   }
// }
// const thisCalss = new myGenClass("string", 32);
// thisCalss.getT(); // string
// thisCalss.getU(); // 32
// thisCalss.setT("omid");
// thisCalss.setU(325);
// thisCalss.getT(); // omid
// thisCalss.getU(); // 325


/*** GENERICS AND KEYOF ***/
// function myFunc<T, P extends keyof T>(obj: T, key: P) {
//   console.log(obj[key]);
// }
// myFunc({ name: "AAA", age: 33 }, "name");


/*** SETTING GENERICS FUNC AS TYPE ***/
// interface GenFunc {
//   <T>(x: T): string
// }
// function genFunc<T>(x: T): string {
//   console.log(x);
//   return "done";
// }
// const genFunc1: <T>(x: T) => string = genFunc;
// const genFunc2: GenFunc = genFunc;


/*** IN, OUT, IN OUT ***/
// in, out, in out some professional and useless thing
// more data https://www.typescriptlang.org/docs/handbook/2/generics.html#variance-annotations
// Contravariant annotation
// interface Consumer<in T> {
//   consume: (arg: T) => void;
// }
// Covariant annotation
// interface Producer<out T> {
//   make(): T;
// }
// Invariant annotation
// interface ProducerConsumer<in out T> {
//   consume: (arg: T) => void;
//   make(): T;
// }


/*** TIP ***/
// typescript has downleveling
// This process of moving from a newer or “higher” version of ECMAScript down to an older or “lower” one is sometimes called downleveling.


/*** TIP ***/
// for type use lowercase
// String, Number, and Boolean ==> string, number, or boolean


/*** PROMISE IN RETURN ***/
// Functions Which Return Promises
// async function getFavoriteNumber(): Promise<number> {
//   return 26;
// }


/*** OPTIONAL PROPERTIES ***/
// In JavaScript, if you access a property that doesn’t exist, 
// you’ll get the value undefined rather than a runtime error. 
// Because of this, when you read from an optional property, 
// you’ll have to check for undefined before using it.
// interface MyType {
//   name: string;
//   age?: number;
// }


/*** NARROW IN UNION TYPES ***/
// Narrowing occurs when TypeScript can deduce a more specific type for a value based on the structure of the code.
// function printId(id: number | string) {
//   if (typeof id === "string") {
//     // In this branch, id is of type 'string'
//     console.log(id.toUpperCase());
//   } else {
//     // Here, id is of type 'number'
//     console.log(id);
//   }
// }


/*** TYPE ALIASES ***/
// A type alias is exactly : a name for any type
// type Point = {
//   x: number;
//   y: number;
// };


/*** TYPE ALIASES VS INTERFACE ***/
// different and similarities between type and interface
// *** similarities (extending) ***
// ==> interface extending
// interface Animal {
//   name: string;
// }
// interface Bear extends Animal {
//   honey: boolean;
// }
// const bear = getBear();
// bear.name;
// bear.honey;
// ==> type extending
// type Animal = {
//   name: string;
// }
// type Bear = Animal & { 
//   honey: boolean;
// }
// const bear = getBear();
// bear.name;
// bear.honey;
// *** different (duplication) ***
// ==> interface (duplicate)
// interface Window {
//   title: string;
// }
// interface Window {
//   ts: TypeScriptAPI;
// }
// window.ts.transpileModule(src, {});
// ==> type (duplicate)
// type Window = {
//   title: string;
// }
// type Window = {
//   ts: TypeScriptAPI;
// }
// Error: Duplicate identifier 'Window'.


/*** TYPE ASSERTIONS ***/
// Sometimes you will have information about the type of a value that TypeScript can’t know about.
// const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;


/*** LITERAL TYPES ***/
// In addition to the general types string and number, we can refer to specific strings and numbers in type positions.
// It’s not much use to have a variable that can only have one value!
// type time = "noon" | "afternoon" | "night";


/*** NON-NULL ASSENTION OPERATOR (POSTFIX !) ***/
// Writing ! after any expression is effectively a type assertion that the value isn’t null or undefined
// function liveDangerously(x: number | null) {
//   console.log(x!.toFixed());
// }


/*** ENUM ***/
// enum Direction {
//   Up = "UP",
//   Down = "DOWN",
//   Left = "LEFT",
//   Right = "RIGHT",
// }
// Direction.Up // "UP"
// Each enum member has a value associated with it which can be either constant or computed.
// enum E1 {
//   X, // 0
//   Y, // 1
//   Z, // 2
// }
// changing the first will change all of them
// enum E2 {
//   A = 1, // 1
//   B, // 2
//   C, // 3
// }


/*** GETTING ENUM KEYS WITH KEYOF ***/
// enum LogLevel {
//   ERROR,
//   WARN,
//   INFO,
//   DEBUG,
// }
// type LogLevelStrings = keyof typeof LogLevel;
// type LogLevelStrings = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';


/*** KEYOF ***/
// type Point = {
//   x: number;
//   y: number;
//   name: string;
// }
// type pKey = keyof Point;
// type pKey = "x" | "y" | "name"


/*** AS CONST ***/
// let x = "hello"; // type: string
// const y = "world"; // type: "world" (literal type)
// const z = { a: 1, b: "test" }; // type: { a: number; b: string; }
// const w = { a: 1, b: "test" } as const; // type: { readonly a: 1; readonly b: "test"; }


/*** ENUM VS OBJ AS CONST ***/
// const enum EDirection {
//   Up,
//   Down,
//   Left,
//   Right,
// }
// const ODirection = {
//   Up: 0,
//   Down: 1,
//   Left: 2,
//   Right: 3,
// } as const;


/*** BOOLEAN() ***/
// turning anything to boolean
// let myType1 = Boolean("lslsls"); // true
// let myType2 = !!0; // false
// let myType3 = !!"0"; // true


/*** IN ***/
// *** JS exmaple ***
// checking an object has a special property
// const data = {
//   name: "hello there"
// }
// if("name" in data) {
//   console.log("name is located")
// }
// *** TYPESCRIPT example ***
// interface One {
//   name: string;
// }
// interface Two {
//   firstName: string;
// }
// function MyFunc(obj: One | Two) {
//   if ("name" in obj) {
//     console.log(obj.name);
//   } else {
//     console.log(obj.firstName);
//   }
// }


/*** INSTANCEOF NARROWING ***/
// narrowing classes
// class MyClass1 {
//   name: string;
//   constructor(name: string) {
//     this.name = name;
//   }
// }
// class MyClass2 {
//   firstName: string;
//   constructor(firstName: string) {
//     this.firstName = firstName;
//   }
// }
// function getData(obj: MyClass1 | MyClass2) {
//   if (obj instanceof MyClass1) {
//     console.log(obj.name);
//   } else {
//     console.log(obj.firstName);
//   }
// }


/*** TYPE PREDICATES (IS) ***/
// interface Fish {
//   swim: () => void;
// }
// interface Bird {
//   fly: () => void;
// }
// the function says: pet is fish return the final resulf of our test
// function isFish(pet: Fish | Bird): pet is Fish {
//   // `pet as fish` is a temporary access for swim method for checking our test
//   return (pet as Fish).swim !== undefined;
// }
// function checkAnimal(pet: Fish | Bird) {
//   if (isFish(pet)) {
//     pet.swim();
//   } else {
//     pet.fly();
//   }
// }


/*** APPLY AND CALL IN TS ***/
// interface Person {
//   name: string;
// }
// const person: Person = { name: "ali" };
// *** APPLY ***
// function greet1(this: Person, param1: string, param2: string, param3: string) {
//   console.log(param1 + " " + this.name + " " + param2 + " " + param3);
// }
// greet1.apply(person, ["one", "two", "three"]); // one ali two three
// *** CALL ***
// function greet2(this: Person, param1: string, param2: string, param3: string) {
//   console.log(param1 + " " + this.name + " " + param2 + " " + param3);
// }
// greet2.call(person, "one", "two", "three"); // one ali two three


/*** REDUCE IN TS ***/
// reduce in typescript (we dont need any type because of type inference)
// const strings = ["omid", "ONE", "TWO", "THREE"];
// const sum = strings.reduce((acc, curr) => {
//   return acc + " " + curr; // omid ONE TWO THREE
// }, "");


/*** FUNCTION TYPE EXPRESSIONS ***/
// type FuncType = (a: string) => void;
// function secondFunc(func: FuncType, p1: string) {
//   func(p1);
// }
// function saySomething(a: string) {
//   console.log("hello there " + a); // hello there SOMETHING
// }
// secondFunc(saySomething, "SOMETHING");


/*** FUNCTION OVERLOAD ***/
// making one function for different situations
// function FuncOver(str: string, name: string, age: number): string;
// function FuncOver(a: number, b: number): number;
// function FuncOver(
//   strOrA: string | number,
//   nameOrB: string | number,
//   age?: number
// ): string | number {
//   if (
//     typeof strOrA === "string" &&
//     typeof nameOrB === "string" &&
//     typeof age === "number"
//   ) {
//     return strOrA + " " + nameOrB + " " + age || "20";
//   } else if (typeof strOrA === "number" && typeof nameOrB === "number") {
//     return strOrA + nameOrB;
//   }
//   // in overload function is good idea for using error handling
//   throw new Error("invalided arguments");
// }
// console.log(FuncOver(30, 23)); // 53
// console.log(FuncOver("one", "two", 3)); // one two 3


/*** SETTING TYPE FOR `THIS` ***/
// interface User {
//   id: number;
//   sayMyName: (this: User) => void;
// }
// const user: User = {
//   id: 1234,
//   sayMyName: function () {
//     console.log(this.id);
//   },
// };
// user.sayMyName(); // 1234


/*** INDEX SIGNATURES ***/
// interface MyInt {
//   [index: string]: string; // it say MyInt can not give something like myInt[1] its only myInt.(string)
//   method1: string;
//   method2: string;
// }
// const myInt: MyInt = {
//   method1: "lsls",
//   method2: "lsls",
// };


/*** READONLYARRAY ***/
// const myArr: ReadonlyArray<number> = [3, 2, 5, 6, 3];
// myArr[3] = 2; // Index signature in type 'readonly number[]' only permits reading.ts(2542)


/*** TUPLE TYPES ***/
// Tuple types are an important concept for working with arrays that have a fixed length and a specific order of different types.type MathArr = [number, number, boolean];
// type MathArr = [number, number, boolean];
// function DoMath(mathArr: MathArr): number {
//   const [a, b, isSum] = mathArr;
//   if (isSum) {
//     return a + b;
//   } else {
//     return a - b;
//   }
// }
// console.log(
//   DoMath([5, 3, true]) // 8
// );
// console.log(
//   DoMath([5, 3, false]) // 2
// );


/*** TUPLE ARRAY AND REST(...) ***/
// type StringNumberBooleans = [string, number, ...boolean[]];
// type StringBooleansNumber = [string, ...boolean[], number];
// type BooleansStringNumber = [...boolean[], string, number];


/*** READONLY TUPLE ARRAY ***/
// function doSomething(pair: readonly [string, number]) {
// }


/*** UTILITY TYPES ***/
// interface Todo {
//     title: string;
//     description: string;
//     completed: boolean;
// }
// type PartialTodo = Partial<Todo>; // { title?: string; description?: string; completed?: boolean; }
// type ReadonlyTodo = Readonly<Todo>; // { readonly title: string; readonly description: string; readonly completed: boolean; }
// type TodoPreview = Pick<Todo, "title" | "completed">; // { title: string; completed: boolean; }
// type NoDescriptionTodo = Omit<Todo, "description">; // { title: string; completed: boolean; }


/*** RETURNTYPE ***/
// type concatType = (a: string, b: string) => string;
// function concatFunc(a: string, b: string): string {
//   return a + b;
// }
// // return type from a type
// type returnType1 = ReturnType<concatType>; // returnType1 is string
// // return type from a function
// type returnType2 = ReturnType<typeof concatFunc>; // returnType2 is string


/*** INDEXED ACCESS TYPES ***/
// indexed access types and some horrible things (https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
// type Person = { age: number; name: string; alive: boolean };
// type Age = Person["age"]; // type Age = number
// type I1 = Person["age" | "name"]; // type I1 = string | number
// type I2 = Person[keyof Person]; // type I2 = string | number | boolean
// type AliveOrName = "alive" | "name";
// type I3 = Person[AliveOrName]; // type I3 = string | boolean


/*** CONDITIONAL TYPE ***/
// type NameOrId<T extends number | string> = T extends number
//   ? number[]
//   : string[];
// function createLabel<T extends number | string>(idOrName: T): NameOrId<T> {
//   return [idOrName] as NameOrId<T>;
// }
// const result1 = createLabel("one"); // ["one"]
// const result2 = createLabel(30); // [30]
// *** another example ***
// type Flatten<T> = T extends any[] ? T[number] : T; 
// // Extracts out the element type.
// type Str = Flatten<string[]>; // type Str = string
// // Leaves the type alone.
// type Num = Flatten<number>; // type Num = number


/*** MAPPED TYPES ***/
// making a type from another created type (we use `Property in keyof`)
// type First = {
//   one: string;
//   two: boolean;
//   three: () => void;
// };
// type Second<Type> = {
//   [Property in keyof Type]: boolean
// };
// type newType = Second<First>; // {one: boolean; two: boolean; three: boolean;}


/*** MAPPED TYPES REMVOING READONLY ***/
// type First = {
//   readonly one: string;
//   readonly two: boolean;
//   three: () => void;
// };
// type Second<Type> = {
//   -readonly [Property in keyof Type]: boolean;
// };
// type newType = Second<First>; // {one: boolean; two: boolean; three: boolean;}


/*** MAPPED TYPES REMVOING OPTIONAL ATTR ***/
// type First = {
//   one?: string;
//   two?: boolean;
//   three: () => void;
// };
// type Second<Type> = {
//   [Property in keyof Type]-?: boolean;
// };
// type newType = Second<First>; // {one: boolean; two: boolean; three: boolean;}


/*** MAPPED TYPES REMAPING WITH `AS` ***/
// we can rename properties dynamicly
// type First = {
//   one: string;
//   two: boolean;
//   three: () => void;
// };
// type Second<Type> = {
//   [Property in keyof Type as `newName${Capitalize<string & Property>}`]: Type[Property];
// };
// type newType = Second<First>; // {newNameOne: string; newNameTwo: boolean; newNameThree: () => void;}


/*** MAPPED TYPES WITH FILTERING ***/
// type First = {
//   one: string;
//   two: boolean;
//   three: () => void;
// };
// type Second<Type> = {
//   [Property in keyof Type as Exclude<Property, "one">]: Type[Property];
// };
// type newType = Second<First>; // {two: boolean; three: () => void;}


/*** MAPPED TYPES WITH ACCESSING TO MEMBERS ***/
// type First = {
//   one: "something";
//   two: boolean;
// };
// type Second<Type extends { one: string; two: boolean }> = {
//   [Property in keyof Type as Type["one"]]: Type["two"];
// };
// type newType = Second<First>; // {something: boolean;}


/*** TEMPLATE LITERAL TYPES ***/
// type first = "one" | "two";
// type second = "three" | "four";
// type newType = `${first}_${second}`; // "one_three" | "one_four" | "two_three" | "two_four"
// type newnewType = `${"1" | "2"}__${newType}`; // "1__one_three" | "1__one_four" | "1__two_three" | "1__two_four" | "2__one_three" | "2__one_four" | "2__two_three" | "2__two_four"


/*** INTRINSIC STRING MANIPULATION TYPES ***/
// type Greeting = "Hello, world"
// type ShoutyGreeting = Uppercase<Greeting> // "HELLO, WORLD"
// type QuietGreeting = Lowercase<Greeting> // "hello, world"
// type LowercaseGreeting = "hello, world";
// type capGreeting = Capitalize<LowercaseGreeting>; // "Hello, world"
// type UppercaseGreeting = "HELLO WORLD";
// type UncomfortableGreeting = Uncapitalize<UppercaseGreeting>; // "hELLO WORLD"


/*** READONLY IN CLASSES ***/
// we can setting value with contructor in classes for readonly properties
// class Point {
//   readonly x: number = 2;
//   y: number = 4;
//   constructor(xVal?: number, yVal?: number) {
//     if (xVal !== undefined) {
//       this.x = xVal;
//     }
//     if (yVal !== undefined) {
//       this.y = yVal;
//     }
//   }
// }
// const pt = new Point(5, 5); // Point {x: 5, y: 5}
// pt.y = 20; // Point {x: 5, y: 20}


/*** CONSTRUCTOR OVERLOADS ***/
// class Point {
//   x: number = 2;
//   y: number = 4;
//   constructor(x: number, y: number);
//   constructor(x: string, y: string);
//   constructor(x: number | string, y: number | string) {
//     if (typeof x === "number" && typeof y === "number") {
//       this.x = x;
//       this.y = y;
//     } else if (typeof x === "string" && typeof y === "string") {
//       this.x = Number(x);
//       this.y = Number(y);
//     }
//   }
// }
// const pt1 = new Point(5, 5); // Point {x: 5, y: 5}
// const pt2 = new Point("353", "25"); // Point {x: 353, y: 25}


/*** SUPER IS NECESSARY ***/
// class Father {
//   a = 5;
// }
// class Child extends Father {
//   b = 5;
//   constructor(newA: number, newB: number) {
//     super();
//     this.b = newB;
//     this.a = newA;
//   }
// }


/*** GETTER AND SETTER IN TS ***/
// TypeScript has some special inference rules for accessors
// ==> If get exists but no set, the property is automatically readonly
// ==> If the type of the setter parameter is not specified, it is inferred from the return type of the getter
// class C {
//   _length = 0;
//   get length() {
//     return this._length;
//   }
//   set length(value) {
//     this._length = value;
//   }
// }


/*** IMPLEMENTS ***/
// The implements keyword in TypeScript enforces that a class adheres to a specific interface's contract, 
// ensuring it provides all required properties and methods, and it will throw a compile-time error if the contract is not met.
// interface Person {
//   name: string;
//   age: number;
// }
// class Engineer implements Person {
//   name = "randomName";
//   age: number;
//   constructor(name: string, age: number) {
//     this.name = name;
//     this.age = age;
//   }
// }


/*** PUBLIC-PROTECTED-PRIVATE ***/
// PUBLIC: accessing from (inside the creator class ---- subclasses ---- out of classes)
// PROTECTED: accessing from (insde the creator class ---- subclasses)
// PRIVATE: accessing from (inside the creator class)


/*** STATICS***/
// creating methods and properties for own class not for samples
// class MyClass {
//   static x = 10;
//   static printX() {
//     console.log(MyClass.x);
//   }
// }
// MyClass.printX() // 10
// statics have access modifiers
// statics have inheritance
// class MyClass {
//   static x = 10;
//   static printX() {
//     console.log(MyClass.x);
//   }
// }
// class SecondClass extends MyClass {}
// SecondClass.printX(); // 10


/*** RETURN `THIS` IN CLASS ***/
// class Box {
//   contents: string = "";
//   set(value: string) {
//     this.contents = value;
//     return this;
//   }
// }
// class ClearableBox extends Box {
//   clear() {
//     this.contents = "";
//   }
// }
// const a = new ClearableBox();
// const b = a.set("hello"); // ClearableBox {contents: 'hello'}
// b.clear(); // ClearableBox {contents: ''}


/*** `THIS` AS PARAMETER ***/
// class Box {
//   content: string = "";
//   constructor(content: string) {
//     this.content = content;
//   }
//   sameAs(other: this) {
//     // other: this check that we can other get other classes that are Box
//     return other.content === this.content;
//   }
// }
// class DerivedBox extends Box {
//   otherContent: string = "?";
// }
// const base = new Box("one");
// const derived1 = new Box("one");
// const derived2 = new DerivedBox("one");
// derived1.sameAs(base); // true
// derived2.sameAs(base); // error: Argument of type 'Box' is not assignable to parameter of type 'DerivedBox'.


/*** THIS - BASED TYPE GUARDS ***/
// may be next time
// https://www.typescriptlang.org/docs/handbook/2/classes.html#this-based-type-guards


/*** PARAMETER PROPERTIES ***/
// TypeScript offers special syntax for turning a constructor parameter into a class property with the same name and value. 
// public, private, protected, or readonly
// class Params {
//   constructor(public x: number, protected y: number, private z: string) {}
// }
// const param = new Params(1, 2, "three"); // {x: 1, y: 2, z: 'three'}


/*** CLASS EXPRESSIONS ***/
// Class expressions are very similar to class declarations.
// const myClass = class {
//   value: number;
//   constructor(value: number) {
//     this.value = value;
//   }
// };
// const m = new myClass(3); // myClass {value: 3}


/*** INSTANCETYPE ***/
// EXTRACTS THE TYPE OF AN INSTANCE FROM A CONSTRUCTOR TYPE
// class Point {
//   createdAt: number;
//   x: number;
//   y: number;
//   constructor(x: number, y: number) {
//     this.createdAt = Date.now();
//     this.x = x;
//     this.y = y;
//   }
// }
// type PointInstance = InstanceType<typeof Point>; // { createdAt: number; x: number; y: number; }
// another example
// class MyClass {
//   constructor(public value1: number, public value2: string) {}
// }
// type myIns = InstanceType<typeof MyClass>;
// const myVal: myIns = {
//   value1: 32,
//   value2: "ss",
// };


/*** ABSTRACT CLASSES ***/
// An abstract class is like an incomplete blueprint; you can't build a structure directly from it,
// but it guides the construction of other buildings that must fill in the blueprint's missing pieces.
// abstract class Base {
//   abstract getVal(): number;
//   printVal() {
//     console.log(this.getVal());
//   }
// }
// class MainClass extends Base {
//   getVal(): number {
//     return 10;
//   }
// }
// const myClass = new MainClass();
// myClass.printVal(); // 10


/*** STRUCTURAL TYPING ***/
// class Point1 {
//   x = 0;
//   y = 0;
// }
// class Point2 {
//   x = 0;
//   y = 0;
//   z = 0;
// }
// const p: Point1 = new Point2(); // ok
// another test
// class Point2 {
//   x = "some random text";
//   y = 0;
//   z = 0;
// }
// const p: Point1 = new Point2(); // error : Type 'string' is not assignable to type 'number'.