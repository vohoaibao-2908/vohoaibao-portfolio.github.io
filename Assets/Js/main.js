const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const navMenu = $("#nav-menu"),
  navToggle = $("#nav-toggle"),
  navClose = $("#nav-close");

/* ================ Menu show============*/
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show_menu");
  });
}
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show_menu");
  });
}

/* ================REMOVE MENU MOBILE================= */
const navLink = $$(".nav_link");
function linkAction() {
  navMenu.classList.remove("show_menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));
/* ================ACCORDION SKILLS================= */
const skillsContent = $$(".skills_content"),
  skillsHeader = $$(".skills_header");
function toggleSkills() {
  let itemClass = this.parentNode.className;

  // close all task was open
  for (i = 0; i < skillsContent.length; i++) {
    skillsContent[i].className = "skills_content skills_close";
  }

  //open task are click
  if (itemClass === "skills_content skills_close") {
    this.parentNode.className = "skills_content skills_open";
  }
}

skillsHeader.forEach((el) => {
  el.addEventListener("click", toggleSkills);
});

/* ================QUALIFICATION TABS================= */

const tabs = $$("[data-target]"), //Title - (education , work)
  tabContents = $$("[data-content]"); //content (cyber soft , while palace)

tabs.forEach((tab) => {
  //Khi click
  tab.addEventListener("click", () => {
    // tab.dataset.target => html data-target chỉ đến địa chỉ id , lấy thẻ đó
    const target = $(tab.dataset.target); // ở đây thẻ id : education và work

    //xóa class qualification_active ở tất cả các thẻ content
    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("qualification_active");
    });
    //thêm class qualification_active ở thẻ được click
    target.classList.add("qualification_active");

    //xóa class qualification_active ở thẻ tabs()
    tabs.forEach((tab) => {
      tab.classList.remove("qualification_active");
    });

    //thêm class qualification_active vào thẻ tabs(Education . work)
    tab.classList.add("qualification_active");
  });
});

/* ================SERVICES MODAL================= */

const modalViews = $$(".services_modal"),
  modalBtns = $$(".services_button"),
  modalCloses = $$(".services_modal-close");

let modal = function (modalClick) {
  modalViews[modalClick].classList.add("active-modal");
};

modalBtns.forEach((modalBtn, i) => {
  //i = index
  modalBtn.addEventListener("click", () => {
    modal(i);
  });
});

modalCloses.forEach((modalClose) => {
  modalClose.addEventListener("click", () => {
    modalViews.forEach((modalView) => {
      modalView.classList.remove("active-modal");
    });
  });
});
/* ================PORTFOLIO SWIPER================= */
let swiper = new Swiper(".portfolio_container", {
  cssMode: true,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  // mousewheel: true,
  // keyboard: true,
});
/* ================TESTIMONTIAL================= */

/*             SCROLL SECTIONS ACTIVE LINK        */
const sections = $$("section[id]");
function scrollActive() {
  const scrollY = window.pageYOffset;
  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      $(".nav_menu a[href*=" + sectionId + "]").classList.add("active-link");
    } else {
      $(".nav_menu a[href*=" + sectionId + "]").classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);
/* ================= Change background header =============== */

function scrollHeader() {
  const nav = document.getElementById("header");
  if (this.scrollY >= 80) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/** SCROLL TO TOP */

function scrollTop() {
  const scrollTop = $("#scroll-up");
console.log(this.scrollY);
  if (this.scrollY >= 560) scrollTop.classList.add("show-scroll");
  else scrollTop.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollTop);

/** ====================== Dark lignt theme ===================*/

const themeButton = $("#theme-button");
const darkTheme = "dark-theme";
const iconTheme = "fa-sun";
console.log(themeButton + darkTheme + iconTheme);
//Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "fa-moon" : "fa-sun";

//We validate if the user previously chose a topic
if (selectedTheme) {
  //if the validation is fulfilled we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "fa-moon" ? "add" : "remove"](
    iconTheme
  );
}

//Active.deactive the theme manually with the button
themeButton.addEventListener("click", () => {
  //add and remove the dark / icon theme

  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  //We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});
