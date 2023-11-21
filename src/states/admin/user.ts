import UniversalData from "@/types/universalData";
import crud from "./crud";

const useUser = crud<UniversalData>("user");

export default useUser;
