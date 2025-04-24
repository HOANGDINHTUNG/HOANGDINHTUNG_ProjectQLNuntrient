/*=============== SHOW HIDE PASSWORD LOGIN ===============*/
const passwordAccess = (loginPass, loginEye) => {
  const input = document.getElementById(loginPass),
    iconEye = document.getElementById(loginEye);

  iconEye.addEventListener("click", () => {
    // Change password to text
    input.type === "password" ? (input.type = "text") : (input.type = "password");

    // Icon change
    iconEye.classList.toggle("ri-eye-fill");
    iconEye.classList.toggle("ri-eye-off-fill");
  });
};
passwordAccess("password", "loginPassword");

/*=============== SHOW HIDE PASSWORD CREATE ACCOUNT ===============*/
const passwordRegister = (loginPass, loginEye) => {
  const input = document.getElementById(loginPass),
    iconEye = document.getElementById(loginEye);

  iconEye.addEventListener("click", () => {
    input.type === "password" ? (input.type = "text") : (input.type = "password");

    iconEye.classList.toggle("ri-eye-fill");
    iconEye.classList.toggle("ri-eye-off-fill");
  });
};
passwordRegister("passwordCreate", "loginPasswordCreate");

/*=============== SHOW HIDE LOGIN & CREATE ACCOUNT ===============*/
const loginAcessRegister = document.getElementById("loginAccessRegister"),
  buttonRegister = document.getElementById("loginButtonRegister"),
  buttonAccess = document.getElementById("loginButtonAccess");

buttonRegister.addEventListener("click", () => {
  loginAcessRegister.classList.add("active");
});

function signUp() {
  loginAcessRegister.classList.add("active");
}

buttonAccess.addEventListener("click", () => {
  loginAcessRegister.classList.remove("active");
});

function signIn() {
  loginAcessRegister.classList.remove("active");
}

function login(e) {
  e.preventDefault();
  let formLoginEl = e.target;

  let data = getFormData(formLoginEl);

  let userData = userList.find((userF) => userF.email === data.email);

  if (!userData) {
    alert("Người dùng không tồn tại");
    return;
  }
  if (userData.password != data.password) {
    alert("Mật khẩu không chính xác");
    return;
  }
  localStorage.setItem("userLogin", JSON.stringify(userData));
  alert("Đăng nhập thành công")
  window.location.href = "/index.html";
}

function register(e) {
  e.preventDefault();
  let formRegisterEL = e.target;
  let data = getFormData(formRegisterEL);

  if (data.email == "" || data.name == "" || data.firstName == "" || data.lastName == "") {
    alert("Không được bỏ trống");
    return;
  }

  if (!validateEmail(data.email)) {
    alert("Email chưa đúng định dạng");
    return;
  }

  console.log(data.email.length)

  if(data.password.length<8){
    alert("Mật khẩu tối thiệu 8 kí tự")
    return;
  }

  if (userList.find((userF) => userF.email == data.email)) {
    alert("Email này đã tồn tại");
    return;
  }

  userList.push({id: userList.length + 1, email: data.email, username: data.lastName, password: data.password});
  saveDataListToLocal(userList);
  alert("Đăng ký thành công");
  signIn();
  formRegisterEL.reset();
}
