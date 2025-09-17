const LETTER_TO_POINTS = {
  "A+": "4.33",
  A: "4.0",
  "A-": "3.67",
  "B+": "3.33",
  B: "3.0",
  "B-": "2.67",
  "C+": "2.33",
  C: "2.0",
  "C-": "1.67",
  "D+": "1.33",
  D: "1.0",
  "D-": "0.67",
  F: "0.0",
};

function addNewClass() {
  const tbody = document.getElementById("classes_tbody");
  const newTr = document.createElement("tr");
  for (let i = 0; i < 3; ++i) {
    const td = document.createElement("td");
    const input = document.createElement("input");
    input.size = "15";
    if (i > 0) {
      input.addEventListener("change", updateCreditsGpa);
      input.classList.add("gpa-input");
    }
    td.appendChild(input);
    newTr.appendChild(td);
  }
  tbody.appendChild(newTr);
}

function updateCreditsGpa() {
  const elements = document.getElementsByClassName("gpa-input");
  let totalGradedCredits = 0;
  let totalUngradedCredits = 0;
  let totalPoints = 0;

  let haveAtLeastOneGrade = false;

  const length = elements.length;
  for (let i = 0; i < length; i += 2) {
    const letter = elements[i + 1].value.toUpperCase();
    if (letter === "" || letter === "X") {
      continue;
    }

    const creditsString = elements[i].value;
    if (creditsString === "") {
      continue;
    }

    const credits = parseFloat(creditsString);
    if (isNaN(credits)) {
      alert('Not a number: "' + creditsString + '"');
      return;
    }

    if (letter === "P" || letter === "T" || letter === "N") {
      totalUngradedCredits += credits;
      continue;
    } else {
      totalGradedCredits += credits;
    }

    if (!LETTER_TO_POINTS.hasOwnProperty(letter)) {
      alert('Unrecognized letter grade: "' + letter + '"');
      return;
    }
    points = LETTER_TO_POINTS[letter];
    haveAtLeastOneGrade = true;

    totalPoints += credits * points;
  }
  document.getElementById("total-credits").value =
    totalGradedCredits + totalUngradedCredits;
  const gpaInput = document.getElementById("gpa");
  if (haveAtLeastOneGrade && totalGradedCredits > 0) {
    gpaInput.value = (totalPoints / totalGradedCredits).toFixed(2);
  } else {
    gpaInput.value = "";
  }
}

[...document.getElementsByClassName("gpa-input")].forEach((e) =>
  e.addEventListener("change", updateCreditsGpa),
);
document.getElementById("new-class-button").addEventListener("click", addNewClass);
document.getElementById("calculate-button").addEventListener("click", updateCreditsGpa);
