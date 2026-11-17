const CHARACTER_SETS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{};:,.?",
};

function randomIndex(max) {
  if (max <= 0) return 0;

  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const limit = Math.floor(0x100000000 / max) * max;
    const values = new Uint32Array(1);
    do {
      crypto.getRandomValues(values);
    } while (values[0] >= limit);
    return values[0] % max;
  }

  return Math.floor(Math.random() * max);
}

function generatePassword(length = 16, options = null) {
  const size = Number(length);
  if (!Number.isInteger(size) || size < 1) {
    throw new RangeError("Password length must be a positive integer");
  }

  const sets =
    options === null
      ? Object.keys(CHARACTER_SETS)
      : Object.keys(CHARACTER_SETS).filter((name) => options[name] === true);

  if (sets.length === 0) {
    throw new Error("Select at least one character type");
  }

  let allCharacters = "";
  const password = [];
  for (const name of sets) allCharacters += CHARACTER_SETS[name];

  const requiredSets = sets.slice(0, size);
  for (const name of requiredSets) {
    password.push(
      CHARACTER_SETS[name][randomIndex(CHARACTER_SETS[name].length)],
    );
  }

  while (password.length < size) {
    password.push(allCharacters[randomIndex(allCharacters.length)]);
  }

  for (let i = password.length - 1; i > 0; i -= 1) {
    const j = randomIndex(i + 1);
    [password[i], password[j]] = [password[j], password[i]];
  }

  return password.join("");
}

if (typeof document !== "undefined") {
  const passwordInput = document.getElementById("password");
  const lengthInput = document.getElementById("length");
  const lengthValue = document.getElementById("length-value");
  const generateButton = document.getElementById("generate");
  const copyButton = document.getElementById("copy");
  const copyStatus = document.getElementById("copy-status");

  function refreshPassword() {
    const options = {
      uppercase: document.getElementById("uppercase").checked,
      lowercase: document.getElementById("lowercase").checked,
      numbers: document.getElementById("numbers").checked,
      symbols: document.getElementById("symbols").checked,
    };

    try {
      passwordInput.value = generatePassword(Number(lengthInput.value), options);
      copyStatus.textContent = "";
    } catch (error) {
      passwordInput.value = "";
      copyStatus.textContent = error.message;
    }
  }

  lengthInput.addEventListener("input", () => {
    lengthValue.value = lengthInput.value;
    lengthValue.textContent = lengthInput.value;
    refreshPassword();
  });

  generateButton.addEventListener("click", refreshPassword);

  document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener("change", refreshPassword);
  });

  copyButton.addEventListener("click", async () => {
    if (!passwordInput.value) return;

    try {
      await navigator.clipboard.writeText(passwordInput.value);
    } catch {
      passwordInput.select();
      document.execCommand("copy");
    }
    copyStatus.textContent = "Copied to clipboard";
  });

  refreshPassword();
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { generatePassword, randomIndex, CHARACTER_SETS };
}
