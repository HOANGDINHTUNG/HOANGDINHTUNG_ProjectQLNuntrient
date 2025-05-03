const loginsec=document.querySelector('.login-section')
const loginlink=document.querySelector('.login-link')
const registerlink=document.querySelector('.register-link')
registerlink.addEventListener("click",()=>{
    loginsec.classList.add('active')
})
loginlink.addEventListener('click',()=>{
    loginsec.classList.remove('active')
})

function signUp(){
  loginsec.classList.add('active')
}

function signIn(){
  loginsec.classList.remove('active')
}


function login(e) {
  e.preventDefault();
  let formLoginEl = e.target;

  let data = getFormData(formLoginEl);

  let userData = userList.find((userF) => userF.email === data.email);

  if (!userData) {
    showError(["Người dùng không tồn tại"]);
    return;
  }
  if (userData.password != data.password) {
    showError(["Mật khẩu không chính xác"]);
    return;
  }
  localStorage.setItem("userLogin", JSON.stringify(userData));
  showSuccess("Đăng nhập thành công");
}

function register(e) {
  e.preventDefault();
  let formRegisterEL = e.target;
  let data = getFormData(formRegisterEL);

  if (data.email == "" || data.name == "" || data.firstName == "" || data.lastName == "") {
    showError(["Không được bỏ trống"]);
    return;
  }

  if (!validateEmail(data.email)) {
    showError(["Email chưa đúng định dạng"]);
    return;
  }


  if(data.password.length<8){
    showError(["Mật khẩu tốn thiểu 8 ký tự"]);
    return;
  }

  if (userList.find((userF) => userF.email == data.email)) {
    showError(["Email này đã tồn tại"]);
    return;
  }

  userList.push({id: userList.length + 1, email: data.email, username: data.fullname, password: data.password});
  saveDataListToLocal(userList);
  showSuccess("Đăng ký thành công");
  signIn();
  formRegisterEL.reset();
}

function showSuccess(message) {
  const alertBox = document.createElement("div");
  alertBox.className = "alert alert-success";
  alertBox.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
  
  document.getElementById("alertContainer").appendChild(alertBox);

  setTimeout(() => {
    alertBox.remove();
    window.location.href = "/index.html";
  }, 2000); 
}

function showError(messages) {
  const alertBox = document.createElement("div");
  alertBox.className = "alert alert-error";
  alertBox.innerHTML = `
    <div class="alert-header">
      <span><i class="fas fa-minus-circle"></i> Error</span>
      <button class="close-btn" onclick="this.parentElement.parentElement.remove()">×</button>
    </div>
    <div class="alert-message">${Array.isArray(messages) ? messages.join("<br>") : messages}</div>
  `;
  
  document.getElementById("alertContainer").appendChild(alertBox);
}
