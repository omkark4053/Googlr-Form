// Object to store dynamic form data
let formData = {};

// Add Field Button
document.getElementById('addFieldButton').addEventListener('click', function () {
  let fieldType = document.getElementById('fieldType').value;
  let fieldLabel = document.getElementById('fieldLabel').value.trim();

  if (fieldLabel !== '') {
    const formField = createField(fieldType, fieldLabel);
    document.getElementById('formFields').appendChild(formField);
    document.getElementById('fieldLabel').value = ''; // Clear input
  } else {
    alert("Please enter a field label.");
  }
});

// Create a new field based on user input
function createField(type, label) {
  const fieldWrapper = document.createElement('div');
  fieldWrapper.classList.add('form-group');

  const labelElement = document.createElement('label');
  labelElement.textContent = label;

  let inputElement;

  if (type === 'textarea') {
    inputElement = document.createElement('textarea');
    inputElement.rows = 4;
  } else if (type === 'radio' || type === 'checkbox') {
    // Create multiple options for radio/checkbox
    inputElement = document.createElement('div');
    for (let i = 1; i <= 3; i++) { // Example: 3 options
      let optionLabel = document.createElement('label');
      let optionInput = document.createElement('input');
      optionInput.type = type;
      optionInput.name = label.replace(/\s+/g, '').toLowerCase();
      optionInput.value = `Option ${i}`;
      
      optionLabel.appendChild(optionInput);
      optionLabel.appendChild(document.createTextNode(` Option ${i}`));
      
      inputElement.appendChild(optionLabel);
      inputElement.appendChild(document.createElement('br'));
    }
  } else {
    inputElement = document.createElement('input');
    inputElement.type = type;
  }

  inputElement.name = label.replace(/\s+/g, '').toLowerCase();

  fieldWrapper.appendChild(labelElement);
  fieldWrapper.appendChild(inputElement);

  return fieldWrapper;
}

// Save Data Button
document.getElementById('saveButton').addEventListener('click', function () {
  const formFields = document.querySelectorAll('#formFields .form-group');

  formData = {};
  formFields.forEach(field => {
    const label = field.querySelector('label').textContent;
    const input = field.querySelector('input') || field.querySelector('textarea');

    if (input) {
      if (input.type === 'radio' || input.type === 'checkbox') {
        // Collect checked options
        let selectedOptions = [];
        const options = field.querySelectorAll('input:checked');
        options.forEach(option => selectedOptions.push(option.value));

        formData[label] = selectedOptions.length > 0 ? selectedOptions.join(', ') : 'No selection';
      } else {
        formData[label] = input.value;
      }
    }
  });

  alert("Data Saved! You can now preview or submit it.");
});

// Preview Button
document.getElementById('previewButton').addEventListener('click', function () {
  const previewContent = document.getElementById('previewContent');
  previewContent.innerHTML = ''; // Clear previous preview content

  for (let label in formData) {
    const previewItem = document.createElement('p');
    previewItem.innerHTML = `<strong>${label}:</strong> ${formData[label]}`;
    previewContent.appendChild(previewItem);
  }

  document.getElementById('previewDiv').style.display = 'block';
});

// Edit Button (allow user to go back and edit)
document.getElementById('editButton').addEventListener('click', function () {
  document.getElementById('previewDiv').style.display = 'none';
});

// Submit Button
document.getElementById('submitButton').addEventListener('click', function () {
  alert('Form submitted with the following data: ' + JSON.stringify(formData));
});
