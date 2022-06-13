const { FightRepository } = require('../repositories/fightRepository');

class FightService {
    // OPTIONAL TODO: Implement methods to work with fights
    getAll() {
        return FightRepository.getAll();
    }

    search(id) {
        return FightRepository.getOne(id);
    }

    save(data) {
        return FightRepository.create(data);
    }

    update(id, data) {
        return FightRepository.update(id, data);
    }

    delete(id) {
        FightRepository.delete(id);
    }
}

module.exports = new FightService();