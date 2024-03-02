import { useState, useEffect } from "react";
import jsonData from "../helpers/Products.json";
import { ProductModels } from "../models/model";


type UseProductGetResult = {
  productData: ProductModels[] | ProductModels;
  isLoading: boolean;
  error: Error | null;
};

const useProductWithId = (id?: number): UseProductGetResult => {
  const [productData, setProductData] = useState<ProductModels[] | ProductModels>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  //  bu customHooks komponentinde bir apiye istek atıp dönen veriyi istediğimiz diğer komponentlerde kullanabiliriz.
  //  bu sayede aynı isteği iki defa yapmak durumunda kalırsak ayrı ayrı istek yapmak yerine bu componentin return
  //  kısmında dönen statei bir fonksiyon gibi istek yapacağımız komponentlerde çağırırız.

  //  örnek istek şeklinde tasarlanmış hali

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id !== undefined) {
          const filteredData = jsonData.filter((product) => product.id === id);
          setProductData(
            filteredData.length > 0 ? filteredData[0] : ({} as ProductModels)
          );
        } else {
          setError(new Error("Id hatası"));
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

export default useProductWithId;
