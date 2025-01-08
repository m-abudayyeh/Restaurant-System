const regexUsername = /^\S+$/;
const regexPassword = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
const regexBirthday = /^\d{4}-\d{2}-\d{2}$/;
const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,256}$/;
const regexPhone = /^07\d{8}$/;

const userForm = document.getElementById('userForm');

userForm.addEventListener('submit', function (event) {
  event.preventDefault();
  render();
});

let customers = JSON.parse(localStorage.getItem('customers')) || [];

function collectFormData() {

  const email = document.getElementById('Email').value;
  if (!regexEmail.test(email)) {
    alert("Email must follow the common email format.");
    return;
  }
  console.log(email);

  const fullName = document.getElementById('fullName').value;

  if (!regexUsername.test(fullName)) {
    alert("Spaces not allowed in username.");
    return;
  }

  const password = document.getElementById('password').value;

  if (!regexPassword.test(password)) {
    alert("Password must be at least 8 characters long and include at least 1 uppercase letter, 1 number, and 1 special character.");
    return;
  }

  const dob = document.getElementById('dob').value;
  const gender = document.querySelector('input[name="gender"]:checked').value;
  const phone = document.getElementById('phone').value;
  if (!regexPhone.test(phone)) {
    alert("Phone number must be 10 digits and start with 07.");
    return;
  }


  const orderTypes = Array.from(document.querySelectorAll('input[name="orderType"]:checked'))
    .map(checkbox => checkbox.value);

  const orderOption = document.querySelector('input[name="orderOption"]:checked').value;

  return { email, fullName, password, dob, gender, phone, orderTypes, orderOption };

}


function Customer(email, fullName, password, dob, gender, phone, orderTypes, orderOption) {
  this.email = email;
  this.fullName = fullName;
  this.password = password;
  this.dob = dob;
  this.gender = gender;
  this.phone = phone;
  this.orderTypes = orderTypes;
  this.orderOption = orderOption;
}

function render() {

  const formData = collectFormData();


  const newCustomer = new Customer(
    formData.email,
    formData.fullName,
    formData.password,
    formData.dob,
    formData.gender,
    formData.phone,
    formData.orderTypes,
    formData.orderOption,
  );


  customers.push(newCustomer);


  localStorage.setItem('customers', JSON.stringify(customers));


  displayCustomerCard(newCustomer);
}


function displayCustomerCard(customer) {
  const customerCards = document.getElementById('customer-cards');


  const card = document.createElement('div');
  card.classList.add('card');

  card.innerHTML = `
      
      <img src="assets/download.jpeg" alt="Customer Image">
      <p><strong>Email:</strong> ${customer.email}</p>
      <p><strong>Name:</strong> ${customer.fullName}</p>
      <p><strong>password:</strong> ${customer.password}</p>
      <p><strong>Gender:</strong> ${customer.gender}</p>
      <p><strong>Phone:</strong> ${customer.phone}</p>
      <p><strong>Order Types:</strong> ${customer.orderTypes.join(', ')}</p>
      <p><strong>Order Option:</strong> ${customer.orderOption}</p>
  `;

  customerCards.appendChild(card);
}

