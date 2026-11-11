console.log("hello world")
const person={
    name: "Pavan",
    age:"29",
    greet:function(){
        console.log("I am "+this.name);
    }
}
person.greet();
 console.log(person.name);
 console.log(person.age);


 function apple(){//this is not a anonymous function it is having name 
console.log("I am apple")
 }
