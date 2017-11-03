var OregonH = OregonH || {};

OregonH.UI = {};

//show a notification in the message area
OregonH.UI.notify = function(message, type)
{
  document.getElementById('updates-area').innerHTML = '<div class="update-' + type + '">Day '+ Math.ceil(this.caravan.day) + ': ' +message+'</div>' + document.getElementById('updates-area').innerHTML;
};



//refresh visual caravan stats
OregonH.UI.refreshStats = function()
{
  //modify the dom
  document.getElementById('stat-day').innerHTML = Math.ceil(this.caravan.day);
  document.getElementById('stat-distance').innerHTML = Math.floor(this.caravan.distance);
  document.getElementById('stat-crew').innerHTML = this.caravan.crew;
  document.getElementById('stat-oxen').innerHTML = this.caravan.oxen;
  document.getElementById('stat-food').innerHTML = Math.ceil(this.caravan.food);
  document.getElementById('stat-money').innerHTML = this.caravan.money;
  document.getElementById('stat-firepower').innerHTML = this.caravan.firepower;
  document.getElementById('stat-weight').innerHTML = Math.ceil(this.caravan.weight) + '/' + this.caravan.capacity;

  //update caravan position
  document.getElementById('caravan').style.left = (380 * this.caravan.distance/OregonH.FINAL_DISTANCE) + 'px';
};

//show attack
OregonH.UI.showAttack = function(firepower, gold)
{
  var attackDiv = document.getElementById('attack');
  attackDiv.classList.remove('hidden');
  
  //keep properties
  this.firepower = firepower;
  this.gold = gold;
  
  //show firepower
  document.getElementById('attack-description').innerHTML = 'Firepower: '+firepower;
  
  //init once
  if(!this.attackInitiated)
  {
    //fight
    document.getElementById('fight').addEventListener('click', this.fight.bind(this));
    
    //run away
    document.getElementById('runaway').addEventListener('click', this.runaway.bind(this));
    
    this.attackInitiated = true;
  }
};

//fight
OregonH.UI.fight = function()
{
  
  var firepower = this.firepower;
  var gold = this.gold;
  
  var damage = Math.ceil(Math.max(0, firepower * 2 * Math.random() - this.caravan.firepower));
  
  //check there are survivors
  if(damage < this.caravan.crew)
  {
    this.caravan.crew -= damage;
    this.caravan.money += gold;
    this.notify(damage+' people were killed fighting', 'negative');
    this.notify('Found $'+gold, 'gold');
  }
  else
  {
    this.caravan.crew = 0;
    this.notify('Everybody died in the fight', 'negative');
  }
  
  //resume journey
  document.getElementById('attack').classList.add('hidden');
  this.game.resumeJourney();
};

//running away from enemy
Oregon.UI.runaway = function()
{
  var firepower = this.firepower;
  
  var damage = Math.ceil(Math.max(0, firepower *Math.random()/2));
  
  //check there are survivors
  if(damage < this.caravan.crew)
  {
    this.caravan.crew -= damage;
    this.notify(damage+' people were killed running', 'negative');
  }
  else
  {
    this.caravan.crew = 0;
    this.notify('Everybody died running away.', 'negative');
  }
  
  //remove event listener
  document.getElementById('runaway').removeEventListener('click');
  
  //resume journey
  document.getElementById('attack').classList.add('hidden');
  this.game.resumeJourney();
  
};
