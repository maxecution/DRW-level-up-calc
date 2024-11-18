document.addEventListener("DOMContentLoaded", () => {
  const calculateBtn = document.getElementById("calculate-btn");
  const clearBtn = document.getElementById("clear-btn");
  const currentLevelInput = document.getElementById("current-level");
  const desiredLevelInput = document.getElementById("desired-level");
  const availableXpInput = document.getElementById("available-xp");
  const lastLeveledDateInput = document.getElementById("last-leveled-date");
  const resultLabel = document.getElementById("result-label");

  const currentLevelError = document.getElementById("current-level-error");
  const desiredLevelError = document.getElementById("desired-level-error");
  const availableXpError = document.getElementById("available-xp-error");
  const lastLeveledDateError = document.getElementById("last-leveled-date-error");

  const today = new Date();

  currentLevelInput.focus();

  // Function to clear all inputs and reset the state
  function clearForm() {
    // Reset Inputs
    currentLevelInput.value = "";
    desiredLevelInput.value = "";
    availableXpInput.value = "";
    lastLeveledDateInput.value = "";

    // Reset error messages
    currentLevelError.textContent = "";
    currentLevelError.classList.add("hidden");

    desiredLevelError.textContent = "";
    desiredLevelError.classList.add("hidden");

    availableXpError.textContent = "";
    availableXpError.classList.add("hidden");

    lastLeveledDateError.textContent = "";
    lastLeveledDateError.classList.add("hidden");

    // Reset the result label
    resultLabel.innerHTML = "The result will be displayed here.";

    currentLevelInput.focus();
  }

  // Form validation
  function validateForm() {
    let isValid = true;

    const currentLevel = parseInt(currentLevelInput.value, 10);
    const desiredLevel = parseInt(desiredLevelInput.value, 10);
    const availableXP = parseInt(availableXpInput.value, 10) || 0;
    const lastLeveledDate = lastLeveledDateInput.value;

    // Validate Current Level
    if (isNaN(currentLevel) || currentLevel < 3 || currentLevel > 19) {
      currentLevelError.textContent = "Please enter a valid current level.";
      currentLevelError.classList.remove("hidden");
      isValid = false;
    } else {
      currentLevelError.textContent = "";
      currentLevelError.classList.add("hidden");
    }

    // Validate Desired Level
    if (isNaN(desiredLevel) || desiredLevel <= currentLevel || desiredLevel > 20) {
      desiredLevelError.textContent = "Please enter a valid desired level.";
      desiredLevelError.classList.remove("hidden");
      isValid = false;
    } else {
      desiredLevelError.textContent = "";
      desiredLevelError.classList.add("hidden");
    }

    // Validate Available XP
    if (availableXP < 0 || availableXP > 999) {
      availableXpError.textContent = "Please enter a valid XP amount.";
      availableXpError.classList.remove("hidden");
      isValid = false;
    } else {
      availableXpError.textContent = "";
      availableXpError.classList.add("hidden");
    }

    // Validate Last Leveled Date
    if (lastLeveledDate && new Date(lastLeveledDate) > today) {
      lastLeveledDateError.textContent = "Date must be in the past.";
      lastLeveledDateError.classList.remove("hidden");
      isValid = false;
    } else {
      lastLeveledDateError.textContent = "";
      lastLeveledDateError.classList.add("hidden");
    }

    return isValid;
  }

  function clearErrorOnInput(event) {
    const inputId = event.target.id;
    resultLabel.innerHTML = "The result will be displayed here.";

    if (inputId === "current-level") {
      currentLevelError.textContent = "";
      currentLevelError.classList.add("hidden");
    } else if (inputId === "desired-level") {
      desiredLevelError.textContent = "";
      desiredLevelError.classList.add("hidden");
    } else if (inputId === "available-xp") {
      availableXpError.textContent = "";
      availableXpError.classList.add("hidden");
    } else if (inputId === "last-leveled-date") {
      lastLeveledDateError.textContent = "";
      lastLeveledDateError.classList.add("hidden");
    }
  }

  // Helper Functions
  const getLevelUpCost = (level) => level * 2;

  const calculateTotalXpNeeded = (currentLevel, desiredLevel) => {
    let totalXp = 0;
    for (let level = currentLevel + 1; level <= desiredLevel; level++) {
      totalXp += getLevelUpCost(level);
    }
    return totalXp;
  };

  const calculateLevelUpDates = (currentLevel, desiredLevel, baseXp, lastLeveledDate) => {
    let availableXp = baseXp;
    let currentDate = new Date(today);
    const dates = [];

    // Check if cooldown applies
    if (lastLeveledDate) {
      const daysSinceLastLevel = Math.floor((today - lastLeveledDate) / (1000 * 60 * 60 * 24));
      if (daysSinceLastLevel < 7) {
        const cooldownRemaining = 7 - daysSinceLastLevel;
        currentDate.setDate(currentDate.getDate() + cooldownRemaining);
      }
    }

    for (let level = currentLevel + 1; level <= desiredLevel; level++) {
      const cost = getLevelUpCost(level);

      // Wait for XP if insufficient
      while (availableXp < cost) {
        availableXp++;
        currentDate.setDate(currentDate.getDate() + 1);
      }

      // Deduct XP for the level-up
      availableXp -= cost;
      dates.push({ level, date: new Date(currentDate) });

      // Add cooldown for the next level-up
      currentDate.setDate(currentDate.getDate() + 7);
      availableXp += 7;
    }

    return dates;
  };

  // Clear Button Event Listener
  clearBtn.addEventListener("click", clearForm);

  // Calculate Button Event Listener
  calculateBtn.addEventListener("click", () => {
    if (validateForm()) {
      const currentLevel = parseInt(currentLevelInput.value, 10);
      const desiredLevel = parseInt(desiredLevelInput.value, 10);
      const baseXp = parseInt(availableXpInput.value, 10) || 0;
      const lastLeveledDate = lastLeveledDateInput.value ? new Date(lastLeveledDateInput.value) : null;

      const levelUpDates = calculateLevelUpDates(currentLevel, desiredLevel, baseXp, lastLeveledDate);
      const finalDate = levelUpDates[levelUpDates.length - 1].date;

      let message = `<p class="mb-2">You can reach level <b>${desiredLevel}</b> by <b>${finalDate.toDateString()}</b></p>`;
      message += `<ul class="list-disc">`;

      levelUpDates.forEach(({ level, date }) => {
        message += `<li class="mb-1 ml-6">Level <b>${level}</b> on <b>${date.toDateString()}</b></li>`;
      });

      message += `</ul>`;

      resultLabel.innerHTML = message;
    }
  });

  currentLevelInput.addEventListener("input", clearErrorOnInput);
  desiredLevelInput.addEventListener("input", clearErrorOnInput);
  availableXpInput.addEventListener("input", clearErrorOnInput);
  lastLeveledDateInput.addEventListener("input", clearErrorOnInput);
});
