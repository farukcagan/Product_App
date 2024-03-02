import { useState, useEffect } from "react";
import jsonData from "../helpers/Products.json";

type ProductData = {
  id: number;
  price: number;
  name: string;
  category: string;
  currency: string;
  image_name: string;
  color: string;
  description: string
};

type UseProductGetResult = {
  productData: ProductData[] | ProductData;
  isLoading: boolean;
  error: Error | null;
};

const UseProductWithId = (id?: any): UseProductGetResult => {
  const [productData, setProductData] = useState<ProductData[] | ProductData>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id !== undefined) {
          const filteredData = jsonData.filter((product) => product.id === id);
          setProductData(filteredData.length > 0 ? filteredData[0] : {} as ProductData);
        } else {
          setProductData(jsonData);
        }
      } catch (error) {
        if (error instanceof SyntaxError) {
          setError(new Error(error.message));
        } else {
          setError(new Error("Ağ hatası"));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { productData, isLoading, error };
};

export default UseProductWithId;
