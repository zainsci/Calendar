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
const thisMonth = monthsList[date.getMonth()];
const previousMonth = monthsList[date.getMonth() - 1];
const nextMonth = monthsList[date.getMonth() + 1];
const noOfDaysInThisMonth = noOfDaysIn[thisMonth];
const noOfDaysInPreviousMonth = noOfDaysIn[previousMonth];
const noOfDaysInNextMonth = noOfDaysIn[nextMonth];
for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 7; j++) {}
}
