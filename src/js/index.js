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

        const year = +document.getElementById("HeaderYear").innerHTML;
        const month = +monthNo[
          document.getElementById("HeaderMonth").innerHTML
        ];

        const calendar = getCalender(year, month);
        printCalendar(calendar);
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

const monthNo = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};
