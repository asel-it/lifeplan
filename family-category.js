// Update time and date
function updateTimeAndDate() {
  const now = new Date();
  const day = now.getDate().toString().padStart(2, '0');
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const year = now.getFullYear();
  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = (hours % 12 || 12).toString().padStart(2, '0');
  document.getElementById('date').textContent = `${day}.${month}.${year}`;
  document.getElementById('time').textContent = `${displayHours}:${minutes}:${seconds} ${ampm}`;
}
setInterval(updateTimeAndDate, 1000);

 // Menu toggle functionality
 const menuIcon = document.getElementById("menu-icon");
 const sideMenu = document.getElementById("side-menu");
 const content = document.getElementById("content");
 menuIcon.addEventListener("click", function () {
     sideMenu.classList.toggle("open");
     content.classList.toggle("menu-open");
 });


 function scrollCarousel(carouselId, direction) {
  const carousel = document.getElementById(carouselId);
  const itemWidth = carousel.querySelector('.carousel-item').offsetWidth;


  carousel.scrollBy({
      left: direction * itemWidth,
      behavior: 'smooth'
  });


  // Для бесконечной прокрутки
  if (direction === 1) {
      setTimeout(() => {
          carousel.appendChild(carousel.firstElementChild);
      }, 300);
  } else {
      setTimeout(() => {
          carousel.insertBefore(carousel.lastElementChild, carousel.firstElementChild);
      }, 300);
  }
}
