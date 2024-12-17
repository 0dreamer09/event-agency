let clients = []; // Глобальный массив для клиентов

document.addEventListener("DOMContentLoaded", () => {
    // Загружаем данные из LocalStorage или JSON
    const savedClients = localStorage.getItem("clients");
    if (savedClients) {
        clients = JSON.parse(savedClients); // Загружаем из LocalStorage
        console.log("Данные загружены из LocalStorage.");
    } else {
        // Загружаем из файла JSON при первом запуске
        fetch("data/clients.json")
            .then(response => {
                if (!response.ok) throw new Error("Ошибка загрузки JSON");
                return response.json();
            })
            .then(data => {
                clients = data;
                saveToLocalStorage();
                console.log("Данные загружены из JSON.");
            })
            .catch(error => console.error("Ошибка:", error));
    }
    loadClients(clients); // Обновляем таблицу
});

// Функция для отображения клиентов в таблице
function loadClients(clients) {
    const tableBody = document.querySelector("#clientsTable tbody");
    tableBody.innerHTML = ""; // Очистка таблицы

    clients.forEach(client => {
        const row = `
            <tr>
                <td>${client.id}</td>
                <td>${client.name}</td>
                <td>${client.phone}</td>
                <td>${client.email}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="deleteClient(${client.id})">
                        Удалить
                    </button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Обработчик формы добавления клиента
document.querySelector("#clientForm").addEventListener("submit", (e) => {
    e.preventDefault();

    // Считываем значения из формы
    const name = document.querySelector("#clientName").value.trim();
    const phone = document.querySelector("#clientPhone").value.trim();
    const email = document.querySelector("#clientEmail").value.trim();

    if (name && phone && email) {
        // Генерируем новый ID
        const newId = clients.length > 0 ? clients[clients.length - 1].id + 1 : 1;

        // Создаем объект нового клиента
        const newClient = { id: newId, name, phone, email };

        // Добавляем клиента в массив
        clients.push(newClient);

        // Сохраняем в LocalStorage
        saveToLocalStorage();

        // Обновляем таблицу
        loadClients(clients);

        // Очищаем форму
        e.target.reset();

        console.log("Новый клиент добавлен:", newClient);
    } else {
        console.error("Все поля формы должны быть заполнены.");
    }
});

// Функция удаления клиента
function deleteClient(id) {
    // Находим индекс клиента с указанным ID
    const index = clients.findIndex(client => client.id === id);
    if (index !== -1) {
        // Удаляем клиента из массива
        clients.splice(index, 1);

        // Сохраняем в LocalStorage
        saveToLocalStorage();

        // Обновляем таблицу
        loadClients(clients);

        console.log(`Клиент с ID ${id} удален.`);
    } else {
        console.error(`Клиент с ID ${id} не найден.`);
    }
}

// Функция сохранения данных в LocalStorage
function saveToLocalStorage() {
    localStorage.setItem("clients", JSON.stringify(clients));
    console.log("Данные сохранены в LocalStorage.");
}
