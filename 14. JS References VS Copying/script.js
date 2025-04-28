// start with strings, numbers and booleans
 let name = 'Baljan';
 let name2 = name;
 console.log(name, name2); // Baljan Baljan
 name = 'Dilia';
 console.log(name, name2); // Dilia Baljan


// Let's say we have an array
const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];

// and we want to make a copy of it.
const team = players; // this is a reference, not a copy

console.log(players, team); // ['Wes', 'Sarah', 'Ryan', 'Poppy'] ['Wes', 'Sarah', 'Ryan', 'Poppy']

// You might think we can just do something like this:
team[3] = 'Lux';
console.log(players, team); // 3 was changed to Lux  both in players and team

// however what happens when we update that array?

// now here is the problem!

// oh no - we have edited the original array too!

// Why? It's because that is an array reference, not an array copy. They both point to the same array!

// So, how do we fix this? We take a copy instead!
const team2 = players.slice(); // this is a copy, if we dont pass anything in it

// one way

// or create a new array and concat the old one in
const team3 = [].concat(players); // this is also a copy, if we pass in an array it will copy it

// or use the new ES6 Spread
const team4 = [...players]; // this is also a copy, if we pass in an array it will copy it
team4[3] = 'Tuna';
console.log(team4, players);

const team5 = Array.from(players); // this is also a copy, if we pass in an array it will copy it


// now when we update it, the original one isn't changed

// The same thing goes for objects, let's say we have a person object

// with Objects
const person = {
  name: 'Wes Bos',
  age: 80
};

// and think we make a copy:
// const captain = person;
// captain.number = 99;
// console.log(person, captain); // both have the number property


// how do we take a copy instead?
const cap2 = Object.assign({}, person, { number: 99 }); // this is a copy, if we pass in an object it will copy it
console.log(cap2, person);

// We will hopefully soon see the object ...spread
const cap3 = {...person}; // this is react style, not supported in JS
console.log(cap3, person);

// Things to note - this is only 1 level deep - both for Arrays and Objects. lodash has a cloneDeep method, but you should think twice before using it.

const wes = {
  name: 'Wes',
  age: 100,
  social: {
    twitter: '@wesbos',
    facebook: 'wesbos.developer'
  }
};

console.clear();
console.log(wes);

const dev = Object.assign({}, wes);
console.log(dev);

const dev2 = JSON.parse(JSON.stringify(wes)); // not a good way to do it, but it works for deep copying
console.log(dev2);