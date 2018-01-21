import '../scss/app.scss';

class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

let Mike = new Person('Mike', 'Lowe');

if (Mike) {
  Mike = new Person('u', 'wot');
}
