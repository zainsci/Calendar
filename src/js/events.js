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
  const eventsDiv = document.getElementById("eventDetails");
  eventsDiv.innerHTML = "";

  const eventName = document.createElement("div");
  const eventDes = document.createElement("div");
  const eventSearch = document.createElement("div");
  const eventSearchLink = document.createElement("a");

  eventName.classList = `event-name ${event.type}`;
  eventName.innerHTML = event.name;
  eventDes.classList = `event-description ${event.type}`;
  eventDes.innerHTML = event.remarks;
  eventSearch.classList = `search-google`;
  eventSearchLink.setAttribute("target", "_blank");
  eventSearchLink.setAttribute("rel", "noopener noreferrer");
  eventSearchLink.href = `https://www.google.com/search?q=${event.name.replace(
    " ",
    "%20"
  )}`;
  eventSearchLink.innerHTML = "Search In Google";
  eventSearch.appendChild(eventSearchLink);

  eventsDiv.appendChild(eventName);
  eventsDiv.appendChild(eventDes);
  document.getElementById("popupEvent").appendChild(eventSearch);
}
