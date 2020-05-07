export interface Item {
  id: number;
  name: string;
  note: string;
  type: string;
  active: boolean;
}

export interface Store {
    id: number;
    name: string;
    location: string;
    note: string;
}

export interface StoreItem {
    store: Store;
    item: Item;
}
