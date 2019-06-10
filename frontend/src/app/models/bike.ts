export class Bike {
    _id: string;
    name: string;
    kms: string;
    description: string;
    constructor(name = '', kms = '', description = ''){
      this.name = name;
      this.kms = kms;
      this.description = description;
    }
  }
