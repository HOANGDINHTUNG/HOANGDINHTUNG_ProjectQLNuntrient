function loadFromLocalStorage(key, defaultValue = []) {
  let data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data); // Nếu đã có thì lấy ra
  } else {
    localStorage.setItem(key, JSON.stringify(defaultValue)); // Nếu chưa có thì lưu mặc định
    return defaultValue;
  }
}

// làm lấy dữ liệu từ form (cụ thể hơn là lấy thông tin từ input)
function getFormData(formEl) {
  let data = {};
  
  for (let element of formEl.elements) {
    if (element.name) {
      if (element.name.includes('.')) {
        const parts = element.name.split('.');
        if (!data[parts[0]]) {
          data[parts[0]] = {};
        }
        data[parts[0]][parts[1]] = element.value === '' ? '' : isNaN(element.value) ? element.value : Number(element.value);
      } else {
        data[element.name] = element.value;
      }
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

function validateEmail(email) {
  var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}


function validateForm(formEl) {
  let inputs = formEl.querySelectorAll("input[name]");
  
  for (let input of inputs) {
    let value = input.value.trim();
    let name = input.name;

    // Basic fields can be any string
    if (["name", "source", "category"].includes(name)) {
      if (name === "name" && value === "") {
        alert("Tên thực phẩm không được để trống!");
        input.focus();
        return false;
      }
      continue;
    }

    // Check main macronutrients
    if (name.includes('.')) {
      const parts = name.split('.');
      if (parts[0] === "macronutrients" && ["energy", "fat", "carbohydrate", "protein"].includes(parts[1])) {
        if (value === "") {
          alert(`${parts[1]} là bắt buộc, không được để trống!`);
          input.focus();
          return false;
        }
        
        let num = Number(value);
        if (isNaN(num) || num < 0) {
          alert(`${parts[1]} phải là số dương!`);
          input.focus();
          return false;
        }
      }
      // For other nutrient values, just check that they're numbers if provided
      else if (value !== "" && isNaN(Number(value))) {
        alert(`${parts[1]} phải là số!`);
        input.focus();
        return false;
      }
    }
  }
  return true;
}