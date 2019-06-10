export class Station {
    _id: string;
    name: string;
    state: string;
    description: string;

  constructor(name = '', state = '', description = ''){
    this.name = name;
    this.state = state;
    this.description = description;
  }
}