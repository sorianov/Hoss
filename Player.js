class Player {
  constructor() {
    this.health = 20;
  }

  playTurn(warrior) {
    
    if (this.takingDamage(warrior) && this.pathClear(warrior)) {
      this.health = warrior.health();
      warrior.walk();
    } else if ((this.pathBlocked(warrior) && this.healthy(warrior)) || this.takingDamage(warrior)) {
      this.health = warrior.health();
      warrior.attack();
    } else if (this.notHealthy(warrior) && this.pathBlocked(warrior)) {
      this.health = warrior.health();
      warrior.walk('backward');
    } else if (this.notHealthy(warrior)) {
      this.health = warrior.health();
      warrior.rest();  
    // } else if (this.pathClear(warrior) && this.notHealthy(warrior)) {
    //   warrior.walk();
    } else {
      this.health = warrior.health();
      warrior.walk()
    }
  }
  takingDamage(warrior) {
    return (warrior.health() < this.health);
  }
  pathClear (warrior) {
    return (warrior.feel().isEmpty());
  }

  pathBlocked(warrior) {
    return (! warrior.feel().isEmpty());
  }

  notHealthy(warrior) {
    return (warrior.health() <= 14) ? true : false;
  }

  healthy(warrior) {
    return (warrior.health() > 14) ? true : false;
  }
}
