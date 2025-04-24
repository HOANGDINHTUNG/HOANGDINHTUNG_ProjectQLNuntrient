const navItems = document.querySelectorAll(".nav-link");

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navItems.forEach((nav) => nav.classList.remove("active"));
    item.classList.add("active");
  });
});

// hiệu ứng sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
  
    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('full-width');
  }
  