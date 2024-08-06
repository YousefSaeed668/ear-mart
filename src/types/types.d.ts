type Category = {
  CategoryName: string;
};
type FileOrString = File | string;

type ProductVariant = {
  Color: string;
  Size: string;
  Price: number;
  StockQuantity: number;
  DiscountPercent: number;
};

type FileImage = {
  FileUrl: string;
};

type Product = {
  ProductId: number;
  ProductTitle: string;
  SubTitle: string;
  Slug: string;
  ProductDescription: string;
  DiscountPercent: number;
  ThumbnailUrl: string;
  ProductStatus: string;
  Quantity: number;
  CategoryName: string;
  SubCategoryNames: string[];
  ProductVariants: ProductVariant[];
  Files: FileImage[];
};
