"use strict";
// class Person {
//   protected name: string;
//   protected constructor(theName: string) {
//     this.name = theName;
//   }
// }
// // Employee can extend Person
// class Employee extends Person {
//   private department: string;
//   constructor(name: string, department: string) {
//     super(name);
//     this.department = department;
//   }
//   public getElevatorPitch() {
//     return `Hello, my name is ${this.name} and I work in ${this.department}.`;
//   }
// }
// type whatever = {
//   user: string; 
//   loggedin: boolean; 
//   favs: number[]; 
//   id: number; 
//   profile: {
//     friends: (string | null)[]; 
//     stuff: {
//       icon: string;
//       obj: { p1: boolean; p2: null; p3: { more: string; }[]; };
//     };
//   }; 
// }
// var str = "str", num = 1, bi = BigInt(99), bool = true, nul = null, sym = Symbol('sy'), und = undefined;
// var all = [str, num, bi, bool, nul, sym, und];
// function clipEnds(thing:any) {
//   return (<string>thing).slice(1, -1)
// }
// function asString(thing: any) {
//   return
// }
// clipEnds(bool)
// str = (num as unknown) as string;  // 
// str = (bi as unknown) as string;   // 
// str = (bool as unknown) as string; // 
// str = (nul as unknown) as string;  // 
// str = (sym as unknown) as string;  // 
// str = (und as unknown) as string;  // 
// num = (str as unknown) as number;  // 
// num = (bi as unknown) as number;   // 
// num = (bool as unknown) as number; // 
// num = (nul as unknown) as number;  // 
// num = (sym as unknown) as number;  // 
// num = (und as unknown) as number;  // 
// bi = (str as unknown) as bigint;  // 
// bi = (num as unknown) as bigint;  // 
// bi = (bool as unknown) as bigint; // 
// bi = (nul as unknown) as bigint;  // 
// bi = (sym as unknown) as bigint;  // 
// bi = (und as unknown) as bigint;  // 
// bool = (str as unknown) as boolean;  // 
// bool = (num as unknown) as boolean;  // 
// bool = (bi as unknown) as boolean;   //  
// bool = (nul as unknown) as boolean;  // 
// bool = (sym as unknown) as boolean;  // 
// bool = (und as unknown) as boolean;  // 
// nul = (str as unknown) as null;  // 
// nul = (num as unknown) as null;  // 
// nul = (bi as unknown) as null;   // 
// nul = (bool as unknown) as null; // 
// nul = (sym as unknown) as null;  // 
// nul = (und as unknown) as null;  // 
// sym = (str as unknown) as symbol;  // 
// sym = (num as unknown) as symbol;  // 
// sym = (bi as unknown) as symbol;   // 
// sym = (bool as unknown) as symbol; // 
// sym = (nul as unknown) as symbol;  // 
// sym = (und as unknown) as symbol;  // 
// und = (str as unknown) as undefined;  // 
// und = (num as unknown) as undefined;  // 
// und = (bi as unknown) as undefined;   // 
// und = (bool as unknown) as undefined; // 
// und = (nul as unknown) as undefined;  // 
// und = (sym as unknown) as undefined;  // 
//# sourceMappingURL=tests.js.map