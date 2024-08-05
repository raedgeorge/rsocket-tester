export type Item = {
  itemName: string;
  itemType: string;
  kdsName: string;
  kpName: string;
  desc: string;
  imgWebUrl: string;
  imgLocalUrl: string;
  location: string;
  clientId: string;
  clientUid: number;
  itemUUid: string;
  barCode: string;
  inventoryId: number;
  lastUpdated: number;
  additionalTip: number;
  brandId: number;
  categoryId: number;
  cost: number;
  departmentId: number;
  familyId: number;
  itemSpecialPrice: number;
  itemNum: number;
  itemPrice: number;
  minPrice: number;
  numPerCase: number;
  points: number;
  reorderLevel: number;
  sectionId: number;
  stock: number;
  storeId: number;
  companyId: number;
  subfamilyId: number;
  tipPercent: number;
  vendorPartNumber: number;
  color: number;
  position: number;
  hasMM: boolean;
  hasKDS: boolean;
  hasKP: boolean;
  hasCombo: boolean;
  showOnTS: boolean;
  hasTip: boolean;
  checkId: boolean;
  askPrice: boolean;
  disabled: boolean;
  checkId2: boolean;
  taxable: boolean;
  autoWeigh: boolean;
  countItem: boolean;
  itemOnHH: boolean;
  itemSpecial: boolean;
  itemHasMod: boolean;
  itemHasModG: boolean;
  askQuantity: boolean;
  askDescription: boolean;
  foodStampAble: boolean;
  hasBulkPrice: boolean;
  kpId: string[];
  kdsId: string[];
  taxTypes: string[];
};