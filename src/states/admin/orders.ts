import UniversalData from "@/types/universalData";
import crud from "./crud";

const useOrders = crud<UniversalData>("payment");

export default useOrders;
