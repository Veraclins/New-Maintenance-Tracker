const requestData = document.forms.requestForm.elements;

function createRequest(request, link) {
  const token = localStorage.getItem('token');
  fetchData(link.url, {
    method: link.method,
    token,
    body: JSON.stringify(request),
  })
    .then((data) => {
      if (data.Error) {
        const err = document.getElementById('createError');

        if (data.errors) {
          const { errors } = data;
          handleValidationErrors(errors);
        }

        const e = `
              <div class="form-section">
                <div class="danger">${data.Error}</div>
              </div>`;
        err.innerHTML = e;
      } else {
        localStorage.setItem('request', JSON.stringify(data));
        window.location.href = 'dashboard.html';
      }
    });
}

function submit(event) {
  const link = {
    url: `${baseURL}/users/requests`,
    method: 'POST',
  };
  const request = {};
  event.preventDefault();
  request.title = requestData.title.value;
  request.device = requestData.device.value;
  request.description = requestData.description.value;

  createRequest(request, link);
}
document.forms.requestForm.addEventListener('submit', submit);
