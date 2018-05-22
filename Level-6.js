class Player {
  constructor() {
    this.health = 20;
    this.hasTouchedWall = false;
  }

  playTurn(warrior) {

    if (this.emptyStairsInFront(warrior)) {
      warrior.walk();
    } else if (!this.hasTouchedWall){
      this.touchWall(warrior);
    } else if (this.captiveInFront(warrior)) {
      warrior.rescue();
    } else if (this.isHealthCritical(warrior) && this.takingDamage(warrior)) {
      warrior.walk('backward');
    } else if (this.takingDamage(warrior) && this.pathClear(warrior)) {
      warrior.walk();
    } else if ((this.pathBlocked(warrior) && this.healthy(warrior)) || this.takingDamage(warrior)) {
      warrior.attack();
    } else if (this.notHealthy(warrior) && this.pathBlocked(warrior)) {
      warrior.walk('backward');
    } else if (this.notHealthy(warrior)) {
      warrior.rest();  
    } else {
      warrior.walk()
    }
    this.health = warrior.health();
  }

  emptyStairsInFront(warrior) {
    return (warrior.feel().isStairs() && warrior.feel().isEmpty());
  }

  touchWall(warrior) {
    const space = warrior.feel('backward');
    if (!space.isEmpty() && !space.isWall()) {
      warrior.rescue('backward');
    } else if (space.isWall()) {
      this.hasTouchedWall = true;
      warrior.walk();
    } else {
      warrior.walk('backward');
    }

  }

  isHealthCritical(warrior) {
    return (warrior.health() <= 9);
  }

  captiveInFront(warrior) {
    return (warrior.feel().isCaptive());
  }

  takingDamage(warrior) {
    return (warrior.health() < this.health);
  }
  
  pathClear (warrior) {
    return (warrior.feel().isEmpty());
  }

  pathBlocked(warrior) {
    return (!warrior.feel().isEmpty());
  }

  enemyInFront(warrior) {
    return (!warrior.feel().isEmpty() && !warrior.feel().isCaptive());
  }

  notHealthy(warrior) {
    return (warrior.health() <= 17) ? true : false;
  }

  healthy(warrior) {
    return (warrior.health() > 17) ? true : false;
  }
}
