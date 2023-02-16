const args = [
  '--require-module @babel/register',
  'e2e/features/*/*.feature',
].join(' ');

module.exports = {
  default: args,
};
