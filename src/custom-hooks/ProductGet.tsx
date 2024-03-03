import { useState, useEffect } from "react";
import jsonData from "../helpers/Products.json";

type productData = {
  id: number;
  price: number;
  name: string;
  category: string;
  currency: string;
  image_name: string;
  color: string;
};

type UseUserDataResult = {
  productData: productData[];
  isLoading: boolean;
  error: Error | null;
};

const useProductGet = () => {
  const [productData, setProductData] = useState<productData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  //  bu customHooks komponentinde bir apiye istek atıp dönen veriyi istediğimiz diğer komponentlerde kullanabiliriz.
  //  bu sayede aynı isteği iki defa yapmak durumunda kalırsak ayrı ayrı istek yapmak yerine bu componentin return
  //  kısmında dönen statei bir fonksiyon gibi istek yapacağımız komponentlerde çağırırız.

  //  örnek istek şeklinde tasarlanmış hali

  useEffect(() => {
    const fetchData = async () => {
      try {
        setProductData(jsonData);
      } catch (error) {
        if (error instanceof SyntaxError) {
          setError(new Error(error.message));
        } else {
          setError(new Error("Ağ hatası"));
        }
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { productData, isLoading, error } as UseUserDataResult;
};

export default useProductGet;
