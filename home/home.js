let userLogin = null;
function checkAuthen() {
  userLogin = JSON.parse(localStorage.getItem("userLogin"));
}

checkAuthen();

function renderHome() {
  if (!userLogin) {
    alert("Vui lòng đăng nhập!!");
    window.location.href = "/auth/authen.html";
    return;
  }
}

function logout() {
  if (!confirm("bạn thật sự muốn đăng xuất?")) return;
  window.location.reload();
  localStorage.removeItem("userLogin");
}

renderHome();

function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}