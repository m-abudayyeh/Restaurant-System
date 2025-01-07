const userForm = document.getElementById('userForm');

userForm.addEventListener('submit', function (event) {
  event.preventDefault(); 
  render(); 
});

let customers = JSON.parse(localStorage.getItem('customers')) || [];

function collectFormData() {
  const fullName = document.getElementById('fullName').value;
  const password = document.getElementById('password').value;
  const dob = document.getElementById('dob').value;
  const gender = document.querySelector('input[name="gender"]:checked').value;
  const phone = document.getElementById('phone').value;

  
  const orderTypes = Array.from(document.querySelectorAll('input[name="orderType"]:checked'))
      .map(checkbox => checkbox.value);

  const orderOption = document.querySelector('input[name="orderOption"]:checked').value;

  return { fullName, password, dob, gender, phone, orderTypes, orderOption };
}

function Customer(fullName, password, dob, gender, phone, orderTypes, orderOption) {
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
      <p><strong>Name:</strong> ${customer.fullName}</p>
      <p><strong>password:</strong> ${customer.password }</p>
      <p><strong>Gender:</strong> ${customer.gender}</p>
      <p><strong>Phone:</strong> ${customer.phone}</p>
      <p><strong>Order Types:</strong> ${customer.orderTypes.join(', ')}</p>
      <p><strong>Order Option:</strong> ${customer.orderOption}</p>
  `;

  customerCards.appendChild(card);
}

