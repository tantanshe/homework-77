import {promises as fs} from 'fs';
import {Guest} from './types';

const fileName = './db.json';
let data: Guest[] = [];
const fileDb = {
  async init() {
    try {
      const fileContents = await fs.readFile(fileName);
      data = JSON.parse(fileContents.toString());
    } catch (e) {
      data = [];
    }
  },
  async getGuests() {
    return data;
  },
  async addGuest(item: Guest) {
    const id = crypto.randomUUID();
    const guest = {
      id,
      ...item
    };
    data.push(guest);
    await this.save();
    return guest;
  },
  async save() {
    await fs.writeFile(fileName, JSON.stringify(data, null, 2));
  }
};

export default fileDb;