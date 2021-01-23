function User(data) {
  return {
    data,
    name() {
      return this.data.name;
    },
    toPing() {
      return this.data.name ? `@${this.data.name}` : '';
    },
  };
}

module.exports = {User};
