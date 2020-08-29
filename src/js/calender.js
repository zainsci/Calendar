const noOfDaysIn = {
  Jan: 31,
  Feb: 28,
  Mar: 31,
  Apr: 30,
  May: 31,
  Jun: 30,
  Jul: 31,
  Aug: 30,
  Sep: 30,
  Oct: 31,
  Nov: 30,
  Dec: 31,
};

const daysList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const monthsList = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const date = new Date();
const thisDate = date.getDate();
const thisDay = date.getDay();
const thisYear = date.getFullYear();
const thisMonth = monthsList[date.getMonth()];
const previousMonth = monthsList[date.getMonth() - 1];
const nextMonth = monthsList[date.getMonth() + 1];
const noOfDaysInThisMonth = noOfDaysIn[thisMonth];
const noOfDaysInPreviousMonth = noOfDaysIn[previousMonth];
const noOfDaysInNextMonth = noOfDaysIn[nextMonth];
const daysListOfPreviousMonth = [];
const daysListOfThisMonth = [];

for (let i = 0; i <= noOfDaysInPreviousMonth; i++) {
  if (i >= noOfDaysInPreviousMonth - thisDay + 1) {
    daysListOfPreviousMonth.push(i);
  }
}

for (let i = 0; i < 43; i++) {
  if (i <= daysListOfPreviousMonth.length - 1) {
    daysListOfThisMonth.push(daysListOfPreviousMonth[i]);
  } else {
    if (i >= noOfDaysInThisMonth + daysListOfPreviousMonth.length + 1) {
      daysListOfThisMonth.push(i - 42 + daysListOfPreviousMonth.length);
    } else {
      daysListOfThisMonth.push(i - daysListOfPreviousMonth.length + 1);
    }
  }
}

const monthGrid = [[], [], [], [], [], []];

for (let i = 0; i < daysListOfThisMonth.length; i++) {
  if (i >= 0 && i < 7) {
    monthGrid[0].push(daysListOfThisMonth[i]);
  } else if (i >= 7 && i < 14) {
    monthGrid[1].push(daysListOfThisMonth[i]);
  } else if (i >= 14 && i < 21) {
    monthGrid[2].push(daysListOfThisMonth[i]);
  } else if (i >= 21 && i < 28) {
    monthGrid[3].push(daysListOfThisMonth[i]);
  } else if (i >= 28 && i < 35) {
    monthGrid[4].push(daysListOfThisMonth[i]);
  } else if (i >= 35 && i < 42) {
    monthGrid[5].push(daysListOfThisMonth[i]);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const monthGridDOM = document.getElementById("monthGrid");
  monthGridDOM.innerHTML = "";

  monthGrid.forEach((row) => {
    const div = document.createElement("div");
    div.className = "days-row";
    const ul = document.createElement("ul");

    row.forEach((day) => {
      const li = document.createElement("li");
      li.classList = "date box";
      li.id = `${thisYear}${thisMonth}${thisDate}`;
      li.innerHTML = day;
      ul.appendChild(li);
    });
    div.appendChild(ul);
    monthGridDOM.appendChild(div);
  });
});
