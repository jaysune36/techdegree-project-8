document.addEventListener('DOMContentLoaded', () => {
  const employeeDir = document.getElementById('directory');
  const employeesURL = 'https://randomuser.me/api/?format=JSON?page=3&results=12&seed=abc'

  function generateDir(data) {
    data.results.map(person => {
      const section = document.createElement('section');
        section.innerHTML = `
          <img src='${person.picture.thumbnail}'>
          <div class='employee-info'>
            <h2>${person.name.first} ${person.name.last}</h2>
            <p>${person.email}</p>
            <p>${person.location.city}</p>
          </div>`;
      employeeDir.appendChild(section)
    })
    console.log()
  }

  fetch(employeesURL)
    .then(data => data.json())
    .then(generateDir)
    .catch(err => console.log(err))
})