const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
  async index(request, response) {
    //lsit all registers
    const { orderBy } = request.query;
    const constacts = await ContactsRepository.findAll(orderBy);

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

  async store(request, response) {
    // create a new register
    const { name, email, phone, category_id } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const contactExists = await ContactsRepository.findByEmail(email);

    if (contactExists) {
      return response
        .status(400)
        .json({ error: 'This e-mail is already in use' });
    }

    const contact = await ContactsRepository.create({
      name,
      email,
      phone,
      category_id,
    });

    response.json(contact);
  }

  async update(request, response) {
    // update register
    const { id } = request.params;
    const { name, email, phone, category_id } = request.body;

    const contactExists = await ContactsRepository.findById(id);
    if (!contactExists) {
      return response.status(404).json({ error: 'User not found' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const contactByEmail = await ContactsRepository.findByEmail(email);

    if (contactByEmail && contactByEmail.id !== id) {
      return response
        .status(400)
        .json({ error: 'This e-mail is already in use' });
    }

    const contact = await ContactsRepository.update(id, {
      name,
      email,
      phone,
      category_id,
    });
    response.json(contact);
  }

  async delete(request, response) {
    // delete register
    const { id } = request.params;

    await ContactsRepository.delete(id);
    // 204: No Content
    response.sendStatus(204);
  }
}

module.exports = new ContactController();
