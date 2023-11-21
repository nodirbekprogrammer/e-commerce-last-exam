import UniversalData from "@/types/universalData";
import crud from "./crud";

const useAdminProducts = crud<UniversalData>("product");

export default useAdminProducts;
