const { FighterRepository } = require('../repositories/fighterRepository');

class FighterService {
    // TODO: Implement methods to work with fighters
    getAll() {
        return FighterRepository.getAll();
    }

    search(id) {
        return FighterRepository.getOne(id);
    }

    save(data) {
        return FighterRepository.create(data);
    }

    update(id, data) {
        return FighterRepository.update(id, data);
    }

    delete(id) {
        FighterRepository.delete(id);
    }
}

module.exports = new FighterService();