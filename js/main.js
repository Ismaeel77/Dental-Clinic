// Control Setting Box
let settingBox = document.querySelector(".setting-box");
let setIcon = document.querySelector(".setting-box .set-box i.fa-gear");

setIcon.onclick = function () {
  settingBox.classList.toggle("opened");
  this.classList.toggle("fa-spin");
};

// Check If There's Colors In Local Storage
let mainColors = localStorage.getItem("colors-option");
// If There's a Color In Local Storage Set This Color
if (mainColors !== null) {
  document.documentElement.style.setProperty("--main-color", mainColors);

  // Remove Class Active From All Elements
  document.querySelectorAll(".colors-list li").forEach((ele) => {
    ele.classList.remove("active");
    if (ele.dataset.color === mainColors) {
      // Add Class Active To Clicked Element
      ele.classList.add("active");
    }
  });
}

// Switch Colors
let colorsLis = document.querySelectorAll(".colors-list li");
colorsLis.forEach((li) => {
  li.addEventListener("click", (e) => {
    // Set Main Color To The Clicked Item
    document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
    // Add Color To Local Storage
    localStorage.setItem("colors-option", e.target.dataset.color);
    // Remove Class Active From All Elements
    handleActive(e);
  });
});

let bgOption = true;

let bgInterval;

// Check If There's bg Item In Local Storage
let bgLocalStorage = localStorage.getItem("bg-option");

if (bgLocalStorage !== null) {
  if (bgLocalStorage === "true") {
    bgOption = true;
  } else {
    bgOption = false;
  }

  // Remove All Active Classes From All Spans
  document.querySelectorAll(".random-bg span").forEach((ele) => {
    ele.classList.remove("active");
  });

  if (bgLocalStorage === "true") {
    document.querySelector(".random-bg .btns .yes").classList.add("active");
  } else {
    document.querySelector(".random-bg .btns .no").classList.add("active");
  }
}

// Switch Random BackGrounds
let bgElements = document.querySelectorAll(".random-bg span");
bgElements.forEach((span) => {
  span.addEventListener("click", (e) => {
    // Remove Class Active From All Elements
    handleActive(e);

    if (e.target.dataset.bg === "yes") {
      bgOption = true;

      randomizeBG();

      localStorage.setItem("bg-option", true);
    } else {
      bgOption = false;

      clearInterval(bgInterval);

      localStorage.setItem("bg-option", false);
    }
  });
});
// Select Landing Page Elements
let landingPage = document.querySelector(".landing-page");
// Get Array Of Images
let imgsArray = ["bg1.jpg", "bg2.jpg", "bg3.jpg", "bg4.jpg", "bg5.jpg"];

let duration = 6000;

// Function To Randomize Background Images
function randomizeBG() {
  if (bgOption == true) {
    bgInterval = setInterval(() => {
      // Get Random Number
      let randomNumber = Math.floor(Math.random() * imgsArray.length);

      // Change Background Image URL
      landingPage.style.backgroundImage =
        'url("imgs/' + imgsArray[randomNumber] + '")';
    }, duration);
  }
}

randomizeBG();

// Animate Progress In Trophies Section
let serviceSection = document.querySelector(".services");
let serviceSpan = document.querySelectorAll(".service-box .service-prog span");

window.onscroll = function () {
  if (window.scrollY >= serviceSection.offsetTop) {
    serviceSpan.forEach((span) => {
      span.style.width = span.dataset.width;
    });
  }
};

// Create Popup Image
let ourTeam = document.querySelectorAll(".our-team img");

ourTeam.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Create Popup Overlay
    let overlay = document.createElement("div");
    // Add Class To Overlay
    overlay.classList.add("popup-overlay");
    // Append Overlay To Body
    document.body.appendChild(overlay);

    // Create Popup Box In Overlay
    let popupBox = document.createElement("div");
    // Add Class To Popup Box
    popupBox.classList.add("popup-box");
    if (img.alt !== null) {
      // Create H3 Element
      let heading = document.createElement("h3");

      let headingText = document.createTextNode(img.alt);

      heading.appendChild(headingText);

      popupBox.appendChild(heading);
    }

    // Create Img
    let popupImg = document.createElement("img");
    // Set Image Src
    popupImg.src = img.src;

    popupBox.appendChild(popupImg);

    document.body.appendChild(popupBox);

    // Create Close Button
    let closeBtn = document.createElement("span");

    let closeBtnText = document.createTextNode("X");

    closeBtn.appendChild(closeBtnText);

    // Add Class To Span
    closeBtn.classList.add("close-btn");

    popupBox.appendChild(closeBtn);

    // Add Event Click On Span To Close

    closeBtn.onclick = function () {
      popupBox.remove();
      overlay.remove();
    };
  });
});

// Select All Bullets
const navBullets = document.querySelectorAll(".nav-bullets .bullet");

// Select All Links
const sectionLinks = document.querySelectorAll(".links a");

function scrollToSection(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();

      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

scrollToSection(navBullets);
scrollToSection(sectionLinks);

// Handle Active State
function handleActive(event) {
  event.target.parentElement.querySelectorAll(".active").forEach((ele) => {
    ele.classList.remove("active");
  });

  // Add Class Active To Clicked Element
  event.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullets span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletsLocalItem = localStorage.getItem("bullets-option");

if (bulletsLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });

  if (bulletsLocalItem === "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets .btns .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets .btns .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "block") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets-option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets-option", "none");
    }

    handleActive(e);
  });
});

// Reset Options
document.querySelector(".reset-options").onclick = function () {
  // localStorage.clear() ====> Remove All Data In LocalStorage If There Is Important Data Will Remove It For This Don't Use It In All Times
  localStorage.removeItem("colors-option");
  localStorage.removeItem("bg-option");
  localStorage.removeItem("bullets-option");

  window.location.reload();
};

// Toggle Menu
let toggleBtn = document.querySelector(".toggle-menu");
let toggleLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
  e.stopPropagation();

  this.classList.toggle("menu-active");

  toggleLinks.classList.toggle("open");
};

document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== toggleLinks) {
    if (toggleLinks.classList.contains("open")) {
      toggleBtn.classList.toggle("menu-active");

      toggleLinks.classList.toggle("open");
    }
  }
});

// Stop Propagation On Lis
toggleLinks.onclick = function (e) {
  e.stopPropagation();
};