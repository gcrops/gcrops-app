export interface RootObject {
  message: string;
  data: Datum[];
}

export interface Datum {
  latitude: number;
  longitude: number;
}
