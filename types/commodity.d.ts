interface Commodity {
  categoryTitle: string;
  price: number;
  saleCnt?: number;
  goodsSkuList: Sku[];
  goodsSkus: Sku[];
  detailPics: string[];

  category: number;
  categoryId: number;
  id: number;
  name: string;
  mainPics: string[];
  sellingPrice: string;
  costPrice: string;
  originalPrice: string;
  profit: string;
  profitability: string;
  isCollectTax: boolean;
  updateAt: Date;
  createAt: number;
  status: 'ONLINE' | 'OFFLINE';
}

interface Sku {
  id?: number;
  skuType: SkuType;
  skuTypeDesc: string;
  linePrice: string;
  discountPrice: string;
  costPrice: string;
  stock: string;
  saleStatus: SaleStatus;
  imageUrl?: string;
  desc?: string;
}
