class Customer {
  constructor(id, firstName, lastName, email, username, provider, orders) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.username = username;
    this.provider = provider;
    this.orders = orders;
  }
}

module.exports = Customer;
