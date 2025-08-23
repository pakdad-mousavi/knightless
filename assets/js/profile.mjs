const displayMessage = (action, code, message) => {
  const messagePanel = document.querySelector(`form[data-action="${action}"] #message-panel`);
  const messageTextEl = messagePanel.querySelector('#message-text');

  const styles = [];
  let iconClass;

  switch (code) {
    case 200:
      styles.push('border-emerald-500', 'text-emerald-500');
      iconClass = 'icon-pencil';
      break;
    case 400:
    case 500:
      iconClass = 'icon-cross';
      styles.push('border-rose-500', 'text-rose-500');
      break;
  }

  // Add the icon to the panel (if not already there)
  if (messagePanel.children.length === 1) {
    const icon = document.createElement('span');
    icon.classList.add(iconClass);
    messagePanel.insertAdjacentElement('afterbegin', icon);
  }

  // Update panel and reveal message
  messagePanel.classList.add(...styles);
  messagePanel.style.display = null;
  messageTextEl.innerText = message;
};

const handleProfileSubmissions = async (e) => {
  // Ensure an AJAX-marked form is submitted
  const form = e.target;
  if (!form.matches('form[data-action]')) return;

  e.preventDefault();

  // Parse form details
  const url = form.action;
  const action = form.dataset.action;
  const method = form.method;
  console.log(url, action, method);

  // Get the form body (if any)
  const formData = new FormData(form);
  const formDataObj = Object.fromEntries(formData.entries());
  const body = JSON.stringify(formDataObj);

  const reqOptions = {
    method,
  };

  // Only add body if its post request
  if (method === 'post') {
    reqOptions.headers = {
      'Content-Type': 'application/json',
    };
    reqOptions.body = body;
  }

  // Confirm with user before account deletion if needed
  if (action === 'delete-account') {
    reqOptions.method = 'DELETE'; // override for fetch
    const confirmation = confirm('Are you sure you want to delete your account?');
    if (!confirmation) return;
  }

  try {
    // Try to send the request
    const res = await fetch(url, reqOptions);
    const json = await res.json();

    // Display error message in any case where the code is not 200
    if (json.code !== 200) {
      return displayMessage(action, json.code, json.message);
    }

    // Redirect page if successful, based on form action
    switch (action) {
      case 'update-username':
        window.location.href = '/profile';
        return;
      case 'logout':
      case 'delete-account':
        window.location.href = '/';
    }
  } catch (e) {
    console.log(e);
    displayMessage(action, 500, 'Failed to send request, please try again later.');
  }
};

export const profileHandler = () => {
  document.addEventListener('submit', async (e) => await handleProfileSubmissions(e));
};
