function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const content = document.getElementById("content");
  const sidebarToggleText = document.getElementById("sidebarToggleText");
  const tool=document.getElementById("tool")
  sidebar.classList.toggle("collapsed");
  content.classList.toggle("expanded");

  // Show/hide the icon navigation in header when sidebar is collapsed/expanded
  if (sidebar.classList.contains("collapsed")) {
    sidebarToggleText.classList.remove("d-none");
    tool.classList.remove("d-none");
  } else {
    sidebarToggleText.classList.add("d-none");
    tool.classList.add("d-none");
  }
}

// Active navigation link
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    navLinks.forEach((item) => item.classList.remove("active"));
    this.classList.add("active");
  });
});