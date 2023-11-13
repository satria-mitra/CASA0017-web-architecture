// Example input array 
let originalArray = [  { name: 'John', age: 25, gender: 'male' },  { name: 'Jane', age: 30, gender: 'female' },  { name: 'Bob', age: 20, gender: 'male' },  { name: 'Mary', age: 35, gender: 'female' }]; 
 
// Initialize the two new arrays 
let males = []; 
let females = []; 
 
// Loop through each element of the original array and add to the appropriate new array 
for (let i = 0; i < originalArray.length; i++) { 
  if (originalArray[i].gender === 'male') { 
    males.push(originalArray[i]); 
  } else { 
    females.push(originalArray[i]); 
  } 
} 
 
// Output the two new arrays 
console.log(males); 
console.log(females); 