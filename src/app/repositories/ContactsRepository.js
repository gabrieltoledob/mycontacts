const { v4 } = require('uuid');
let contacts = [
  {
    id: v4(),
    name: 'John Doe',
    email: 'john@example.com',
    phone: '1234567890',
    category_id: v4(),
  },
  {
    id: v4(),
    name: 'José Silva',
    email: 'jose@example.com',
    phone: '0987654321',
    category_id: v4(),
  },
];

class ContactsRepository {
  findAll() {
    return new Promise((resolve) => resolve(contacts));
  }

  findById(id) {
    return new Promise((resolve) =>
      resolve(contacts.find((contact) => contact.id === id))
    );
  }

  delete(id) {
    return new Promise((resolve) =>
      resolve(
        contacts.find((contact) => {
          contacts = contacts.filter((contact) => contact.id !== id);
          resolve();
        })
      )
    );
  }
}

module.exports = new ContactsRepository();
