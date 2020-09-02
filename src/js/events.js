// Renders Events in the date boxes
function showEvents() {
  fetch("./js/json/events.json")
    .then((res) => res.json())
    .then((data) => {
      var allEvents = data;

      const daysRow = document.getElementsByClassName("this-month");
      for (let i = 0; i < daysRow.length; i++) {
        const month = document.getElementById("HeaderMonth").innerHTML;
        if (allEvents[`${daysRow[i].innerHTML} ${month}`]) {
          const ul = document.createElement("ul");
          allEvents[`${daysRow[i].innerHTML} ${month}`].forEach((day) => {
            const li = document.createElement("Li");
            li.innerHTML = day.name;
            li.className = `event-day ${day.type}`;
            ul.appendChild(li);
          });

          daysRow[i].appendChild(ul);
        }
      }
    });
}

// Redners events in right section
function showEventsInSection(month, day) {
  fetch("./js/json/events.json")
    .then((res) => res.json())
    .then((data) => {
      var allEvents = data;

      if (allEvents[`${day} ${month}`]) {
        const eventsDiv = document.getElementById("eventsList");
        eventsDiv.innerHTML = "";
        allEvents[`${day} ${month}`].forEach((elem) => {
          const div = document.createElement("div");
          div.classList = `event ${elem.type}`;
          div.innerHTML = elem.name;
          div.addEventListener("click", () => {
            showEventDetails(elem);
          });

          eventsDiv.appendChild(div);
        });
      }
    });
}

// Renders event details if clicked on
function showEventDetails(event) {
  document.getElementById("popupEventWin").style.display = "flex";
  const eventsDiv = document.getElementById("popupEvent");
  // eventsDiv.innerHTML = "";

  // const div1 = document.createElement("div");
  // div1.classList = `event ${type}`;
  // div1.innerHTML = name;
  // const div2 = document.createElement("div");
  // div2.classList = `event ${type}`;
  // div2.innerHTML = remarks;

  // eventsDiv.appendChild(div1);
  // eventsDiv.appendChild(div2);
}
