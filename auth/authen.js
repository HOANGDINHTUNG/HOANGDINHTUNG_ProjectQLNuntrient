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


  if(data.password.length<8){
    alert("Mật khẩu tối thiệu 8 kí tự")
    return;
  }

  if (userList.find((userF) => userF.email == data.email)) {
    alert("Email này đã tồn tại");
    return;
  }

  userList.push({id: userList.length + 1, email: data.email, username: data.fullname, password: data.password});
  saveDataListToLocal(userList);
  alert("Đăng ký thành công");
  signIn();
  formRegisterEL.reset();
}
