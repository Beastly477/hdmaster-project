const usMap = document.getElementById('usMap');
let activeDropdown = null;

// State category objects
const stateCategories = {
  "Alabama": [],
  "Alaska": [],
  "Arizona": ["Arizona CNA", "Arizona CMA", "Assisted Living Caregiver", "Assisted Living Manager"],
  "Arkansas": ["Arkansas CNA", "Arkansas MA-C"],
  "Colorado": [],
  "Connecticut": [],
  "California": ["California CNA"],
  "Delaware": [],
  "Florida": [],
  "Georgia": [],
  "Hawaii": [],
  "Idaho": ["Idaho MA-C", "Idaho Facility Administrator", "Idaho AL Fac Admin"],
  "Illinois": [],
  "Indiana": [],
  "Iowa": ["Direct Care Professionals", "On-line Testing"],
  "Kansas": [],
  "Kentucky": ["Kentucky SRNA"],
  "Louisiana": [],
  "Maine": [],
  "Maryland": [],
  "Massachusetts": ["Massachusetts CNA", "Massachusetts MAP Testing & Registry"],
  "Michigan": ["Michigan CNA"],
  "Minnesota": ["Minnesota CNA"],
  "Mississippi": [],
  "Missouri": ["Missouri CNA"],
  "Montana": ["<a href='testing/cnatesting/montana/MT_CNA_Home.html' target='_blank'>Montana CNA</a>", "<a href='testing/othertesting/montana cma/MT_CMA_Home.html' target='_blank'>Montana MA I & II</a>"],
  "Nebraska": [],
  "Nevada": [],
  "New Hampshire": [],
  "New Jersey": ["New Jersey CNA Skills", "New Jersey CNA On-line Testing"],
  "New Mexico": [],
  "New York": [],
  "North Carolina": [],
  "North Dakota": ["North Dakota CNA", "North Dakota On-line Testing"],
  "Ohio": ["Ohio STNA", "Ohio MA-C", "Ohio Lead", "General X-Ray Machine Operator", "Ohio DSW On-line Testing", "Ohio Lead On-line Testing"],
  "Oklahoma": ["Oklahoma LTC / HHA (Deeming)", "Oklahoma MA", "Oklahoma Insulin On-line Testing", "Oklahoma Med Aide On-line Testing", "Oklahoma LTC - HHS On-line Testing"],
  "Oregon": ["Oregon CNA", "Oregon CMA"],
  "Pennsylvania": [],
  "Rhode Island": [],
  "South Carolina": [],
  "South Dakota": ["South Dakota CNA"],
  "Tennessee": ["Tennessee CNA", "Tennessee MA-C", "Tennessee On-line Testing"],
  "Texas": [],
  "Utah": ["<a href='https://utahcnaregistry.com/' target='_blank'>Utah CNA</a>"],
  "Vermont": [],
  "Virginia": [],
  "Washington": [],
  "West Virginia": [],
  "Wisconsin": ["Wisconsin CNA"],
  "Wyoming": ["Wyoming CNA"]
  //"District of Columbia": [""]
};

// Function to create state-specific dropdowns dynamically
function createDropdowns() {
  Object.keys(stateCategories).forEach(stateName => {
    const statePath = usMap.querySelector(`[data-state="${stateName}"]`);
    const categories = stateCategories[stateName];

    if (statePath === null) {
      console.error(`No path found for state: ${stateName}`);
      return;
    }

    const stateDropdown = document.createElement('ul');
    stateDropdown.className = 'state-dropdown';
    stateDropdown.innerHTML = categories.map(category => `<li><a href="#">${category}</a></li>`).join('');

    // Set the position of the dropdown
const bbox = statePath.getBBox();
const matrix = statePath.getScreenCTM();
const pt = usMap.createSVGPoint();
pt.x = bbox.x + bbox.width / 2;
pt.y = bbox.y + bbox.height / 2;
const svgP = pt.matrixTransform(matrix);

// Temporarily show the dropdown to calculate its height
stateDropdown.style.display = 'block';
const dropdownHeight = stateDropdown.offsetHeight;

// Adjust the top property by the height of the dropdown
stateDropdown.style.top = `${svgP.y - dropdownHeight}px`;
stateDropdown.style.left = `${svgP.x}px`;

// Hide the dropdown again
stateDropdown.style.display = 'none';

    // Append the stateDropdown to the body
    document.body.appendChild(stateDropdown);

    document.addEventListener('DOMContentLoaded', (event) => {
      // Select the .state-dropdown element
      var dropdown = document.querySelector('.state-dropdown');

      // Create a new div element
      var tail = document.createElement('div');

      // Add the 'tail' class to the new div
      tail.className = 'tail';

      // Append the new div to the .state-dropdown
      dropdown.appendChild(tail);
    });

    // Hide dropdowns initially
    stateDropdown.style.display = 'none';

    // Append the dropdown to the #svg-container
    document.getElementById('svg-container').appendChild(stateDropdown);

    // Add event listeners to the stateDropdown
    stateDropdown.addEventListener('mouseover', function () {
      usMap.classList.add('hover');
    });

    stateDropdown.addEventListener('mouseout', function () {
      usMap.classList.remove('hover');
    });

    // Click event to show/hide dropdown on state click
    statePath.addEventListener('click', event => {
    if (statePath.classList.contains('state-served')) {
    // Temporarily show the dropdown to calculate its width
    stateDropdown.style.display = 'block';

    // Set the position of the dropdown
    stateDropdown.style.left = `${event.clientX}px`;
    stateDropdown.style.top = `${event.clientY}px`;

    // Check if the dropdown would extend past the right edge of the svg-container
    const dropdownRect = stateDropdown.getBoundingClientRect();
    const svgContainerRect = document.getElementById('svg-container').getBoundingClientRect();
    if (dropdownRect.right > svgContainerRect.right) {
      // If it would, adjust the left position of the dropdown
      const overflow = dropdownRect.right - svgContainerRect.right;
      stateDropdown.style.left = `${event.clientX - overflow}px`;
    }

    // Hide the dropdown again
    stateDropdown.style.display = 'none';

        if (stateDropdown.style.display === 'block') {
          stateDropdown.style.display = 'none';
        } else {
          if (activeDropdown) {
            activeDropdown.style.display = 'none';
          }
          stateDropdown.style.display = 'block';
          activeDropdown = stateDropdown;
        }
        event.stopPropagation(); // Prevent bubbling if needed
      }
    });

    // Click event for <text> element inside the <svg>
    const stateText = statePath.nextElementSibling;
    if (stateText && stateText.tagName.toLowerCase() === 'text') {
      stateText.addEventListener('click', event => {
        const clickEvent = new MouseEvent('click', {
          clientX: event.clientX,
          clientY: event.clientY
        });
        statePath.dispatchEvent(clickEvent);  // Trigger click event on statePath
        event.stopPropagation();
      });
    }
  });
}

function hideDropdown(dropdown) {
  dropdown = dropdown || activeDropdown;
  if (dropdown) {
    dropdown.style.display = 'none';
  }
}

// Add click event listener to the document body
document.body.addEventListener('click', (event) => {
  // Check if the clicked element is a state
  if (event.target.closest('.state') || event.target.closest('.state-served')) {
    // If it's a state but does not have the .state-served class, hide the dropdown
    if (!event.target.classList.contains('state-served')) {
      hideDropdown(activeDropdown);
      activeDropdown = null;
    }
  }
  // If it's not a state, state-served or the dropdown, hide the dropdown
  else if (!event.target.closest('.state-dropdown')) {
    hideDropdown(activeDropdown);
    activeDropdown = null;
  }
});

// Get all navigation links
const navLinks = document.querySelectorAll('nav a');

// Add mouseover event listener to each navigation link
navLinks.forEach(link => {
  link.addEventListener('mouseover', () => {
    if (activeDropdown) {
      hideDropdown();
    }
  });
});

// Add scroll event listener to the window
window.addEventListener('scroll', () => {
  if (activeDropdown) {
    hideDropdown();
  }
});

// Get all .state-served elements
const stateServedElements = document.querySelectorAll('.state-served');

// Add mouseover and mouseout event listeners to each .state-served element
stateServedElements.forEach(stateServedElement => {
  stateServedElement.addEventListener('mouseover', function() {
    // On mouseover, find the corresponding .state-served-text element and change its fill color
    const stateId = this.getAttribute('data-state-id');
    const stateServedTextElement = document.querySelector(`.state-served-text[data-state-id="${stateId}"]`);
    if (stateServedTextElement) {
      stateServedTextElement.style.fill = '#FFDAB9';
    }
  });

  stateServedElement.addEventListener('mouseout', function() {
    // On mouseout, find the corresponding .state-served-text element and reset its fill color
    const stateId = this.getAttribute('data-state-id');
    const stateServedTextElement = document.querySelector(`.state-served-text[data-state-id="${stateId}"]`);
    if (stateServedTextElement) {
      stateServedTextElement.style.fill = '';
    }
  });
});





//Menu Toggle
document.addEventListener('DOMContentLoaded', (event) => {
  const menuButton = document.querySelector('#menuButton');

  function showSideMenu() {
    let sideMenu = document.querySelector('.sideMenu');
    let menuOptions = document.querySelector('#menu-options');
    let menuOptionItems = document.querySelectorAll('.menu-option');

    if (sideMenu.style.display === "none" || sideMenu.style.display === "") {
        sideMenu.style.display = "flex";
        menuOptions.style.display = "flex";
        menuOptionItems.forEach(function(item) {
          item.style.display = 'block';
        });
    } else {
        sideMenu.style.display = "none";
        menuOptions.style.display = "none";
        menuOptionItems.forEach(function(item) {
          item.style.display = 'none';
        });
    }
  }

  menuButton.addEventListener('click', function(event) {
    event.stopPropagation(); // Stop propagation of the click event
    showSideMenu();
  });

  function closeSideMenu() {
    let sideMenu = document.querySelector('.sideMenu');
    let menuOptions = document.querySelector('#menu-options');
    let menuOptionItems = document.querySelectorAll('.menu-option');

    sideMenu.style.display = "none";
    menuOptions.style.display = "none";
    menuOptionItems.forEach(function(item) {
      item.style.display = 'none';
    });
  }

  const closeMenuButton = document.querySelector('.closeMenu');
  closeMenuButton.addEventListener('click', closeSideMenu);

  // Add event listener to the document
  document.addEventListener('click', function(event) {
    let sideMenu = document.querySelector('.sideMenu');
    // Check if the click is outside the sideMenu
    if (!sideMenu.contains(event.target) && sideMenu.style.display === "flex") {
      // Hide the sideMenu
      closeSideMenu();
    }
  });

  // Add event listener to the sidebar to stop propagation
  let sideMenu = document.querySelector('.sideMenu');
  sideMenu.addEventListener('click', function(event) {
    // Stop propagation of the click event
    event.stopPropagation();
  });

  // Add click event listener to .menu-option elements
  const menuOptions = document.querySelectorAll('.menu-option');

  menuOptions.forEach((menuOption) => {
    menuOption.addEventListener('click', function(event) {
      event.stopPropagation(); // Prevent the click event from bubbling up
      const sideSubmenu = this.querySelector('.side-submenu'); // Get the .side-submenu
  
      // Check if the .side-submenu exists
      if (sideSubmenu) {
        // Toggle the display of the .side-submenu
        if (sideSubmenu.style.display === 'none' || sideSubmenu.style.display === '') {
          sideSubmenu.style.display = 'block';
        } else {
          sideSubmenu.style.display = 'none';
        }
      }
    });
  });
});
//End Menu Toggle


// Add event listener to the window to change the logo text based on the window width
window.addEventListener('resize', function() {
  var logoText = document.querySelector('.logo-text');
  if (window.innerWidth <= 735) {
    logoText.innerHTML = 'D&S Diversified Technologies<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Headmaster';
  } else {
    logoText.innerHTML = 'D&S Diversified Technologies | Headmaster';
  }
});

// Run the function once at the start to handle the case where the page loads with a small window
window.dispatchEvent(new Event('resize'));

// Add event listener to the document
document.addEventListener('DOMContentLoaded', function () {
  const usMap = document.querySelector('#usMap');
  const stateDropdown = document.querySelector('.state-dropdown');

  stateDropdown.addEventListener('mouseenter', function () {
    usMap.classList.add('hover');
  });

  stateDropdown.addEventListener('mouseleave', function () {
    usMap.classList.remove('hover');
  });
});

//Call the function to create the dropdowns
createDropdowns();