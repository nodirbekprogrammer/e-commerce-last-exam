import UniversalData from "@/types/universalData";
import crud from "./crud";

const useCategory = crud<UniversalData>("category");

export default useCategory;
