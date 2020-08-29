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

  calenderGrid.forEach((row) => {
    const div = document.createElement("div");
    div.className = "days-row";
    const ul = document.createElement("ul");

    row.forEach((day) => {
      const li = document.createElement("li");
      li.classList = "date box";
      li.id = `${thisYear}${thisMonth}${day}`;
      li.innerHTML = day;
      ul.appendChild(li);
    });
    div.appendChild(ul);
    monthGridDOM.appendChild(div);
  });
});
