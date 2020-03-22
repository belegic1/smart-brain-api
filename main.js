

let accountsTableBody = document.querySelector('#accounts-table-body');
let allLinks = document.querySelectorAll('.nav-link');
let views = document.querySelectorAll('.view');
let accountsView = document.querySelector('#accounts-view');
let addAccountView = document.querySelector('#add-account-view');

let inputLastName = document.querySelector('[placeholder="lastName"]');
let inputId = document.querySelector('[placeholder="ID"]');
let inputEmail = document.querySelector('[placeholder="Email"]');
let inputName = document.querySelector('[placeholder="Name"]');
let inputPhone = document.querySelector('[placeholder="Phone"]');
let saveBtn = document.querySelector('#save');
let editbtn = document.querySelector('#edit');

let eId = document.querySelector('.eId');
let eName = document.querySelector('.eName');
let eLastName = document.querySelector('.eLastName');
let eEmail = document.querySelector('.eEmail');
let ePhone = document.querySelector('.ePhone');
let id;



saveBtn.addEventListener('click',addAccount);
editbtn.addEventListener('click', saveEditedAccount);


function saveEditedAccount(){
    const editedAccount = {
        id: eId.value,
        name: eName.value,
        lastName: eLastName.value,
        email: eEmail.value,
        phone: ePhone.value
    }
    db[id] = editedAccount;
    createAccounts();
    showView('#accounts-view');

}



function addAccount() {
    const newAccount ={
        id: inputId.value,
        name: inputName.value,
        lastName: inputLastName.value,
        email: inputEmail.value,
        phone: inputPhone.value
    }

  db.push(newAccount);
  inputId.value = '';
  inputLastName.value = '';
  inputName.value = '';
  inputPhone.value = '';
  inputEmail.value = '';
    createAccounts();
    showView('#accounts-view')
}

console.log(db);


for (let i = 0; i < allLinks.length; i++) {
   
    allLinks[i].addEventListener('click',showView);
    
}

function showView(e) {
    for (let i = 0; i < views.length; i++) {
        views[i].style.display = 'none';

    }
    if (e instanceof Event) {
        e.preventDefault();
let id = `#${this.getAttribute('href')}`;

        document.querySelector(id).style.display = 'block'


    } else {
        document.querySelector(e).style.display = 'block';
    }

   

}

createAccounts();

function createAccounts() {
    let htmlAccounts = '';
    for (let i = 0; i < db.length; i++) {
        const account = db[i];
        htmlAccounts +=` <tr>
            <td>${account.id}</td>
            <td>${account.name}</td>
            <td>${account.lastName}</td>
            <td>${account.email}</td>
            <td>${account.phone}</td>
            <td><button data-id="${i}" class="btn edit-btn btn-sm btn-warning form-control">Edit</button></td>
            <td><button data-id="${i}" class="btn delete-btn btn-sm btn-danger form-control">Delete</button></td>
        </tr>`
        
    }
    accountsTableBody.innerHTML = htmlAccounts;
    let allDeleteBtns = document.querySelectorAll('.delete-btn');
    let allEditBtns = document.querySelectorAll('.edit-btn');

    for (let i = 0; i < allEditBtns.length; i++) {
        allDeleteBtns[i].addEventListener('click',deleteAccount);
        allEditBtns[i].addEventListener('click',editAccount);
        
    }
    
}
function deleteAccount(){
 let id = this.getAttribute('data-id');
 db.splice(id,1);
 createAccounts();
 showView('#accounts-view')
}
function editAccount(){
    id = this.getAttribute('data-id');
    let selectedAccount = db[id];
    eId.value = selectedAccount.id;
    eName.value = selectedAccount.name;
    eLastName.value = selectedAccount.lastName;
    eEmail.value = selectedAccount.email;
    ePhone.value = selectedAccount.phone;
    showView('#edit-account-view')

}
