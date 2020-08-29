export default function makeCalenderGrid() {
  const date = new Date();

  const noOfDaysIn = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const DaysInMonth = noOfDaysIn[date.getMonth()];
  const DaysInPrevMonth = noOfDaysIn[date.getMonth() - 1];

  function findPreMonthDays() {
    let sunday = date.getDate() - date.getDay();
    sunday = ((sunday % 7) - 7 - 1) % -7;
    sunday = `${sunday}`;
    let noOfDays = +sunday.slice(1);

    if (noOfDays == 0) {
      noOfDays = 7;
    }
    return noOfDays;
  }

  let noOfPrevDays = findPreMonthDays();

  const prevMonthDays = [];

  for (let i = 0; i < noOfPrevDays; i++) {
    prevMonthDays.push(DaysInPrevMonth - i);
  }

  const monthGrid = prevMonthDays.reverse();

  for (let i = 1; i <= DaysInMonth; i++) {
    monthGrid.push(i);
  }

  const currentLen = monthGrid.length;

  for (let i = 1; i <= 42 - currentLen; i++) {
    monthGrid.push(i);
  }

  const calenderGrid = [[], [], [], [], [], []];

  for (let i = 0; i < monthGrid.length; i++) {
    if (i >= 0 && i < 7) {
      calenderGrid[0].push(monthGrid[i]);
    } else if (i >= 7 && i < 14) {
      calenderGrid[1].push(monthGrid[i]);
    } else if (i >= 14 && i < 21) {
      calenderGrid[2].push(monthGrid[i]);
    } else if (i >= 21 && i < 28) {
      calenderGrid[3].push(monthGrid[i]);
    } else if (i >= 28 && i < 35) {
      calenderGrid[4].push(monthGrid[i]);
    } else if (i >= 35 && i < 42) {
      calenderGrid[5].push(monthGrid[i]);
    }
  }

  return calenderGrid;
}
