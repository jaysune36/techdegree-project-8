document.addEventListener('DOMContentLoaded', () => {
  const employeeDir = document.getElementById('directory');
  const body = document.querySelector('body')
  const employeesURL = 'https://randomuser.me/api/?format=JSON?page=3&results=12&seed=abc'

  function generateDir(data) {
    data.results.map(person => {
      const section = document.createElement('section');
        section.innerHTML = `
          <div class='employee-container'>
            <img src='${person.picture.thumbnail}'>
            <div class='employee-info'>
              <h2>${person.name.first} ${person.name.last}</h2>
              <p>${person.email}</p>
              <p>${person.location.city}</p>
            </div>
          </div>`;
      employeeDir.appendChild(section)
    })
  }

  function createModal() {
    const div = document.createElement('div');
    body.insertAdjacentElement('afterbegin', div)
    div.className = 'modal-background'
    div.innerHTML = `
        <div class='modal-container'>
          <div class='modal-box'>
            <h1>Hello World</h1>
          </div>
        </div>
    `
  }

  fetch(employeesURL)
    .then(data => data.json())
    .then(generateDir)
    .catch(err => console.log(err))

  body.addEventListener('click', (e) => {
   
      if(e.target.className === 'employee-info')
      console.log('hello world')
  })
})