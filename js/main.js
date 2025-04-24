
//Khởi tạo vào localStorage
if (localStorage.getItem("userList")) {
  userList = JSON.parse(localStorage.getItem("userList"));
} else {
  localStorage.setItem("userList", JSON.stringify(userList));
}

// làm lấy dữ liệu từ form (cụ thể hơn là lấy thông tin từ input)
function getFormData(formEL) {
  let data = {};
  for (element of formEL.elements) {
    if (element.name != "") {
      data[element.name] = element.value;
    }
  }
  return data;
}

// Lưu dữ liệu lên hệ thống
function saveDataListToLocal(userList) {
  localStorage.setItem("userList", JSON.stringify(userList));
}

// Xác nhận ai đang đăng nhập
function getUserLoginData() {
  let userData = JSON.parse(localStorage.getItem("userLogin"));
  return userData;
}

// Kiểm tra Email xem có hợp lệ hay không
function validateEmail(email) {
  var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

