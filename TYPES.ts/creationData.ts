export interface NewSupplierITC {
  name: string;
  contact: string;
}

export interface GoodsITC {
  id: number
  name: string
  temperature_required: number
}
export interface SupplierITC {
  id: number;
  name: string;
  contact: string;
}

export interface JwtPayloadITC {
  exp: number;
  iat: number;
  id: string;
  identificant: string;
  role: string;
}

export interface Fridge_controledITC {
  id: number,
  temperature: number,
  description: string,
  createdat: string,
  fridge_id: number,
  app_user_id: number
}
export interface FridgeITC {
  id: string;
  name: string;
  temperature_required: string;
  createdat?: string
}
export interface ReceptionITC {
  id: number;
  temperature: number;
  vehicle_compliance: boolean;
  packaging_condition: boolean;
  expiration_date: boolean;
  createdat: string;
  receptionDESC: string;
  supplierName: string;
  goodsName: string;
  warning_status: boolean;
}

export interface WarningITC {
  createdat: string;
  description: string;
  fridgeId: number;
  id: number;
  receptionDesc: string | null;
  receptionId: number | null;
  updatedat: string | null;
  warning_status: boolean;
}
export interface WarningFridgeITC {
  id: string;
  createdat: string;
  description: string;
  fridgeId: string;
  updatedat: string;
}

export interface WarningRecepetionITC {
  id: string;
  createdat: string;
  description: string;
  rcptreception: string;
  receptionId: string;
  updatedat: string;
}

export interface WarningOnlyITC {
  id: string;
  createdat: string;
  updatedat: string | null;
  warning_status: boolean;
  description: string;
  fridge_controle_id: number;
  reception_controle_id: number | null;
}

export interface NotifyAlarmITC {
  id : number
  description : string
  fridge_controle_id ?: number
  fridgeid ?: number
  reception_controle_id? : number
  createdat : string

}

export interface ToolTipITC  {
  legend: string;
  children: React.ReactNode
}
