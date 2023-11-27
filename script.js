let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const calendar = document.getElementById('calendar');
const monthTaskList = document.getElementById('eventList');
const deleteList = document.getElementById('eventText');
const dayTaskList = document.getElementById('dayList');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput');
const month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function openModal(date) {
  
  const dateArray = clicked.split("/");
  const clickedDay = dateArray[1];
  const clickedMonth = dateArray[0];
  const clickedYear = dateArray[2];
  
  const curDate = new Date();
  const curDay = curDate.getDate();
  const curMonth = curDate.getMonth() + 1;
  const curYear = curDate.getFullYear();
  
  while(dayTaskList.childElementCount != 0){
		dayTaskList.removeChild(dayTaskList.firstElementChild);
  }
  while(monthTaskList.childElementCount != 0){
		monthTaskList.removeChild(monthTaskList.firstElementChild);
  }
  document.getElementById('rightContainer').style.display = "none";
  document.getElementById('dayTaskContainer').style.display = 'block';
  document.getElementById('taskDayMonth').innerText = month_names[dateArray[0]-1];
  document.getElementById('dayDate').innerText = dateArray[1];
  
  const eventForDay = events.find(e => e.date === clicked);		
  
  newEventModal.style.display = 'block';

  let j = 0;
  while(j < events.length)
  {
	if(events[j].date == clicked)
	{
		let node = document.createElement("li");
		let task = events[j].title;
		let textnode = document.createTextNode(task);
				  
	    node.appendChild(textnode);
		if(clickedDay < curDay && clickedMonth <= curMonth && clickedYear <= curYear) {
			dayTaskList.appendChild(node).style.textDecoration = "line-through";	
		}
	    else{
			dayTaskList.appendChild(node);
		}
	}
	j++;
  }
  backDrop.style.display = 'block';
}

function dayView(date) {
  clicked = date;
  const dateArray = clicked.split("/");
  const clickedDay = dateArray[1];
  const clickedMonth = dateArray[0];
  const clickedYear = dateArray[2];
  
  const curDate = new Date();
  const curDay = curDate.getDate();
  const curMonth = curDate.getMonth() + 1;
  const curYear = curDate.getFullYear();
  
  while(dayTaskList.childElementCount != 0){
		dayTaskList.removeChild(dayTaskList.firstElementChild);
  }
  while(monthTaskList.childElementCount != 0){
		monthTaskList.removeChild(monthTaskList.firstElementChild);
  }
  
  document.getElementById('delDate').innerText = month_names[dateArray[0]-1] + ' ' + clickedDay;
  document.getElementById('rightContainer').style.display = "none";
  document.getElementById('dayTaskContainer').style.display = 'block';
  document.getElementById('taskDayMonth').innerText = month_names[dateArray[0]-1];
  document.getElementById('dayDate').innerText = dateArray[1];
  
  
  let j = 0;
  while(j < events.length)
  {
	if(events[j].date == clicked)
	{
		let node = document.createElement("li");
		let task = events[j].title;
		let textnode = document.createTextNode(task);
				  
	    node.appendChild(textnode);
		if(clickedDay < curDay && clickedMonth <= curMonth && clickedYear <= curYear) {
			dayTaskList.appendChild(node).style.textDecoration = "line-through";
		}
	    else{
			dayTaskList.appendChild(node);
		}
		
	}
	j++;
  }
}

function load() {

  const dt = new Date();

  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

  document.getElementById('monthDisplay').innerText = 
    `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`;
	
  let currMonth = document.getElementById('taskMonth').innerText = 
    `${dt.toLocaleDateString('en-us', { month: 'long' })}`;

  calendar.innerHTML = '';

  for(let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement('div');
    daySquare.classList.add('day');

    const dayString = `${month + 1}/${i - paddingDays}/${year}`;
	
	let currDay = i - paddingDays; 
    if (i > paddingDays) {
      daySquare.innerText = i - paddingDays;
      const eventForDay = events.find(e => e.date === dayString);

      if (i - paddingDays === day && nav === 0) {
        daySquare.id = 'currentDay';
      }


      daySquare.addEventListener('click', () => dayView(dayString));
	  document.getElementById('addButton').addEventListener('click', () => openModal(clicked));
	  
	  if (eventForDay) {  
		
        const eventDiv = document.createElement('div');
		
        eventDiv.classList.add('event');
        eventDiv.innerText = eventForDay.title;
		eventDiv.value = 0;
        daySquare.appendChild(eventDiv);
      }
    } else {
      daySquare.classList.add('padding');
    }
	
	
	let count = 0;
	if(daySquare.childElementCount != 0) {
		for(let j = 0; j < events.length;  j++) {
			if(events[j].date == dayString) {
				let node = document.createElement("li");
				count++;
				let task = events[j].title;
				let textnode = document.createTextNode(currDay + ' - ' + task);
				
				node.appendChild(textnode);
				if( currDay < day) {
					monthTaskList.appendChild(node).style.textDecoration = "line-through";
				}
				else{
					monthTaskList.appendChild(node);
				}
			}
			
		}
		daySquare.children[0].innerText = count;
	}
	
    calendar.appendChild(daySquare);    
  }
  	
}

	document.getElementById('monthButton').onclick = () => {
	document.getElementById('rightContainer').style.display = "block";
	document.getElementById('dayTaskContainer').style.display = "none";
	
	while(monthTaskList.childElementCount != 0){
		monthTaskList.removeChild(monthTaskList.firstElementChild);
    }
    while(dayTaskList.childElementCount != 0){
		dayTaskList.removeChild(dayTaskList.firstElementChild);
    }
	load();
}

function editModal() {

  const eventForDay = events.find(e => e.date === clicked);
  const dateArray = clicked.split("/");
  const clickedDay = dateArray[1];
  const clickedMonth = dateArray[0];
  const clickedYear = dateArray[2];
  
  const curDate = new Date();
  const curDay = curDate.getDate();
  const curMonth = curDate.getMonth() + 1;
  const curYear = curDate.getFullYear();

 
	  
	while(dayTaskList.childElementCount != 0){
		dayTaskList.removeChild(dayTaskList.firstElementChild);
	}
	while(monthTaskList.childElementCount != 0){
		monthTaskList.removeChild(monthTaskList.firstElementChild);
	}
	while(deleteList.length != 0){
		deleteList.remove(0);
	}
  
	if(eventForDay) {
		for(let j = 0; j < events.length;  j++) {
			if(events[j].date == clicked) {
				let option = document.createElement("option");
				option.text = events[j].title;
				deleteList.add(option);
				
				
			}
		}
		deleteEventModal.style.display = 'block';
	}
	
  let j = 0;
  while(j < events.length)
  {
	if(events[j].date == clicked)
	{
		let node = document.createElement("li");
		let task = events[j].title;
		let textnode = document.createTextNode(task);
				  
	    node.appendChild(textnode);
		if(clickedDay < curDay && clickedMonth <= curMonth && clickedYear <= curYear) {
			dayTaskList.appendChild(node).style.textDecoration = "line-through";	
		}
	    else{
			dayTaskList.appendChild(node);
		}
	}
	j++;
  }
  backDrop.style.display = 'block';
   if(eventForDay == null) {
	  closeModal();
  }
}

function closeModal() {
  eventTitleInput.classList.remove('error');
  newEventModal.style.display = 'none';
  deleteEventModal.style.display = 'none';
  backDrop.style.display = 'none';
  eventTitleInput.value = '';
  
  const eventForDay = events.find(e => e.date === clicked);
  const dateArray = clicked.split("/");
  const clickedDay = dateArray[1];
  const clickedMonth = dateArray[0];
  const clickedYear = dateArray[2];
  
  const curDate = new Date();
  const curDay = curDate.getDate();
  const curMonth = curDate.getMonth() + 1;
  const curYear = curDate.getFullYear();
  
  while(monthTaskList.childElementCount != 0){
		monthTaskList.removeChild(monthTaskList.firstElementChild);
  }
  while(dayTaskList.childElementCount != 0){
		dayTaskList.removeChild(dayTaskList.firstElementChild);
  }
  
  
  let j = 0;
  while(j < events.length)
  {
	if(events[j].date == clicked)
	{
		let node = document.createElement("li");
		let task = events[j].title;
		let textnode = document.createTextNode(task);
				  
	    node.appendChild(textnode);
		if(clickedDay < curDay && clickedMonth <= curMonth && clickedYear <= curYear) {
			dayTaskList.appendChild(node).style.textDecoration = "line-through";
		}
	    else{
			dayTaskList.appendChild(node);
		}
		
	}
	j++;
  }
  load();
}

function saveEvent() {
	
  const dateArray = clicked.split("/");
  const clickedDay = dateArray[1];
  const clickedMonth = dateArray[0];
  const clickedYear = dateArray[2];
  
  const curDate = new Date();
  const curDay = curDate.getDate();
  const curMonth = curDate.getMonth() + 1;
  const curYear = curDate.getFullYear();
  
  if (eventTitleInput.value) {
    eventTitleInput.classList.remove('error');

    events.push({
      date: clicked,
      title: eventTitleInput.value,
	  
    });

    localStorage.setItem('events', JSON.stringify(events));
    closeModal();
  } else {
    eventTitleInput.classList.add('error');
  }
  
  while(monthTaskList.childElementCount != 0){
		monthTaskList.removeChild(monthTaskList.firstElementChild);
  }
  while(dayTaskList.childElementCount != 0){
		dayTaskList.removeChild(dayTaskList.firstElementChild);
  }
  
  let j = 0;
  while(j < events.length)
  {
	if(events[j].date == clicked)
	{
		let node = document.createElement("li");
		let task = events[j].title;
		let textnode = document.createTextNode(task);
				  
	    node.appendChild(textnode);
		if(clickedDay < curDay && clickedMonth <= curMonth && clickedYear <= curYear) {
			dayTaskList.appendChild(node).style.textDecoration = "line-through";
		}
	    else{
			dayTaskList.appendChild(node);
		}
	}
	j++;
  }
  
}

function deleteEvent() {
  var userPreference;
  let choice = deleteList.value;
  
  if(confirm("Do you want to delete the task: " + choice + "?") == true) {
    events = events.filter(e => e.date != clicked || e.title != choice);
    localStorage.setItem('events', JSON.stringify(events));
  
    while(monthTaskList.childElementCount != 0){
		monthTaskList.removeChild(monthTaskList.firstElementChild);
    }
    while(dayTaskList.childElementCount != 0){
		dayTaskList.removeChild(dayTaskList.firstElementChild);
    }
    closeModal();
  }
  else {
	 editModal();
  }
}



function deleteAllEvent() {

  var userPreference;
  
  if(confirm("Do you want to delete all of today's tasks?") == true) {
    events = events.filter(e => e.date !== clicked);
    localStorage.setItem('events', JSON.stringify(events));
  
    while(monthTaskList.childElementCount != 0){
		monthTaskList.removeChild(monthTaskList.firstElementChild);
    }
    while(dayTaskList.childElementCount != 0){
		dayTaskList.removeChild(dayTaskList.firstElementChild);
    }
	closeModal();
  }
  else {
	editModal();
  }
}

function initButtons() {
  document.getElementById('nextMonth').addEventListener('click', () => {
    nav++;
	while(monthTaskList.childElementCount != 0){
		monthTaskList.removeChild(monthTaskList.firstElementChild);
	}
	while(dayTaskList.childElementCount != 0){
		dayTaskList.removeChild(dayTaskList.firstElementChild);
	}
    load();
  });

  document.getElementById('prevMonth').addEventListener('click', () => {
    nav--;
	while(monthTaskList.childElementCount != 0){
		monthTaskList.removeChild(monthTaskList.firstElementChild);
	}
	while(dayTaskList.childElementCount != 0){
		dayTaskList.removeChild(dayTaskList.firstElementChild);
	}
    load();
  });
  
  document.getElementById('deleteAllButton').addEventListener('click', deleteAllEvent);
  document.getElementById('editButton').addEventListener('click', editModal);
  document.getElementById('saveButton').addEventListener('click', saveEvent);
  document.getElementById('cancelButton').addEventListener('click', closeModal);
  document.getElementById('deleteButton').addEventListener('click', deleteEvent);
  document.getElementById('closeButton').addEventListener('click', closeModal);
}

let dark_mode_toggle = document.querySelector('.dark-mode-switch')

dark_mode_toggle.onclick = () => {
    document.querySelector('body').classList.toggle('light')
    document.querySelector('body').classList.toggle('dark')
}

initButtons();
load();