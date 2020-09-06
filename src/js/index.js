const headerValues = ["HeaderYear", "HeaderMonth", "HeaderEvent"];
const headerValuesList = {
  HeaderYear: "header-year-list",
  HeaderMonth: "header-month-list",
  HeaderEvent: "header-events-list",
};

// Rednering Header Lists For years and months
headerValues.forEach((elem) => {
  document.getElementById(elem).addEventListener("click", () => {
    headerValues.forEach((elem) => {
      document.querySelector("." + headerValuesList[elem]).style.display =
        "none";
    });
    const e = document.querySelector("." + headerValuesList[elem]);
    toggleDisplay(e);

    const listItems = e.querySelectorAll("li");
    listItems.forEach((item) => {
      const itemName = item.innerHTML;
      item.addEventListener("click", () => {
        document.getElementById(elem).innerHTML = itemName;
        e.style.display = "none";

        const year = +document.getElementById("HeaderYear").innerHTML;
        const month = +monthNo[
          document.getElementById("HeaderMonth").innerHTML
        ];

        const calendar = getCalender(year, month);
        printCalendar(calendar);
        showEvents();
        highlightDate();
      });
    });
  });
});

// Runs after the DOMContent is loaded
document.addEventListener("DOMContentLoaded", () => {
  const d = new Date();
  const calendar = getCalender(d.getFullYear(), d.getMonth() + 1);
  printCalendar(calendar);
  showEvents();
  showDateAndEvents(d.getDate(), d.getDay());
  highlightDate();

  // Add List of Years in Header Year Box
  const yearList = document.querySelector(".header-year-list");
  yearList.innerHTML = "";
  const ul = document.createElement("ul");
  for (let i = 1971; i < 2070; i++) {
    const li = document.createElement("li");
    li.innerHTML = i;
    ul.appendChild(li);
  }
  yearList.appendChild(ul);

  // Displaying if any events on This day
  appendEventsInDropdown();

  // Closing Event details window
  document.getElementById("crossEvent").onclick = () => {
    document.getElementById("popupEventWin").style.display = "none";
  };

  // Getting Today on Calender
  document.getElementById("HeaderToday").onclick = () => {
    const d = new Date();
    document.getElementById("HeaderYear").innerHTML = d.getFullYear();
    document.getElementById("HeaderMonth").innerHTML = monthList[d.getMonth()];
    const calendar = getCalender(d.getFullYear(), d.getMonth() + 1);
    printCalendar(calendar);
    showEvents();
    document.getElementById("select").innerHTML = `
  ${monthList[d.getMonth()].slice(
    0,
    3
  )} ${d.getDate()}, ${d.getFullYear()} - ${dayName[d.getDay()].slice(0, 3)}
  `;
    console.log(d.getDay());
    document.getElementById("selectedDay").innerHTML = d.getDate();
    showEventsInSection(monthList[d.getMonth()], d.getDate());
    highlightDate();
  };
});

// Toggle Display
function toggleDisplay(elem) {
  const curDisplayStyle = elem.style.display;

  if (curDisplayStyle === "none" || curDisplayStyle === "") {
    elem.style.display = "block";
  } else {
    elem.style.display = "none";
  }
}

// Hightlights a selected date with white border
function highlightDate() {
  document.querySelectorAll("li.date").forEach((day) => {
    day.addEventListener("click", () => {
      document.querySelectorAll(".date").forEach((item) => {
        item.classList.remove("selected-now");
      });
      day.classList.add("selected-now");
    });
  });
}
