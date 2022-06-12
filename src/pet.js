const minFitness = 0;
const maxFitness = 10;
const minHunger = 0;
const maxHunger = 10;
const maxAge = 30;
const fitnessBreakPoint = 3;
const hungerBreakPoint = 5;

function createPet(){
    let name;
    const pet = new Pet(name = prompt("What shall we name your pet?", "name"));
    window.pet = pet;
    document.getElementById("createPet").innerHTML = `Hello, my name is ${pet.name}!`;
    document.getElementById("growUp").innerHTML = `${pet.age}`;
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
    document.getElementById("petMessage").innerHTML = `I am now ${this.age} years old.`;
    document.getElementById("growUp").innerHTML = `${this.age}`;
};

Pet.prototype.walk = function() {
    if (!this.isAlive) {
        throw new Error('Your pet is no longer alive :(');
    }
    if (this.fitness === maxFitness){
        document.getElementById("petMessage").innerHTML = "I don't need exercising."
    }
    else{
    document.getElementById("petMessage").innerHTML = `Thank you for exercising me.`;    
    }
    this.fitness += 4;
    if (this.fitness > maxFitness){
        this.fitness = maxFitness;
    }
    
}

Pet.prototype.feed = function() {
    if (!this.isAlive) {
        throw new Error('Your pet is no longer alive :(');
    }
    if (this.hunger === minHunger){
        document.getElementById("petMessage").innerHTML = "I don't need feeding.";
    }
    else {
    document.getElementById("petMessage").innerHTML = `Thank you for feeding me.`;    
    }
    this.hunger -= 3;
    if (this.hunger < minHunger){
        this.hunger = minHunger;
    }
   
}

Pet.prototype.checkUp = function() {
    document.getElementById("hunger").style.backgroundImage = "none";
    document.getElementById("fitness").style.backgroundImage = "none";
    if (!this.isAlive) {
        document.getElementById("petDead").style.visibility = 'visible';
        document.body.style.backgroundColor = '#B376FF';
        document.getElementById("petAlive").style.visibility = 'hidden';
        document.getElementById("petMessage").innerHTML = "Oh dear, I am no longer alive!"
        throw new Error('Your pet is no longer alive :(');
    }
    if (this.fitness <= fitnessBreakPoint && this.hunger >= hungerBreakPoint){
        document.getElementById("hunger").style.backgroundImage = "url('../images/petBowl.jpg')";
        document.getElementById("hunger").style.backgroundSize = "cover";
        document.getElementById("fitness").style.backgroundImage = "url('../images/petUnfit.jpg')";
        document.getElementById("fitness").style.backgroundSize = "cover";
        console.log("walk and feed")
    }
    else if (this.fitness <= fitnessBreakPoint){
        document.getElementById("fitness").style.backgroundImage = "url('../images/petUnfit.jpg')";
        document.getElementById("fitness").style.backgroundSize = "cover";
        console.log('walk')
    }
    else if (this.hunger >= hungerBreakPoint){
        document.getElementById("hunger").style.backgroundImage = "url('../images/petBowl.jpg')";
        document.getElementById("hunger").style.backgroundSize = "cover";
        console.log('feed')
    }
    else {
        console.log('all good')
    }
}

Pet.prototype.haveBaby = function(babyName) {
    const child = new Pet(babyName);

    this.children.push(child);
}

module.exports = Pet;