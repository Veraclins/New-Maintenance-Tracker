function fullName() {
  const user = JSON.parse(localStorage.getItem('user'));
  return `${user.lastName} ${user.firstName}`;
}

function fetchData(url, payload) {
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
  return response;
}

function updateRequest(request, link) {
  const token = localStorage.getItem('token');
  fetchData(link.url, {
    method: link.method,
    token,
    body: JSON.stringify(request),
  })
    .then((data) => {
      if (data.Error) {
        const error = data.Error;
        const err = document.getElementById('updateError');
        const e = `
          <div class="form-section">
            <div class="danger">${error}</div>
          </div>`;
        err.innerHTML = e;
      } else {
        localStorage.setItem('request', JSON.stringify(data));
        window.location.href = 'dashboard.html';
      }
    });
}

function showDetails() {
  const user = JSON.parse(localStorage.getItem('user'));
  const request = JSON.parse(localStorage.getItem('request'));
  const el = document.getElementById('requestDetail');
  let button = '';
  if (request.status === 'pending' || request.status === 'disapproved') {
    button = '<a href="update-request.html" class="button info">Update</a>';
  }
  const detail = `
    <div class="card-head">
      <h4>${request.title}</h4>
    </div>
        
    <div class="card-body">
      <p><strong>Requester's Name: </strong>${fullName()}</p>                 
      <p><strong>Department: </strong>${user.dept}</p>                 
      <p><strong>Duration: </strong>${request.duration}</p>                 
      <p><strong>Description: </strong>${request.description}</p>
      ${button}
    </div>`;
  el.innerHTML = detail;
}

function getRequest(id) {
  const token = localStorage.getItem('token');
  fetchData(`http://localhost:4000/api/v1/users/requests/${id}`, {
    method: 'GET',
    token,
  })
    .then((request) => {
      localStorage.setItem('request', JSON.stringify(request));
      window.location.href = 'request-details.html';
    });
}

function signUp(user, link) {
  fetch(link.url, {
    method: link.method,
    body: JSON.stringify(user),
  })
    .then(res => res.json())
    .then(data => console.log(data));
}

function login(user, link) {
  fetchData(link.url, {
    method: link.method,
    body: JSON.stringify(user),
  })
    .then((data) => {
      if (data.Error) {
        const error = data.Error;
        const err = document.getElementById('loginError');

        const e = `
          <div class="form-section">
            <div class="danger">${error}</div>
          </div>`;
        err.innerHTML = e;
      } else {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        window.location.href = 'dashboard.html';
      }
    });
}

function displayRequests(request) {
  const el = document.getElementById('userRequests');
  let rows = `
  <li class="columns">
    <h4 class="column"><strong>Request</strong></h4>
    <div class="column columns">
      <h4><strong>Date</strong></h4>
      <h4><strong>Status</strong></h4>
    </div>
  </li>`;
  if (request.length !== 0) {
    request.forEach((element) => {
      const createdAt = new Date(element.created_at).toDateString();
      rows += `
    <li class="columns">
      <a class="column" href="#!" id="${element.id}" onclick="getRequest(${element.id})">${element.title}</a>
      <div class="column columns">
        <div>${createdAt}</div>
        <div class="warning">${element.status}</div>
      </div>                    
    </li>`;
    });
  } else {
    rows = `
    <li>
      <div>
        You do not  have any request at the moment. <a href="create-request.html">Create a Request</a>
      </div>                    
    </li>`;
  }
  el.innerHTML = rows;
}

function getUserRequests() {
  const token = localStorage.getItem('token');
  fetch('http://localhost:4000/api/v1/users/requests', {
    method: 'GET',
    token,
    body: JSON.stringify(request),
  })
    .then(res => res.json())
    .then(data => displayRequests(data));
}

