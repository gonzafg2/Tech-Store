export interface dataAccess {
  email: string;
  id: number;
  name: string;
  token: string;
}

export interface dataLogin {
  email: string;
  password: string;
}

export interface dataAPIAccess {
  access_token: string;
  user: dataUserAPIAccess;
}

export interface dataUserAPIAccess {
  email: string;
  name: string;
  id: number;
  email_verified_at: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface dataItems {
  id: number;
  name: string;
  quantity: string;
  status: string;
}
export interface dataItemsDetails {
  id: number;
  name: string;
  quantity: string;
  status: string;
  description: string;
  categoryId: number;
  priceTaxExcluded: number;
  index: number;
}
