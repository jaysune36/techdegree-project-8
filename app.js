document.addEventListener('DOMContentLoaded', () => {
  const employeeDir = document.getElementById('directory');
  const body = document.querySelector('body');
  const modal = document.getElementById('modal');
  const employeesURL = 'https://randomuser.me/api/?format=JSON?page=3&results=12&seed=abc';
  const employeesInfo = [];

  function generateDir(data) {
    data.results.map(person => {
      const section = document.createElement('section');
      section.className = Math.floor(Math.random() * 100);
        section.innerHTML = `
            <img src='${person.picture.thumbnail}'>
            <div class='employee-info'>
              <h2>${person.name.first} ${person.name.last}</h2>
              <p>${person.email}</p>
              <p>${person.location.city}</p>
            </div>`;
      employeeDir.appendChild(section);

      let employee = {
        employeeID: {
          number: section.className,
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
    }
      employeesInfo.push(employee)
    })
    console.log(employeesInfo)
  }

  function createModalInfo(employee) {
    const modalBox = modal.querySelector('.modal-box');
    const div = document.createElement('div');
    div.innerHTML = `
    <img src='${employee.img}'>
    <div class='employee-info'>
      <h2>Name: ${employee.name.first} ${employee.name.last}</h2>
      <p>Email: ${employee.email}</p>
      <p>Cell: ${employee.cell}</p>
      <p>Street Address: ${employee.address.street}</p>
      <p>City: ${employee.address.city}</p>
      <p>State: ${employee.address.state}</p>
      <p>Zip Code: ${employee.address.postcode}</p>
      <p>DOB: ${employee.birthdate}</p>
    </div>
    `;
    modalBox.insertAdjacentElement('beforeend', div)
  }

  fetch(employeesURL)
    .then(data => data.json())
    .then(generateDir)
    .catch(err => console.log(err))

  body.addEventListener('click', (e) => {
    console.log(e.target);
    const parent = e.target.parentNode;
    if(e.target.tagName === 'SECTION'|| parent.tagName === 'SECTION' || parent.parentNode.tagName === 'SECTION'){
      console.log('hello world');
      modal.style.display = 'block';
      createModalInfo(employeesInfo[0])
    }
    if(e.target.className === 'close-modal') {
      modal.style.display = 'none';
    }
  })
})