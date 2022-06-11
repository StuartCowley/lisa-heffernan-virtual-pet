const minFitness = 0;
const maxFitness = 10;
const minHunger = 0;
const maxHunger = 10;
const maxAge = 30;
const fitnessBreakPoint = 3;
const hungerBreakPoint = 5;

function createPet(){
    const pet = new Pet('Oscar');
    window.pet = pet;
    document.getElementById("createPet").innerHTML = `Hello, my name is ${pet.name}! I am ${pet.age} years old.`;
}

function Pet(name) {
    this.name = name;
    this.age = 0;
    this.hunger = 0;
    this.fitness = 10;
    this.children = [];
}

Pet.prototype = {
    get isAlive() {
      return this.age < maxAge && this.hunger < maxHunger && this.fitness > minFitness;
    }
}

Pet.prototype.growUp = function() {
    if (!this.isAlive) {
        throw new Error('Your pet is no longer alive :(');
    }
    this.age += 1;
    this.hunger += 5;
    this.fitness -= 3;
    document.getElementById("growUp").innerHTML = `I am now ${this.age} years old.`;
    // console.log("testing")
};

Pet.prototype.walk = function() {
    if (!this.isAlive) {
        throw new Error('Your pet is no longer alive :(');
    }
    this.fitness += 4;
    if (this.fitness > maxFitness){
        this.fitness = maxFitness;
    }
    document.getElementById("walk").innerHTML = `Thank you for walking me.`;
}

Pet.prototype.feed = function() {
    if (!this.isAlive) {
        throw new Error('Your pet is no longer alive :(');
    }
    this.hunger -= 3;
    if (this.hunger < minHunger){
        this.hunger = minHunger;
    }
    document.getElementById("feed").innerHTML = `Thank you for feeding me.`;
}

Pet.prototype.checkUp = function() {
    // document.getElementById("happiness").innerHTML = "test";
    if (!this.isAlive) {
        document.getElementById("happiness").innerHTML = 'Your pet is no longer alive :(';
        throw new Error('Your pet is no longer alive :(');
    }
    if (this.fitness <= fitnessBreakPoint && this.hunger >= hungerBreakPoint){
        // return 'I am hungry AND I need a walk'
        document.getElementById("happiness").innerHTML = 'I am hungry AND I need a walk';
    }
    if(this.fitness <= fitnessBreakPoint){
        // return 'I need a walk';
        document.getElementById("happiness").innerHTML = 'I need a walk';
    }
    if (this.hunger >= hungerBreakPoint){
        // return 'I am hungry';
        document.getElementById("happiness").innerHTML = 'I am hungry';
    }
    else {
        // return 'I feel great!';
        document.getElementById("happiness").innerHTML = 'I feel great';
    }
}

Pet.prototype.haveBaby = function(babyName) {
    const child = new Pet(babyName);

    this.children.push(child);
}

module.exports = Pet;