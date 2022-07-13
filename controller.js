const data = require("./data");
const { getReqData } = require("./utils");

class Controller {
    // getting all users
    async getusers() {
        // return all users
        return new Promise((resolve, _) => resolve(data));
    }

    // getting a single user by id
    async getuser(id) {
        return new Promise((resolve, reject) => {
            // get the user
            let user = data.find((user) => user.id === parseInt(id));
            if (user) {
                // return the user
                resolve(user);
            } else {
                // return an error
                reject(`user with id ${id} not found `);


            }
        });
    }
    //getting a single user by id
    async getuserbyname(id) {
        return new Promise((resolve, reject) => {
            // get the user
            let user = data.find((user) => user.id === parseInt(id));
            if (user) {
                // return the user
                resolve(user);
            } else {
                // return an error
                reject(`user with id ${id} not found `);
            }
        });
    }

    // creating a user
    async createuser(user) {
        return new Promise((resolve, _) => {
            // create a user, with random id and data sent
            let newuser = {
                id: Math.floor(4 + Math.random() * 10),
                ...user,
            };

            // return the new created user
            resolve(newuser);
        });
    }

    // updating a user
    async updateuser(id,user_data) {
        return new Promise(async(resolve, reject) => {
            // get the user.
            
            let user = data.find((user) => user.id === parseInt(id));
            // if no user, return an error
            if (!user) {
                reject(`No user with id ${id} found`);
            }
            //else, update it by setting completed to true
            user = {...user,...user_data}
            user["completed"] = true;
            // return the updated user
            resolve(user);
        });
    }

    // deleting a user
    async deleteuser(id) {
        return new Promise((resolve, reject) => {
            // get the user
            let user = data.find((user) => user.id === parseInt(id));
            // if no user, return an error
            if (!user) {
                reject(`No user with id ${id} found`);
            }
            // else, return a success message
            resolve(`user deleted successfully`);
        });
    }
}
module.exports = Controller;