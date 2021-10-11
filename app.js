document.addEventListener('DOMContentLoaded', () => {
  const employeeDir = document.getElementById('directory');
  const modal = document.getElementById('modal');
  const search = document.getElementById('search');
  const employeesURL = 'https://randomuser.me/api/?format=JSON?page=3&results=12&seed=abc';
  const employeesInfo = [];

  function generateDir(data) {
    data.map((person, index) => {
      const section = document.createElement('section');
      section.setAttribute('data-index', index)
      section.innerHTML = `
            <div class='card'>
            <img src='${person.picture.thumbnail}'>
            <div class='employee-info'>
              <h2>${person.name.first} ${person.name.last}</h2>
              <p>${person.email}</p>
              <p>${person.location.city}</p>
            </div>
            </div>`;
      employeeDir.appendChild(section);

      let employee = {
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
      employeesInfo.push(employee)
    })
  }

  function createModalInfo(employee, index) {
    const modalBox = modal.querySelector('.modal-box');
    const div = document.createElement('div');
    let date = new Date(employee.birthdate);
    const reg = new RegExp(/[-()\s]/gm);
    const numberReg = employee.cell.replace(reg, '');
    const numberFormat = `(${numberReg[0]}${numberReg[1]}${numberReg[2]}) ${numberReg[3]}${numberReg[4]}${numberReg[5]}-${numberReg[6]}${numberReg[7]}${numberReg[8] = 0}${numberReg[9] = 0}`
    div.className = 'modal-employee-info';
    div.setAttribute('data-index', index);
    div.innerHTML = `
        <img src='${employee.img}'>
        <div class='employee-info'>
          <h2>${employee.name.first} ${employee.name.last}</h2>
          <p>${employee.email}</p>
          <p>${employee.address.city}</p>
          <hr />
          <p>${numberFormat}</p>
          <p>${employee.address.street}, ${employee.address.state} ${employee.address.postcode}</p>
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
    if (e.target !== employeeDir) {
      const section = e.target.closest('section');
      if (section) {
        modal.style.display = 'block';
        createModalInfo(employeesInfo[section.getAttribute('data-index')], section.getAttribute('data-index'));
      }
    }
  })

  modal.addEventListener('click', (e) => {
    const info = document.querySelector('.modal-employee-info');
    let index = info.getAttribute('data-index');
    const sections = document.querySelectorAll('section');
    if (e.target.className === 'close-modal') {
      modal.style.display = 'none';
      info.remove();
    }
    if (e.target.className === 'scroll-left') {
      if(index > 0) {
        info.remove();
        createModalInfo(employeesInfo[parseFloat(index) - 1], parseFloat(index) - 1);
      } else {
        return null;
      }
    }
    if (e.target.className === 'scroll-right') {
      if(index < (sections.length - 1)) {
        info.remove();
        createModalInfo(employeesInfo[parseFloat(index) + 1],parseFloat(index) + 1);
      } else {
        return null;
      }
    }
  })

  search.addEventListener('keyup', () => {
    let input = search.value.toLowerCase();
    const employeesName = employeeDir.querySelectorAll('section');
    for (let i = 0; i < employeesName.length; i++) {
      let employeeName = employeesName[i].querySelector('h2').textContent;
      if (employeeName.toLowerCase().includes(input)) {
        employeesName[i].style.display = 'block';
      } else {
        employeesName[i].style.display = 'none';
      }
    }
  })


})