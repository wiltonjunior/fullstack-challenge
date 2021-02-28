const { TypeProfessional } = require("../models");

class TypeProfessionalController {
  async index(req, res) {
    try {
      const response = await TypeProfessional.findAll();
      return res.json({ data: response });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async store({ body }, res) {
    try {
      const response = await TypeProfessional.create(body);
      return res.status(201).json({ data: response });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async read(req, res) {
    try {
      const { id } = req.params;
      const response = await TypeProfessional.findByPk(id);
      if (!response) res.status(404).json({ message: "TYPE_PROFESSIONAL_NOT_FOUND" });
      return res.status(200).json({ data: response });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async update({ body, params }, res) {
    try {
      const { id } = params;
      const { description, phone, situation } = body;
      const response = await TypeProfessional.findByPk(id);
      if (!response) {
        return res.status(404).json({ message: "TYPE_PROFESSIONAL_NOT_FOUND" });
      }
      response.description = description;
      response.phone = phone;
      response.situation = situation;
      await response.save();
      return res.status(200).json({ data: body });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const response = await TypeProfessional.findByPk(id);
      if (!response) res.status(404).json({ message: "TYPE_PROFESSIONAL_NOT_FOUND" });
      await response.destroy();
      return res.status(204).end();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new TypeProfessionalController();
