document.addEventListener('DOMContentLoaded', function () {
  const collapsibleButton = document.querySelectorAll('.collapsible-button');

  collapsibleButton.forEach(panel => {
    panel.addEventListener('click', function (event) {
      // Prevent the body click event from firing when a panel is clicked
      event.stopPropagation();

      // Remove 'expanded' class from all panels
      collapsibleButton.forEach(otherPanel => {
        if (otherPanel !== panel) {
          otherPanel.classList.remove('expanded');
        }
      });

      // Toggle the 'expanded' class on the clicked panel
      this.classList.toggle('expanded');
    });
  });

  // Add click event listener to the body
  document.body.addEventListener('click', function () {
    // Remove 'expanded' class from all panels
    collapsibleButton.forEach(panel => {
      panel.classList.remove('expanded');
    });
  });
});

window.onload = function() {
  window.scrollTo(0, 0);
}


//Menu Toggle
document.addEventListener('DOMContentLoaded', (event) => {
  const menuButton = document.querySelector('#menuButton');
  console.log(menuButton); // Should log the menuButton element

  function showSidebar() {
    let sidebar = document.querySelector('.sidebar');
    console.log(sidebar); // Should log the sidebar element
    if (sidebar.style.display === "none" || sidebar.style.display === "") {
        sidebar.style.display = "flex";
    } else {
        sidebar.style.display = "none";
    }
  }

  menuButton.addEventListener('click', function(event) {
    event.stopPropagation(); // Stop propagation of the click event
    console.log('menuButton clicked'); // Should log when the menuButton is clicked
    showSidebar();
  });

  function closeSidebar() {
    let sidebar = document.querySelector('.sidebar');
    sidebar.style.display = "none";
  }

  const closeMenuButton = document.querySelector('.closeMenu');
  closeMenuButton.addEventListener('click', closeSidebar);

  // Add event listener to the document
  document.addEventListener('click', function(event) {
    let sidebar = document.querySelector('.sidebar');
    // Check if the click is outside the sidebar
    if (!sidebar.contains(event.target) && sidebar.style.display === "flex") {
      // Hide the sidebar
      closeSidebar();
    }
  });

  // Add event listener to the sidebar to stop propagation
  let sidebar = document.querySelector('.sidebar');
  sidebar.addEventListener('click', function(event) {
    // Stop propagation of the click event
    event.stopPropagation();
  });
});