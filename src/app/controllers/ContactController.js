const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
  async index(request, response) {
    //lsit all registers
    const constacts = await ContactsRepository.findAll();

    response.json(constacts);
  }

  show() {
    // get one register
  }

  store() {
    // create a new register
  }

  update() {
    // update register
  }

  delete() {
    // delete register
  }
}

module.exports = new ContactController();
