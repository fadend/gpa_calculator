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

// Insert the input fields for a new class
// into the table.
function addNewClass() {
  const tbody = document.getElementById("classes_tbody");
  const newTr = document.createElement("tr");
  for (let i = 0; i < 3; ++i) {
    const td = document.createElement("td");
    const input = document.createElement("input");
    input.size = "15";
    if (i != 0) {
      input.addEventListener("change", updateCreditsGpa);
    }
    td.appendChild(input);
    newTr.appendChild(td);
  }
  tbody.appendChild(newTr);
}

// Update the credits and GPA fields.
function updateCreditsGpa() {
  const tbody = document.getElementById("classes_tbody");
  const elements = tbody.getElementsByTagName("input");
  updateCreditsGpaWith(elements);
}

// Convert the given float to a string of the closest
// float with two or fewer places after the decimal.
function formatDecimal(aFloat) {
  var digits = "" + Math.round(100 * aFloat);
  var length = digits.length;
  if (length < 3) {
    return "0." + digits;
  } else {
    var dp = length - 2;
    return digits.substring(0, dp) + "." + digits.substring(dp, length);
  }
}

function updateCreditsGpaWith(elements) {
  var totalGradedCredits = 0;
  var totalUngradedCredits = 0;
  var totalPoints = 0;

  var haveAtLeastOneGrade = false;

  var length = elements.length;
  for (var i = 0; i < length; i += 3) {
    var letter = elements[i + 2].value.toUpperCase();
    if (letter == "X") {
      continue;
    }

    var creditsString = elements[i + 1].value;
    if (creditsString == "") {
      continue;
    }

    var credits = parseFloat(creditsString);
    if (isNaN(credits)) {
      alert('Not a number: "' + creditsString + '"');
      return;
    }

    if (letter == "P" || letter == "T" || letter == "N") {
      totalUngradedCredits += credits;
      continue;
    } else {
      totalGradedCredits += credits;
    }

    if (letter == "") {
      continue;
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
    gpaInput.value = formatDecimal(totalPoints / totalGradedCredits);
  } else {
    gpaInput.value = "";
  }
}
