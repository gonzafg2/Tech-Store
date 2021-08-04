interface dataAccess {
  email: string;
  id: number;
  name: string;
  token: string;
}

interface dataLogin {
  email: string;
  password: string;
}

interface dataAPIAccess {
  access_token: string;
  user: dataUserAPIAccess;
}

interface dataUserAPIAccess {
  email: string;
  name: string;
  id: number;
  email_verified_at: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export { dataAccess, dataLogin, dataAPIAccess };
