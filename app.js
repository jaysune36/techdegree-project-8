document.addEventListener('DOMContentLoaded', () => {
  const employeeDir = document.getElementById('directory');
  const body = document.querySelector('body');
  const modal = document.getElementById('modal');
  const sections = document.querySelectorAll('section');
  const employeesURL = 'https://randomuser.me/api/?format=JSON?page=3&results=12&seed=abc';
  const employeesInfo = [];
  let employeeNumber = 0;

  function generateDir(data) {
    data.map(person => {
      const section = document.createElement('section');
      section.className = employeeNumber
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
    div.className = 'modal-employee-info'
        div.innerHTML = `
        <img src='${employee.info.img}'>
        <div class='employee-info'>
          <h2>Name: ${employee.info.name.first} ${employee.info.name.last}</h2>
          <p>Email: ${employee.info.email}</p>
          <p>Cell: ${employee.info.cell}</p>
          <p>Street Address: ${employee.info.address.street}</p>
          <p>City: ${employee.info.address.city}</p>
          <p>State: ${employee.info.address.state}</p>
          <p>Zip Code: ${employee.info.address.postcode}</p>
          <p>DOB: ${employee.info.birthdate}</p>
        </div>
        `;
        modalBox.insertAdjacentElement('beforeend', div);
  }

  fetch(employeesURL)
    .then(data => data.json())
    .then(data => data.results)
    .then(generateDir)
    .catch(err => console.log(err))


    sections.forEach( section => {
      section.addEventListener('click', (e) => {
        console.log('hello world')
      })
    })

  // body.addEventListener('click', (e) => {
  //   console.log(e.currentTarget);
  //   const parent = e.target.parentNode;
  //   // if(e.target.tagName === 'SECTION'|| parent.tagName === 'SECTION' || parent.parentNode.tagName === 'SECTION'){
  //     if(e.currentTarget === 'SECTION'){
  //       e.currentTarget.stopPropagation()
  //       console.log(e.currentTarget);
  //     modal.style.display = 'block';
  //     createModalInfo(employeesInfo[parent.className])
  //   }
  //   if(e.target.className === 'close-modal') {
  //     modal.style.display = 'none';
  //     e.target.nextElementSibling.remove()
  //   }
  // })
})