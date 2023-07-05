const CategoriesRepository = require('../repositories/CategoriesRepository');

class CategoryController {
  async index(resquest, response) {
    const categories = await CategoriesRepository.findAll();
    response.json(categories);
  }

  async store(resquest, response) {
    const { name } = resquest.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const category = await CategoriesRepository.create({ name });

    response.json(category);
  }
}

module.exports = new CategoryController();