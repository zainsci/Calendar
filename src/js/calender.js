import makeCalenderGrid from "./makeCalenderGrid.js";

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
const thisYear = date.getFullYear();
const thisMonth = monthsList[date.getMonth()];

const calenderGrid = makeCalenderGrid();

document.addEventListener("DOMContentLoaded", () => {
  const monthGridDOM = document.getElementById("monthGrid");
  monthGridDOM.innerHTML = "";

  for (let i = 0; i < calenderGrid.length; i++) {
    const div = document.createElement("div");
    div.className = "days-row";
    const ul = document.createElement("ul");

    calenderGrid[i].forEach((day) => {
      const li = document.createElement("li");
      if (i == 0) {
        if (day > 7) {
          li.classList = "previous-month date box";
        } else {
          li.classList = "date box";
        }
      } else if (i == calenderGrid.length - 1) {
        if (day < 28) {
          li.classList = "next-month date box";
        } else {
          li.classList = "date box";
        }
      } else {
        li.classList = "date box";
      }
      li.id = `${thisYear}${thisMonth}${day}`;
      li.innerHTML = day;
      li.addEventListener("click", () => {
        showDateAndEvents();
      });
      ul.appendChild(li);
    });
    div.appendChild(ul);
    monthGridDOM.appendChild(div);
  }
});

function showDateAndEvents() {}
