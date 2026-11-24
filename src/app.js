
const API_URL = 'https://webapp-project2-20261111-hmhvebceema0edaw.westus3-01.azurewebsites.net/api/employees';

const employeeForm = document.getElementById('employee-form');
const employeeList = document.getElementById('employee-list');
const message = document.getElementById('message');
const formTitle = document.getElementById('form-title');
const saveButton = document.getElementById('save-button');
const cancelButton = document.getElementById('cancel-button');
const refreshButton = document.getElementById('refresh-button');

async function apiRequest(url, options = {}) {
    const response = await fetch(url, options);

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(data.error || `Request failed: ${response.status}`);
    }

    return data;
}

function showMessage(text, isError = false) {
    message.textContent = text;
    message.style.color = isError ? '#dc2626' : '#15803d';
}

function createCell(value) {
    const cell = document.createElement('td');
    cell.textContent = value ?? '';
    return cell;
}

async function loadEmployees() {
    employeeList.innerHTML = '<tr><td colspan="5">Loading employees...</td></tr>';

    try {
        const employees = await apiRequest(API_URL);

        employeeList.replaceChildren();

        if (!employees.length) {
            employeeList.innerHTML =
                '<tr><td colspan="5">No employees found.</td></tr>';
            return;
        }

        employees.forEach(employee => {
            const row = document.createElement('tr');

            row.appendChild(createCell(employee.id));
            row.appendChild(createCell(employee.name));
            row.appendChild(createCell(employee.email));
            row.appendChild(createCell(employee.department));

            const actions = document.createElement('td');

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => editEmployee(employee));

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.style.background = '#dc2626';
            deleteButton.addEventListener('click', () => deleteEmployee(employee.id));

            actions.append(editButton, deleteButton);
            row.appendChild(actions);

            employeeList.appendChild(row);
        });

    } catch (error) {
        employeeList.innerHTML =
            '<tr><td colspan="5">Unable to load employees.</td></tr>';
        showMessage(error.message, true);
    }
}

employeeForm.addEventListener('submit', async event => {
    event.preventDefault();

    const id = document.getElementById('employee-id').value;

    const employee = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        department: document.getElementById('department').value.trim()
    };

    const isEditing = Boolean(id);

    try {
        await apiRequest(
            isEditing ? `${API_URL}/${id}` : API_URL,
            {
                method: isEditing ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(employee)
            }
        );

        showMessage(
            isEditing
                ? 'Employee updated successfully!'
                : 'Employee added successfully!'
        );

        resetForm();
        await loadEmployees();

    } catch (error) {
        showMessage(error.message, true);
    }
});

function editEmployee(employee) {
    document.getElementById('employee-id').value = employee.id;
    document.getElementById('name').value = employee.name;
    document.getElementById('email').value = employee.email;
    document.getElementById('department').value = employee.department;

    formTitle.textContent = 'Edit Employee';
    saveButton.textContent = 'Update Employee';
    cancelButton.hidden = false;

    employeeForm.scrollIntoView({ behavior: 'smooth' });
}

async function deleteEmployee(id) {
    if (!confirm(`Are you sure you want to delete employee ID ${id}?`)) {
        return;
    }

    try {
        await apiRequest(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        showMessage('Employee deleted successfully!');
        await loadEmployees();

    } catch (error) {
        showMessage(error.message, true);
    }
}

function resetForm() {
    employeeForm.reset();
    document.getElementById('employee-id').value = '';

    formTitle.textContent = 'Add New Employee';
    saveButton.textContent = 'Add Employee';
    cancelButton.hidden = true;
}

cancelButton.addEventListener('click', resetForm);
refreshButton.addEventListener('click', loadEmployees);

// Load employees when the website opens.
loadEmployees();
