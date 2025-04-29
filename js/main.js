function loadFromLocalStorage(key, defaultValue = []) {
  let data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data); // Nếu đã có thì lấy ra
  } else {
    localStorage.setItem(key, JSON.stringify(defaultValue)); // Nếu chưa có thì lưu mặc định
    return defaultValue;
  }
}

userList=loadFromLocalStorage("userList",userList);

Food=loadFromLocalStorage("Food",Food);

category=loadFromLocalStorage("category",category);

Recipe=loadFromLocalStorage("Recipe",Recipe);


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
function saveDataToLocal(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// saveDataToLocal("userList",userList)

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

function validateForm(formEl) {
  let inputs = formEl.querySelectorAll("input[name]");

  for (let input of inputs) {
    let value = input.value.trim();

    // Kiểm tra nếu name là 'name', 'source', hoặc 'category' thì cho phép bất kỳ chuỗi hoặc số
    if (["name", "source", "category"].includes(input.name)) {
      continue;
    }

    // Kiểm tra nếu là energy, fat, carbohydrate, protein thì bắt buộc phải nhập và chỉ cho phép nhập số
    if (["energy", "fat", "carbohydrate", "protein"].includes(input.name)) {
      if (value === "" || isNaN(value)) {
        alert(`${input.placeholder || input.name} là bắt buộc và phải là số!`);
        input.focus();
        return false;
      }
      continue;
    }

    // Kiểm tra các input khác: nếu có giá trị thì phải là số
    if (value !== "" && isNaN(value)) {
      alert(`${input.placeholder || input.name} phải là số!`);
      input.focus();
      return false;
    }

    // Kiểm tra nếu bắt buộc nhập mà trống
    if (value === "") {
      alert(`Vui lòng nhập ${input.placeholder || input.name}`);
      input.focus();
      return false;
    }
  }

  return true;
}

