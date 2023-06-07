const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
  async index(request, response) {
    //lsit all registers
    const constacts = await ContactsRepository.findAll();

    response.json(constacts);
  }

  async show(request, response) {
    // get one register
    const { id } = request.params;
    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'User not found' });
    }

    response.json(contact);
  }

  store(request, response) {
    // create a new register
  }

  update(request, response) {
    // update register
  }

  async delete(request, response) {
    // delete register
    const { id } = request.params;
    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      // 404: Not Found
      return response.status(404).json({ error: 'User not found' });
    }

    await ContactsRepository.delete(id);
    // 204: No Content
    response.sendStatus(204);
  }
}

module.exports = new ContactController();
