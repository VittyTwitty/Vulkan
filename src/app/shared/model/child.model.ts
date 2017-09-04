export class Child {
  public name: string;
  public surname: string;
  public id: number;
  public time: string;
  public countTime: number;

  constructor(data) {
    this.name = data.name;
    this.surname = data.surname;
    this.id = data.id;
    this.time = data.time;
    this.countTime = data.countTime;
  }

  get fullName() {
    return `${this.name} ${this.surname}`;
  }

  public getUser() {
    return {
      name: this.name,
      surname: this.surname,
      id: this.id,
      time: this.time,
      countTime: this.countTime
    };
  }
}
