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
      });
    });
  });
});

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
};

// Toggle Display
function toggleDisplay(elem) {
  const curDisplayStyle = elem.style.display;

  if (curDisplayStyle === "none" || curDisplayStyle === "") {
    elem.style.display = "block";
  } else {
    elem.style.display = "none";
  }
}
