import dayjs from "dayjs"

const MENU_MONTH = document.getElementById("MenuMonth")
const MENU_YEAR = document.getElementById("MenuYear")
const MONTH_NAMES = [
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

document.addEventListener("DOMContentLoaded", () => {
  initCalendarMenu()
  initThemeToggler()

  const calendar = printCalendar(dayjs().year(), dayjs().month())

  fullDateInSection()

  document.getElementById("MenuToday").onclick = () => {
    printCalendar(calendar)
    initEvents()
  }

  if (isElectron()) {
    document.querySelector(".frame__utils").style.display = "flex"
  } else {
    document.querySelector(".frame__utils").style.display = "none"
  }
})

function initCalendarMenu() {
  MENU_YEAR.innerHTML = dayjs().year()
  MENU_YEAR.setAttribute("data-value", dayjs().year())

  MENU_MONTH.innerHTML = MONTH_NAMES[dayjs().month()]
  MENU_MONTH.setAttribute("data-value", dayjs().month())

  initMenuList("month")
  initMenuList("year", 1971, 2070)

  document.querySelectorAll(".menu__list").forEach((elem) => {
    elem.addEventListener("click", () => {
      elem.classList.contains("menu__list--selected")
        ? elem.classList.remove("menu__list--selected")
        : elem.classList.add("menu__list--selected")

      const list = elem.querySelector("ul")
      toggleDisplay(list)
    })
  })

  hideAllMenuLists()
}

function initMenuList(type = "", x = 0, y = 12) {
  const list = document.querySelector(".menu__list__" + type)
  list.innerHTML = ""

  for (let i = x; i < y; i++) {
    const li = document.createElement("li")
    const hr = document.createElement("hr")

    li.innerHTML = type === "month" ? MONTH_NAMES[i] : i
    li.setAttribute("data-value", i)

    list.appendChild(li)
    list.appendChild(hr)

    updateCalendarOnClick(li)
  }
}

function updateCalendarOnClick(elem) {
  if (elem) {
    elem.addEventListener("click", () => {
      const elemValue = elem.getAttribute("data-value")

      if (elemValue) {
        const elemDisplay = elem.parentNode.parentNode.querySelector("div")

        elemDisplay.innerHTML =
          elemDisplay.id === "MenuMonth" ? MONTH_NAMES[elemValue] : elemValue
        elemDisplay.setAttribute("data-value", elemValue)

        const month = MENU_YEAR.getAttribute("data-value")
        const year = MENU_MONTH.getAttribute("data-value")

        printCalendar(parseInt(month, 10), parseInt(year, 10))

        document.body.click()
      }
    })
  }
}

function updateMenu(year, month) {
  MENU_YEAR.setAttribute("data-value", year)
  MENU_YEAR.innerHTML = year

  MENU_MONTH.setAttribute("data-value", parseInt(month, 10))
  MENU_MONTH.innerHTML = MONTH_NAMES[month]
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
      document.querySelectorAll(".date--selected").forEach((item) => {
        item.classList.remove("date--selected")
      })

      day.classList.add("date--selected")
    })
  })
}

// Renders Events in the date boxes
function initEvents(month = dayjs().month()) {
  fetch("./json/events.json")
    .then((res) => res.json())
    .then((data) => {
      const allEvents = data

      const thisMonthEvents = allEvents[month]
      eventsInDates(thisMonthEvents)
      eventsInMenuList(thisMonthEvents)
    })
}

function eventsInDates(thisMonthEvents) {
  const daysRow = document.getElementsByClassName("date--this")

  for (let i = 0; i < daysRow.length; i++) {
    let events = thisMonthEvents[daysRow[i].innerText]
    if (events) {
      const ul = document.createElement("ul")
      ul.className = "event__list"

      events.forEach((event) => {
        const li = document.createElement("li")
        li.innerHTML = event.name
        li.className = `event__day event__day--${event.type}`
        ul.appendChild(li)
      })

      daysRow[i].appendChild(ul)
    }
  }
}

function eventsInMenuList(thisMonthEvents) {
  const eventsLists = document.querySelector(".menu__list__event")
  const MenuEvent = document.getElementById("MenuEvent")

  eventsLists.innerHTML = ""

  Object.keys(thisMonthEvents).forEach((day) => {
    thisMonthEvents[day].forEach((event) => {
      const li = document.createElement("li")
      li.innerHTML = event.name
      li.addEventListener("click", () => {
        showEventDetails(event)
      })

      eventsLists.appendChild(li)
      li.addEventListener("click", () => {
        showEventDetails(event)
      })
    })
  })

  MenuEvent.innerHTML = thisMonthEvents[dayjs().date()]
    ? thisMonthEvents[dayjs().date()][0].name
    : "No Event Today"
}

// Redners events in right section
function showEventsInSection(month, day) {
  fetch("./json/events.json")
    .then((res) => res.json())
    .then((data) => {
      var allEvents = data

      if (allEvents[`${day} ${month}`]) {
        const eventsDiv = document.getElementById("SectionEvents")
        eventsDiv.innerHTML = ""
        allEvents[`${day} ${month}`].forEach((elem) => {
          const div = document.createElement("div")
          div.classList = `event__day event__day--${elem.type}`
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
  const crossEvent = document.getElementById("crossEvent")

  eventsDiv.innerHTML = ""

  const eventName = document.createElement("div")
  const eventDes = document.createElement("div")
  const eventSearch = document.createElement("div")
  const eventSearchLink = document.createElement("a")

  eventName.classList = `event__name event__day--${event.type}`
  eventName.innerHTML = event.name

  eventDes.classList = `event__description event__day--${event.type}`
  eventDes.innerHTML = event.remarks

  eventSearch.classList.add("search__google")
  eventSearchLink.setAttribute("target", "_blank")
  eventSearchLink.setAttribute("rel", "noopener noreferrer")
  eventSearchLink.href = `https://www.google.com/search?q=${event.name}`
  eventSearchLink.innerHTML = "Search In Google"
  eventSearch.appendChild(eventSearchLink)

  eventsDiv.appendChild(eventName)
  eventsDiv.appendChild(eventDes)
  document.getElementById("popupEvent").appendChild(eventSearch)

  crossEvent.addEventListener("click", () => {
    document.getElementById("popupEventWin").style.display = "none"
  })
}

// Renders Month In DOM
function printCalendar(year = dayjs().year(), month = dayjs().date()) {
  const calendar = getCalender(year, month)

  const monthGridDOM = document.getElementById("monthGrid")
  monthGridDOM.innerHTML = ""

  const ul = document.createElement("ul")
  ul.className = "calendar__body__grid"

  for (let i = 0; i < calendar.length; i++) {
    const li = document.createElement("li")
    li.classList.add("box", "date")

    i % 7 >= 5 ? li.classList.add("date--weekend") : false

    if (calendar[i] > 7 && i < 7) {
      li.classList.add("date--previous")

      li.addEventListener("click", () => {
        updateMenu(month === 0 ? year - 1 : year, month === 0 ? 11 : month - 1)
        printCalendar(
          month === 0 ? year - 1 : year,
          month === 0 ? 11 : month - 1
        )
      })
    } else if (calendar[i] < 14 && i > 28) {
      li.classList.add("date--next")

      li.addEventListener("click", () => {
        updateMenu(month === 11 ? year + 1 : year, month === 11 ? 0 : month + 1)
        printCalendar(
          month === 11 ? year + 1 : year,
          month === 11 ? 0 : month + 1
        )
      })
    } else {
      const month = MENU_MONTH.getAttribute("data-value")

      if (
        calendar[i] == dayjs().date() &&
        dayjs().month() == month &&
        dayjs().year() == MENU_YEAR.getAttribute("data-value")
      ) {
        li.classList.add("date--this", "date--today")
      } else {
        li.classList.add("date--this")
      }

      li.addEventListener("click", () => {
        fullDateInSection(calendar[i])
      })
    }

    li.innerHTML = calendar[i]
    ul.appendChild(li)
  }

  monthGridDOM.appendChild(ul)

  initEvents(month)
  highlightDate()
}

// Redners date and events in the right section
function fullDateInSection(day = dayjs().date()) {
  const year = MENU_YEAR.getAttribute("data-value")
  const month = MENU_MONTH.getAttribute("data-value")

  document.getElementById("SectionFullDate").innerHTML = `
  ${dayjs(`${year}-${month + 1}-${day}`).format("MMM DD, YYYY - ddd")}
  `

  document.getElementById("SectionDate").innerHTML = day
  showEventsInSection(month, day)
}

// get Calender according to given year and month
function getCalender(y, m) {
  const calendarGrid = []
  y = parseInt(y, 10)
  m = parseInt(m, 10)

  const preYear = m === 0 ? y - 1 : y
  const preMonth = m === 0 ? 11 : m - 1

  const wDay = getWeekDay(y, m, 0)

  const DaysInMonth = dayjs(`${y}-${m + 1}`).daysInMonth()
  const DaysInPrevMonth = dayjs(`${preYear}-${preMonth + 1}`).daysInMonth()

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
  const w = new Date(y, m, d).getDay()
  return w === 0 ? 7 : w
}

// Check if the instance running is electron
// https://stackoverflow.com/questions/61725325/detect-an-electron-instance-via-javascript
function isElectron() {
  if (
    typeof window !== "undefined" &&
    typeof window.process === "object" &&
    window.process.type === "renderer"
  ) {
    return true
  }

  if (
    typeof process !== "undefined" &&
    typeof process.versions === "object" &&
    !!process.versions.electron
  ) {
    return true
  }

  if (
    typeof navigator === "object" &&
    typeof navigator.userAgent === "string" &&
    navigator.userAgent.indexOf("Electron") >= 0
  ) {
    return true
  }

  return false
}
