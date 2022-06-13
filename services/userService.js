const { UserRepository } = require('../repositories/userRepository');

class UserService {

    // TODO: Implement methods to work with user
    getUsers() {
        return UserRepository.getAll();
    }

    save(user) {
        return UserRepository.create(user);
    }

    search(search) {
        const item = UserRepository.getOne(search);
        if (!item) {
            return null;
        }
        return item;
    }

    update(id, data) {
        return UserRepository.update(id, data);
    }

    delete(id) {
        UserRepository.delete(id);
    }
}

module.exports = new UserService();