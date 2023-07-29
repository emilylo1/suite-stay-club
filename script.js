const buttons = document.querySelectorAll("[data-carousel-button]")

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const offset = button.dataset.carouselButton === "next" ? 1 : -1
    const slides = button
      .closest("[data-carousel]")
      .querySelector("[data-slides]")

    const activeSlide = slides.querySelector("[data-active]")
    let newIndex = [...slides.children].indexOf(activeSlide) + offset
    if (newIndex < 0) newIndex = slides.children.length - 1
    if (newIndex >= slides.children.length) newIndex = 0

    slides.children[newIndex].dataset.active = true
    delete activeSlide.dataset.active
  })
})

// Calendar

const date = new Date();

const renderCalendar = () => {
  date.setDate(1);

  const monthDays = document.querySelector(".days");

  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();

  const firstDayIndex = date.getDay();

  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  const nextDays = 7 - lastDayIndex - 1;

  const months = [
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

  document.querySelector(".date h1").innerHTML = months[date.getMonth()];

  document.querySelector(".date p").innerHTML = new Date().toDateString();

  let days = "";

  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth()
    ) {
      days += `<div class="today">${i}</div>`;
    } else {
      days += `<div>${i}</div>`;
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date">${j}</div>`;
    monthDays.innerHTML = days;
  }
};

document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

renderCalendar();

// For the restaurants and activities image slider

const carousel = document.querySelector(".slider");
const arrowBtns = document.querySelectorAll(".wrapper i");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const carouselChildrens = [...carousel.children];

let isDragging = false, startX, startScrollLeft;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Inserts copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
  carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Inserts copies of the last few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
  carousel.insertAdjacentHTML("beforeEnd", card.outerHTML);
});

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
  })
})

const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  // Records the initial cursor and scroll position of the carousel
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
  if(!isDragging) return; // if isDragging is false return from here
  // Updates the scroll position of the carousel based on the cursor movement
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
  // If the carousel is at the beginning, scroll to the end
  if(carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - ( 2 * carousel.offsetWidth);
    carousel.classList.remove("no-transition");
  } 
  // If the carousel is at the end, scroll to the beginning
  else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth){
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }
}
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);

//Second carousel

const carousel2 = document.querySelector(".slider2");
const arrowBtns2 = document.querySelectorAll(".wrapper2 i");
const firstCardWidth2 = carousel2.querySelector(".card2").offsetWidth;
const carouselChildrens2 = [...carousel2.children];

let isDragging2 = false, startX2, startScrollLeft2;

// Get the number of cards that can fit in the carousel at once
let cardPerView2 = Math.round(carousel2.offsetWidth / firstCardWidth2);

// Inserts copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens2.slice(-cardPerView2).reverse().forEach(card => {
  carousel2.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Inserts copies of the last few cards to end of carousel for infinite scrolling
carouselChildrens2.slice(0, cardPerView2).forEach(card => {
  carousel2.insertAdjacentHTML("beforeEnd", card.outerHTML);
});

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns2.forEach(btn => {
  btn.addEventListener("click", () => {
    carousel2.scrollLeft += btn.id === "left" ? -firstCardWidth2 : firstCardWidth2;
  })
})

const dragStart2 = (e) => {
  isDragging = true;
  carousel2.classList.add("dragging2");
  // Records the initial cursor and scroll position of the carousel
  startX2 = e.pageX;
  startScrollLeft2 = carousel2.scrollLeft;
}

const dragging2 = (e) => {
  if(!isDragging) return; // if isDragging is false return from here
  // Updates the scroll position of the carousel based on the cursor movement
  carousel2.scrollLeft = startScrollLeft2 - (e.pageX - startX2);
}

const dragStop2 = () => {
  isDragging = false;
  carousel2.classList.remove("dragging2");
}

const infiniteScroll2 = () => {
  // If the carousel is at the beginning, scroll to the end
  if(carousel2.scrollLeft === 0) {
    carousel2.classList.add("no-transition2");
    carousel2.scrollLeft = carousel2.scrollWidth - ( 2 * carousel2.offsetWidth);
    carousel2.classList.remove("no-transition2");
  } 
  // If the carousel is at the end, scroll to the beginning
  else if(Math.ceil(carousel2.scrollLeft) === carousel2.scrollWidth - carousel2.offsetWidth){
    carousel2.classList.add("no-transition2");
    carousel2.scrollLeft = carousel.offsetWidth;
    carousel2.classList.remove("no-transition2");
  }
}
carousel2.addEventListener("mousedown", dragStart2);
carousel2.addEventListener("mousemove", dragging2);
document.addEventListener("mouseup", dragStop2);
carousel2.addEventListener("scroll", infiniteScroll2);
