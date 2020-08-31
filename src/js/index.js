document.addEventListener("DOMContentLoaded", () => {
  const datetime = new Date();
  document.getElementById("HeaderYear").innerHTML = datetime.getFullYear();
  document.getElementById("HeaderMonth").innerHTML =
    monthList[datetime.getMonth()];
});

const headerValues = ["HeaderYear", "HeaderMonth", "HeaderEvent"];
const headerValuesList = {
  HeaderYear: "header-year-list",
  HeaderMonth: "header-month-list",
  HeaderEvent: "header-events-list",
};

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
      });
    });
  });
});

function toggleDisplay(elem) {
  const curDisplayStyle = elem.style.display;

  if (curDisplayStyle === "none" || curDisplayStyle === "") {
    elem.style.display = "block";
  } else {
    elem.style.display = "none";
  }
}

const dayList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const monthList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];