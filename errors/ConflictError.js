class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statuscode = 409;
  }
}

module.exports = ConflictError;
