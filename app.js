document.addEventListener('DOMContentLoaded', () => {
  const employeeDir = document.getElementById('directory');
  const body = document.querySelector('body');
  const modal = document.getElementById('modal');
  const search = document.getElementById('search');
  const employeesURL = 'https://randomuser.me/api/?format=JSON?page=3&results=12&seed=abc';
  const employeesInfo = [];
  let employeeNumber = 0;

  function generateDir(data) {
    data.map(person => {
      const section = document.createElement('section');
      section.className = employeeNumber;
        section.innerHTML = `
            <img src='${person.picture.thumbnail}'>
            <div class='employee-info'>
              <h2>${person.name.first} ${person.name.last}</h2>
              <p>${person.email}</p>
              <p>${person.location.city}</p>
            </div>`;
      employeeDir.appendChild(section);

      let employee = {
          info: {
            name: {
              first: `${person.name.first}`,
              last: `${person.name.last}`
            },
            img: `${person.picture.large}`,
            email: `${person.email}`,
            cell: `${person.cell}`,
            address: {
              street: `${person.location.street.number} ${person.location.street.name}`,
              city: `${person.location.city}`,
              state: `${person.location.state}`,
              postcode: person.location.postcode
            },
            birthdate: `${person.dob.date}`
      }
    }
      employeesInfo.push(employee)
      employeeNumber++
    })
  }

  function createModalInfo(employee) {
    const modalBox = modal.querySelector('.modal-box');
    const div = document.createElement('div');
    let date = new Date(employee.info.birthdate)
    div.className = 'modal-employee-info'
        div.innerHTML = `
        <img src='${employee.info.img}'>
        <div class='employee-info'>
          <h2>${employee.info.name.first} ${employee.info.name.last}</h2>
          <p>${employee.info.email}</p>
          <p>${employee.info.address.city}</p>
          <hr />
          <p>${employee.info.cell}</p>
          <p>${employee.info.address.street}, ${employee.info.address.state} ${employee.info.address.postcode}</p>
          <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
        `;
        modalBox.insertAdjacentElement('beforeend', div);
  }

  fetch(employeesURL)
    .then(data => data.json())
    .then(data => data.results)
    .then(generateDir)
    .catch(err => console.log(err))

    employeeDir.addEventListener('click', (e) => {
    if(e.target !== employeeDir){
      const section = e.target.closest('section');
      if(section) {
        modal.style.display = 'block';
        createModalInfo(employeesInfo[section.className])
      }
    }
  })

    modal.addEventListener('click', (e) => {
      if(e.target.className === 'close-modal') {
        modal.style.display = 'none';
        e.target.nextElementSibling.remove()
      }
    })

    search.addEventListener('keyup', () => {
      let input = search.value.toLowerCase();
      const employeesName = employeeDir.querySelectorAll('section');
      for(let i=0; i<employeesName.length; i++) {
        let employeeName = employeesName[i].querySelector('h2').textContent;
        if(employeeName.toLowerCase().includes(input)) {
          employeesName[i].style.display = 'block';
        } else {
          employeesName[i].style.display = 'none';
        }
      }
    })
})