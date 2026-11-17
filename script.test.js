const test = require("node:test");
const assert = require("node:assert/strict");
const { generatePassword, CHARACTER_SETS } = require("./script");

test("generates a password of the requested length", () => {
  const password = generatePassword(24, { lowercase: true });
  assert.equal(password.length, 24);
  assert.match(password, /^[a-z]+$/);
});

test("includes each selected character type", () => {
  const options = {
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  };
  const password = generatePassword(20, options);

  assert.match(password, /[A-Z]/);
  assert.match(password, /[a-z]/);
  assert.match(password, /[0-9]/);
  assert.match(password, /[!@#$%^&*()_+\-=[\]{};:,.?]/);
});

test("rejects lengths that cannot produce a password", () => {
  assert.throws(() => generatePassword(0), RangeError);
  assert.throws(() => generatePassword(10, {}), Error);
});
