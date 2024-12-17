document.addEventListener("DOMContentLoaded", () => {
    // Загружаем данные клиентов из JSON
    fetch("data/clients.json")
        .then(response => response.json())
        .then(data => loadClients(data))
        .catch(error => console.error("Ошибка загрузки данных:", error));
});

// Функция для отображения клиентов в таблице
function loadClients(clients) {
    const tableBody = document.querySelector("#clientsTable tbody");

    // Очищаем таблицу перед загрузкой
    tableBody.innerHTML = "";

    // Добавляем строки с данными клиентов
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
document.querySelector("#refreshButton").addEventListener("click", () => {
    fetch("data/clients.json")
        .then(response => response.json())
        .then(data => loadClients(data))
        .catch(error => console.error("Ошибка загрузки данных:", error));
});
