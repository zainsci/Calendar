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

showEvents();
