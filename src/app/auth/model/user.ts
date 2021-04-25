export class User {
  id: string;
  login: string;
  surname: string;
  name: string;
  patronymic: string;
  series: string;
  number: string;

  constructor(user?: any) {
    this.id = user && user.id || null;
    this.login = user && user.login || null;
    this.surname = user && user.surname || null;
    this.name = user && user.name || null;
    this.patronymic = user && user.patronymic || null;
    this.series = user && user.series || null;
    this.number = user && user.number || null;
  }
}
