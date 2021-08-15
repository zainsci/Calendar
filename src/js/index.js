import DayJs from "dayjs"

document.addEventListener("DOMContentLoaded", () => {
  initCalendarMenu()
  initThemeToggler()
  const calendar = getCalender(DayJs().year(), DayJs().month() + 1)
  printCalendar(calendar)
  showEvents()
  showDateAndEvents(DayJs().date(), DayJs().day())
  highlightDate()

  // Displaying if any events on This day
  appendEventsInDropdown()

  // Closing Event details window
  document.getElementById("crossEvent").onclick = () => {
    document.getElementById("popupEventWin").style.display = "none"
  }

  // Getting Today on Calender
  document.getElementById("MenuToday").onclick = () => {
    const d = new Date()
    document.getElementById("MenuYear").innerHTML = d.getFullYear()
    document.getElementById("MenuMonth").innerHTML = monthNames[d.getMonth()]
    const calendar = getCalender(d.getFullYear(), d.getMonth() + 1)
    printCalendar(calendar)
    showEvents()
    document.getElementById("SectionFullDate").innerHTML = `
  ${monthNames[d.getMonth()].slice(
    0,
    3
  )} ${d.getDate()}, ${d.getFullYear()} - ${dayName[d.getDay()].slice(0, 3)}
  `
    console.log(d.getDay())
    document.getElementById("SectionDate").innerHTML = d.getDate()
    showEventsInSection(monthNames[d.getMonth()], d.getDate())
    highlightDate()
  }
})

function initCalendarMenu() {
  document.getElementById("MenuYear").innerHTML = DayJs().year()
  document.getElementById("MenuYear").setAttribute("data-value", DayJs().year())

  document.getElementById("MenuMonth").innerHTML = monthNames[DayJs().month()]
  document
    .getElementById("MenuMonth")
    .setAttribute("data-value", DayJs().month())

  const yearList = document.querySelector(".menu__list__year")
  const monthList = document.querySelector(".menu__list__month")

  yearList.innerHTML = ""
  monthList.innerHTML = ""

  for (let i = 1971; i < 2070; i++) {
    const li = document.createElement("li")
    const hr = document.createElement("hr")

    li.innerHTML = i
    li.setAttribute("data-value", i)

    yearList.appendChild(li)
    yearList.appendChild(hr)
  }
  for (let i = 0; i < 12; i++) {
    const li = document.createElement("li")
    const hr = document.createElement("hr")

    li.innerHTML = monthNames[i]
    li.setAttribute("data-value", i)

    monthList.appendChild(li)
    monthList.appendChild(hr)
  }

  document.querySelectorAll(".menu__list").forEach((elem) => {
    elem.addEventListener("click", () => {
      elem.classList.contains("menu__list--selected")
        ? elem.classList.remove("menu__list--selected")
        : elem.classList.add("menu__list--selected")

      const list = elem.querySelector("ul")
      toggleDisplay(list)
    })

    const listItmes = elem.querySelectorAll("li")
    listItmes.forEach((li) => updateCalendarOnClick(li))
  })

  hideAllMenuLists()
}

function updateCalendarOnClick(elem) {
  if (elem) {
    elem.addEventListener("click", () => {
      const elemValue = elem.getAttribute("data-value")

      if (elemValue) {
        const elemDisplay = elem.parentNode.parentNode.querySelector("div")

        elemDisplay.innerHTML = elemValue
      }
    })
  }
}

function hideAllMenuLists() {
  document.addEventListener(
    "click",
    () => {
      document
        .querySelectorAll(".menu__list")
        .forEach((e) => e.classList.remove("menu__list--selected"))
      document
        .querySelectorAll(".menu__list ul")
        .forEach((e) => (e ? (e.style.display = "none") : false))
    },
    { capture: true }
  )
}

function initThemeToggler() {
  const themeToggler = document.querySelector(".theme__toggler")
  const themeStatus = document.querySelector(".theme__status")

  themeToggler.addEventListener("click", () => {
    const currentTheme = document.body.classList

    if (currentTheme.contains("dark")) {
      currentTheme.remove("dark")
      currentTheme.add("light")

      themeStatus.innerHTML = "Theme: Light"
    } else if (currentTheme.contains("light")) {
      currentTheme.remove("light")
      currentTheme.add("dark")

      themeStatus.innerHTML = "Theme: Dark"
    } else {
      currentTheme.add("dark")

      themeStatus.innerHTML = "Theme: Dark"
    }
  })
}

// menuList.forEach((elem) => {
//   document.querySelectorAll(".menu__list").forEach((list) => {
//     list.addEventListener("click", () => {
//       menuList.forEach((elem) => {
//         document.querySelector("." + menuListClasses[elem]).style.display =
//           "none"
//       })
//       const e = document.querySelector("." + menuListClasses[elem])
//       toggleDisplay(e)

//       const listItems = e.querySelectorAll("li")
//       listItems.forEach((item) => {
//         const itemName = item.innerHTML
//         item.addEventListener("click", () => {
//           document.getElementById(elem).innerHTML = itemName
//           e.style.display = "none"

//           const year = +document.getElementById("MenuYear").innerHTML
//           const month = +monthNo[document.getElementById("MenuMonth").innerHTML]

//           const calendar = getCalender(year, month)
//           printCalendar(calendar)
//           showEvents()
//           highlightDate()
//         })
//       })
//     })
//   })
// })

// Toggle Display
function toggleDisplay(elem) {
  let display
  if (elem) display = elem.style.display
  else return

  if (display === "none" || display === "") {
    elem.style.display = "block"
  } else {
    elem.style.display = "none"
  }
}

// Hightlights a selected date with white border
function highlightDate() {
  document.querySelectorAll("li.date").forEach((day) => {
    day.addEventListener("click", () => {
      document.querySelectorAll(".date").forEach((item) => {
        item.classList.remove("date--selected")
      })
      day.classList.add("date--selected")
    })
  })
}

// Renders Events in the date boxes
function showEvents() {
  fetch("./js/json/events.json")
    .then((res) => res.json())
    .then((data) => {
      var allEvents = data

      const daysRow = document.getElementsByClassName("this-month")
      for (let i = 0; i < daysRow.length; i++) {
        const month = document.getElementById("MenuMonth").innerHTML
        if (allEvents[`${daysRow[i].innerHTML} ${month}`]) {
          const ul = document.createElement("ul")
          allEvents[`${daysRow[i].innerHTML} ${month}`].forEach((day) => {
            const li = document.createElement("li")
            li.innerHTML = day.name
            li.className = `event__day event__day--${day.type}`
            ul.appendChild(li)
          })

          daysRow[i].appendChild(ul)
        }
      }
    })
}

// Redners events in right section
function showEventsInSection(month, day) {
  fetch("./js/json/events.json")
    .then((res) => res.json())
    .then((data) => {
      var allEvents = data

      if (allEvents[`${day} ${month}`]) {
        const eventsDiv = document.getElementById("SectionEvents")
        eventsDiv.innerHTML = ""
        allEvents[`${day} ${month}`].forEach((elem) => {
          const div = document.createElement("div")
          div.classList = `event ${elem.type}`
          div.innerHTML = elem.name
          div.addEventListener("click", () => {
            showEventDetails(elem)
          })

          eventsDiv.appendChild(div)
        })
      }
    })
}

// Renders event details if clicked on
function showEventDetails(event) {
  document.getElementById("popupEventWin").style.display = "flex"
  const eventsDiv = document.getElementById("eventDetails")
  eventsDiv.innerHTML = ""

  const eventName = document.createElement("div")
  const eventDes = document.createElement("div")
  const eventSearch = document.createElement("div")
  const eventSearchLink = document.createElement("a")

  eventName.classList = `event-name ${event.type}`
  eventName.innerHTML = event.name
  eventDes.classList = `event-description ${event.type}`
  eventDes.innerHTML = event.remarks
  eventSearch.classList = `search-google`
  eventSearchLink.setAttribute("target", "_blank")
  eventSearchLink.setAttribute("rel", "noopener noreferrer")
  eventSearchLink.href = `https://www.google.com/search?q=${event.name.replace(
    " ",
    "%20"
  )}`
  eventSearchLink.innerHTML = "Search In Google"
  eventSearch.appendChild(eventSearchLink)

  eventsDiv.appendChild(eventName)
  eventsDiv.appendChild(eventDes)
  document.getElementById("popupEvent").appendChild(eventSearch)
}

// Events for Dropdown
function appendEventsInDropdown() {
  fetch("./js/json/events.json")
    .then((res) => res.json())
    .then((data) => {
      var allEvents = data
      const d = new Date()

      if (allEvents[`${d.getDate()} ${monthNames[d.getMonth()]}`]) {
        const eventsLists = document.querySelector(".menu__list__event")
        const firstEvent = document.getElementById("MenuEvent")
        const ul = document.createElement("ul")

        allEvents[`${d.getDate()} ${monthNames[d.getMonth()]}`].forEach(
          (event) => {
            const li = document.createElement("li")
            li.innerHTML = event.name
            li.addEventListener("click", () => {
              showEventDetails(event)
            })
            ul.appendChild(li)
          }
        )
        eventsLists.appendChild(ul)
        firstEvent.innerHTML =
          allEvents[`${d.getDate()} ${monthNames[d.getMonth()]}`][0].name
      }
    })
}

const monthNames = [
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
]

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
}

const dayName = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

const d = new Date()
document.getElementById("MenuYear").innerHTML = d.getFullYear()
document.getElementById("MenuMonth").innerHTML = monthNames[d.getMonth()]

// Renders Month In DOM
function printCalendar(calendar) {
  const monthGridDOM = document.getElementById("monthGrid")
  monthGridDOM.innerHTML = ""

  const ul = document.createElement("ul")
  ul.className = "calendar__body__grid"

  for (let i = 0; i < calendar.length; i++) {
    const li = document.createElement("li")

    if (calendar[i] > 7 && i < 7) {
      if (i % 7 == 0 || i % 7 == 6) {
        li.classList = "box date date--previous date--weekend"
      } else {
        li.classList = "box date date--previous"
      }
      li.addEventListener("click", () => {
        showPreviousMonth(calendar[i], i)
      })
    } else if (calendar[i] < 14 && i > 28) {
      if (i % 7 == 0 || i % 7 == 6) {
        li.classList = "box date date--next date--weekend"
      } else {
        li.classList = "box date date--next"
      }
      li.addEventListener("click", () => {
        showNextMonth(calendar[i], i)
      })
    } else {
      const d = new Date()
      const month = document
        .getElementById("MenuMonth")
        .getAttribute("data-value")
      if (
        calendar[i] == d.getDate() &&
        d.getMonth() == month - 1 &&
        d.getFullYear() == document.getElementById("MenuYear").innerHTML
      ) {
        if (i % 7 == 0 || i % 7 == 6) {
          li.classList = "box date date--this date--today date--weekend"
        } else {
          li.classList = "box date date--this date--today"
        }
      } else {
        if (i % 7 == 0 || i % 7 == 6) {
          li.classList = "box date date--this date--weekend"
        } else {
          li.classList = "box date date--this"
        }
      }
      li.addEventListener("click", () => {
        showDateAndEvents(calendar[i], i % 7)
      })
    }
    li.innerHTML = calendar[i]

    ul.appendChild(li)
  }

  monthGridDOM.appendChild(ul)
}

// Redners date and events in the right section
function showDateAndEvents(day, i) {
  const year = document.getElementById("MenuYear").innerHTML
  const month = document.getElementById("MenuMonth").innerHTML
  const daysName = dayName[i]
  document.getElementById("SectionFullDate").innerHTML = `
  ${month.slice(0, 3)} ${day}, ${year} - ${daysName.slice(0, 3)}
  `
  document.getElementById("SectionDate").innerHTML = day
  document.getElementById("SectionEvents").innerHTML = ""
  showEventsInSection(month, day)
}

// Redners previous month if clicked on previous month date
function showPreviousMonth() {
  const currentMonth = document.getElementById("MenuMonth")
  const currentYear = document.getElementById("MenuYear")

  let month = parseInt(monthNo[currentMonth.innerHTML], 10)
  let year = parseInt(currentYear.innerHTML, 10)

  if (month == 1) {
    month = 12
    year -= 1
  } else {
    month -= 1
  }
  const calendar = getCalender(year, month)
  printCalendar(calendar)
  currentMonth.innerHTML = monthNames[month - 1]
  currentYear.innerHTML = year
  showEvents()
  highlightDate()
}

// Redners next month if clicked on next month date
function showNextMonth() {
  const currentMonth = document.getElementById("MenuMonth")
  const currentYear = document.getElementById("MenuYear")

  let month = parseInt(monthNo[currentMonth.innerHTML], 10)
  let year = parseInt(currentYear.innerHTML, 10)

  if (month == 12) {
    month = 1
    year += 1
  } else {
    month += 1
  }
  const calendar = getCalender(year, month)
  printCalendar(calendar)
  currentMonth.innerHTML = monthNames[month - 1]
  currentYear.innerHTML = year
  showEvents()
  highlightDate()
}

// get Calender according to given year and month
function getCalender(y, m) {
  const calendarGrid = []
  y = parseInt(y, 10)
  m = parseInt(m, 10)

  const preYear = y - 1
  const nextYear = y + 1
  const preMonth = m == 1 ? 12 : m - 1
  const nextMonth = m == 12 ? 1 : m + 1

  const wDay = getWeekDay(y, m, 1)

  const DaysInMonth = getMonthDays(y, m)
  const DaysInPrevMonth = getMonthDays(preYear, preMonth)

  const preMonthDaysInGrid = wDay - 1

  for (
    let i = DaysInPrevMonth - preMonthDaysInGrid;
    i <= DaysInPrevMonth;
    i++
  ) {
    calendarGrid.push(i)
  }
  for (let i = 1; i <= DaysInMonth; i++) {
    calendarGrid.push(i)
  }
  const l = calendarGrid.length
  for (let i = l; i < 42; i++) {
    calendarGrid.push(i - l + 1)
  }

  return calendarGrid
}

// To get the day of the week
function getWeekDay(y, m, d) {
  let day = new Date(y, m - 1, d).getDay()
  if (day == 0) {
    return 7
  } else {
    return day
  }
}

// To get the days in a month
function getMonthDays(y, m) {
  const daysIn = [
    31,
    isLeap(y) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ]

  return daysIn[m - 1]
}

// To check if the year is a leap year
function isLeap(y) {
  return (y % 4 == 0 && y % 100 != 0) || y % 400 == 0
}

// Find no of days of previos month
function findPreMonthDays() {
  let sunday = date.getDate() - date.getDay()
  sunday = ((sunday % 7) - 7 - 1) % -7
  sunday = `${sunday}`
  let noOfDays = +sunday.slice(1)

  if (noOfDays == 0) {
    noOfDays = 7
  }
  return noOfDays
}
