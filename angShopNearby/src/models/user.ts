export class User {
  idUser: string = null;
  email: string = null;
  lat: number;
  lon: number;
  password: string;

  constructor(idUser: string, email: string, lat: number, lon: number) {
    this.idUser = idUser;
    this.email = email;
    this.lat = lat;
    this.lon = lon;
  }
}
