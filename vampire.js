class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    if (this.creator === null) {
      return 0;
    }
    let count = 1;
    let vampire = this.creator;
    while (vampire.creator) {
      count += 1;
      vampire = vampire.creator;
    }
    return count;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let senior, junior;
    if (this.isMoreSeniorThan(vampire)) {
      senior = this;
      junior = vampire;
    } else {
      senior = vampire;
      junior = this;
    }

    // Set both vampires at the same level to be able to compare their creators
    while (senior.isMoreSeniorThan(junior)) {
      junior = junior.creator;
    }

    // Change variables name to avoid confusion since now one is not more senior than the other
    let vampireA = senior;
    let vampireB = junior;

    // Go up in the tree until the common ancestor is found
    while (vampireA.creator !== vampireB.creator) {
      vampireA = vampireA.creator;
      vampireB = vampireB.creator;
    }

    // return the more senior vampire if a direct ancestor is used
    if (vampireA === vampireB) {
      return vampireA;
    }

    return vampireA.creator;
  }
}

module.exports = Vampire;

