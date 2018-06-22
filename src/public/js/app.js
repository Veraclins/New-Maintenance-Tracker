// To be loaded in every file before other scripts
// const baseURL = 'https://veraclins-m-tracker.herokuapp.com/api/v1'; // Hosted app
const baseURL = 'http://localhost:5000/api/v1'; // Local development
const loader = document.getElementById('loader-wrapper');
const mainEl = document.getElementById('main');

const startLoader = () => {
  mainEl.style.display = 'none';
  loader.style.display = 'block';
  loader.innerHTML = `
    <div id="loader"></div>
    <p class="centered"><strong>Loading... Please Wait...</strong></p>`;
};

const stopLoader = () => {
  mainEl.style.display = 'block';
  loader.style.display = 'none';
};

function fetchData(url, payload) {
  startLoader();
  const response = fetch(url, {
    method: payload.method,
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      'x-access-token': payload.token,
    },
    body: payload.body,
  })
    .then(res => res.json());
  stopLoader();
  return response;
}

function displayRequests(request, pageId, type) {
  const el = document.getElementById(pageId);
  let rows = `
      <li class="columns">
        <h2 class="column"><strong>Requests</strong></h2>
        <div class="column columns">
          <h2><strong>Date</strong></h2>
          <h2><strong>Status</strong></h2>
        </div>
      </li>`;
  if (request.length === 0 && type === 'admin') {
    rows = `
        <li>
          <h2 class="centered">
            There are no requests in this category at the moment!
          </h2>                    
        </li>`;
  } else if (request.length === 0) {
    rows = `
        <li>
          <h2 class="centered">
            You do not  have any request at the moment. <a href="create-request.html">Create a Request</a>
          </h2>                    
        </li>`;
  } else if (request.Error) {
    rows = `
        <li>
          <h2 class="danger centered">
            ${request.Error}
          </h2>                    
        </li>`;
  } else {
    request.forEach((element) => {
      const createdAt = new Date(element.created_at).toDateString();
      let getReq = '';
      if (type === 'admin') {
        getReq = `adminReq(${element.id})`;
      } else {
        getReq = `getRequest(${element.id})`;
      }
      rows += `
        <li class="columns">
          <a class="column" href="#!" id="${element.id}" onclick="${getReq}">${element.title}</a>
          <div class="column columns">
            <div>${createdAt}</div>
            <div class="${element.status}">${element.status}</div>
          </div>                    
        </li>`;
    });
  }
  el.innerHTML = rows;
}

function handleValidationErrors(errors) {
  Object.entries(errors).forEach(([key, value]) => {
    const element = document.getElementById(`${key}`);
    const error = document.getElementById(`${key}Error`);
    element.style.border = '1px solid red';
    error.innerHTML = `<span class="danger">${key} <small>${value}</small></span>`;
    document.documentElement.scrollTop = 100;
  });
}

function logout() {
  localStorage.clear();
  window.location.href = 'index.html';
}
