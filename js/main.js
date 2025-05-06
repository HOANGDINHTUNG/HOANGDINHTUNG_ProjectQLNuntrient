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

// hàm kiểm tra form food
function validateForm(formEl) {
  const inputs = formEl.querySelectorAll("input[name]");

  for (const input of inputs) {
    const value = input.value.trim();
    const name = input.name;

    // Validate basic required fields (chỉ cảnh báo 1 lần đúng trường)
    if (name === "name" && value === "") {
      input.focus();
      return false;
    }
    if (name === "source" && value === "") {
      input.focus();
      return false;
    }
    if (name === "category" && value === "") {
      input.focus();
      return false;
    }

    // Kiểm tra nhóm dinh dưỡng
    if (name.includes('.')) {
      const [group, field] = name.split('.');

      if (group === "macronutrients" && ["energy", "fat", "carbohydrate", "protein"].includes(field)) {
        if (value === "") {
          alert(`${field} là bắt buộc, không được để trống!`);
          input.focus();
          return false;
        }

        const num = Number(value);
        if (isNaN(num) || num < 0) {
          alert(`${field} phải là số dương!`);
          input.focus();
          return false;
        }
      } else if (value !== "" && isNaN(Number(value))) {
        alert(`${field} phải là số!`);
        input.focus();
        return false;
      }
    }
  }

  return true;
}



// Add CSS for validation styling
const styleElement = document.createElement('style');
styleElement.textContent = `
  .validation-error {
    color: #dc3545;
    font-size: 12px;
    margin-top: 4px;
    margin-left: 8px;
  }
  
  .is-invalid {
    border-color: #dc3545 !important;
    background-color: #fff8f8 !important;
  }
  
  .is-invalid:focus {
    box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25) !important;
  }
`;
document.head.appendChild(styleElement);

// Add event listeners to clear validation errors on input
function setupValidationListeners() {
  const formInputs = document.querySelectorAll('form input[name]');
  
  formInputs.forEach(input => {
    input.addEventListener('input', function() {
      // Clear error styling for this input
      this.classList.remove('is-invalid');
      
      // Remove error message if it exists
      const errorElement = this.parentElement.querySelector('.validation-error');
      if (errorElement) {
        errorElement.remove();
      }
    });
  });
}

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', setupValidationListeners);

// Advanced time validation helper function
function validateTimeFormat(timeString) {
  // Simple case: just a number (assumed to be minutes)
  if (/^\d+(\.\d+)?$/.test(timeString)) {
    return parseFloat(timeString) > 0;
  }
  
  // Complex case: number with time unit
  // Examples: "30 minutes", "1.5 hours", "45 mins", "2 hrs"
  const timePattern = /^(\d+(\.\d+)?)\s*(minutes?|mins?|hours?|hrs?)$/i;
  const match = timeString.match(timePattern);
  
  if (match) {
    const value = parseFloat(match[1]);
    return value > 0;
  }
  
  return false;
}

function validateRecipeForm(formData) {
  const errors = {};
  
  // Validate name: non-empty, min 3 characters
  if (!formData.name || formData.name.trim() === '') {
    errors.name = 'Name cannot be empty';
  } else if (formData.name.trim().length < 3) {
    errors.name = 'Name must be at least 3 characters';
  }
  
  // Validate description: non-empty, min 10 characters
  if (!formData.description || formData.description.trim() === '') {
    errors.description = 'Description cannot be empty';
  } else if (formData.description.trim().length < 10) {
    errors.description = 'Description must be at least 10 characters';
  }
  
  // Validate author: non-empty, contains only letters and spaces
  if (!formData.author || formData.author.trim() === '') {
    errors.author = 'Author cannot be empty';
  } else if (!/^[A-Za-z\s]+$/.test(formData.author.trim())) {
    errors.author = 'Author can only contain letters and spaces';
  }
  
  // Validate totalTime: non-empty, valid time format (number or time with unit)
  if (!formData.totalTime || formData.totalTime.trim() === '') {
    errors.totalTime = 'Total time cannot be empty';
  } else {
    // Check for valid time format (e.g., "30" or "30 minutes" or "1.5 hours")
    const timeValue = formData.totalTime.trim();
    const numericPart = parseFloat(timeValue);
    
    if (isNaN(numericPart)) {
      errors.totalTime = 'Total time must be a number or time with unit';
    } else if (numericPart <= 0) {
      errors.totalTime = 'Total time must be greater than 0';
    }
  }
  
  // Validate preparationTime: same as totalTime
  if (!formData.preparationTime || formData.preparationTime.trim() === '') {
    errors.preparationTime = 'Preparation time cannot be empty';
  } else {
    const timeValue = formData.preparationTime.trim();
    const numericPart = parseFloat(timeValue);
    
    if (isNaN(numericPart)) {
      errors.preparationTime = 'Preparation time must be a number or time with unit';
    } else if (numericPart <= 0) {
      errors.preparationTime = 'Preparation time must be greater than 0';
    }
  }
  
  // Validate finalWeight: can be empty or number with unit
  if (formData.finalWeight && formData.finalWeight.trim() !== '') {
    const weightPattern = /^\d+(\.\d+)?\s*[a-zA-Z]*$/; // Matches "210 grams", "500", etc.
    if (!weightPattern.test(formData.finalWeight.trim())) {
      errors.finalWeight = 'Final weight must be a number with optional unit (e.g., "210 grams")';
    }
  }
  
  // Validate portions: must be a positive integer
  if (!formData.portions || formData.portions.trim() === '') {
    errors.portions = 'Portions cannot be empty';
  } else {
    const portionsValue = parseInt(formData.portions.trim());
    if (isNaN(portionsValue) || portionsValue <= 0 || portionsValue !== parseFloat(formData.portions.trim())) {
      errors.portions = 'Portions must be a positive integer';
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors: errors
  };
}

// Function to display error messages
function showValidationError(inputName, errorMessage) {
  // Find the input element
  const inputElement = document.querySelector(`input[name="${inputName}"]`);
  if (!inputElement) return;
  
  // Check if an error message already exists
  let errorElement = inputElement.parentElement.querySelector('.validation-error');
  
  // If no error element exists, create one
  if (!errorElement) {
    errorElement = document.createElement('div');
    errorElement.className = 'validation-error';
    inputElement.parentElement.appendChild(errorElement);
  }
  
  // Set the error message
  errorElement.textContent = errorMessage;
  
  // Highlight the input field
  inputElement.classList.add('is-invalid');
}

// Function to clear all validation errors
function clearValidationErrors() {
  // Remove all error messages
  document.querySelectorAll('.validation-error').forEach(el => el.remove());
  
  // Remove all invalid highlighting
  document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
}

// Add CSS for validation styling
function addValidationStyles() {
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    .validation-error {
      color: #dc3545;
      font-size: 12px;
      margin-top: 4px;
      margin-left: 8px;
    }
    
    .is-invalid {
      border-color: #dc3545 !important;
      background-color: #fff8f8 !important;
    }
    
    .is-invalid:focus {
      box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25) !important;
    }
  `;
  document.head.appendChild(styleElement);
}
