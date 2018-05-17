class Player {
  playTurn(warrior) {
    if (this.amBlocked(warrior)) {
      warrior.attack();
    } else {
      warrior.walk();
    }
  }

  amBlocked(warrior) {
    return (! warrior.feel().isEmpty());
  }
}
