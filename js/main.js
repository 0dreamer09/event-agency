let clients = []; // Глобальный массив для клиентов

document.addEventListener("DOMContentLoaded", () => {
    fetch("data/clients.json")
        .then(response => response.json())
        .then(data => {
            clients = data;
            loadClients(clients);
        })
        .catch(error => console.error("Ошибка загрузки данных:", error));
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
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Обработчик формы для добавления клиентов
document.querySelector("#clientForm").addEventListener("submit", (e) => {
    e.preventDefault();

    // Получаем значения из формы
    const name = document.querySelector("#clientName").value;
    const phone = document.querySelector("#clientPhone").value;
    const email = document.querySelector("#clientEmail").value;

    // Генерируем новый ID
    const newId = clients.length > 0 ? clients[clients.length - 1].id + 1 : 1;

    // Создаем новый объект клиента
    const newClient = { id: newId, name, phone, email };

    // Добавляем клиента в массив и обновляем таблицу
    clients.push(newClient);
    loadClients(clients);

    // Очищаем форму
    e.target.reset();
});
