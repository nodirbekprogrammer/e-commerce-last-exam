import { create } from "zustand";

import photoData from "@/types/photo";
import {request} from "@/server/request";
import { UseFormReset } from "react-hook-form";
import UseFormInputs from "@/types/formInputs";
import { toast } from "react-toastify";
import { LIMIT } from "@/constants";

const crud = <T>(url: string) => {
  interface initialStateTypes {
    allData: T[];
    loading: boolean;
    photoLoad: boolean;
    photo: photoData | null;
    page: number;
    total: number;
    selected: null | string;
    search: string;
    category: string;
    isModalOpen: boolean;
    isModalLoad: boolean;
    closeModal: () => void;
    showModal: (reset: UseFormReset<UseFormInputs>) => void;
    getAllData: (search: string, page: number) => void;
    addData: (values: object) => void;
    getSingleData: (id: string, reset: UseFormReset<UseFormInputs>) => void;
    updateData: (values: object, id: string) => void;
    uploadPhoto: (file: FormData) => void;
    deleteData: (id: string) => void;
    handleSearch: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    setPage: (page: number) => void;
    setCategory: (id: string) => void;
    confirm: (id: string) => void;
    cancel: (id: string) => void;
  }

  return create<initialStateTypes>()((set, get) => {
    const setState = (newState: object) => {
      return set((state) => ({ ...state, ...newState }));
    };

    return {
      allData: [],
      loading: false,
      photoLoad: false,
      photo: null,
      page: 1,
      total: 0,
      selected: null,
      search: "",
      category: "",
      isModalOpen: false,
      isModalLoad: false,
      closeModal: () => {
        setState({ isModalOpen: false, photo: null });
      },
      showModal: (reset) => {
        setState({
          isModalOpen: true,
          selected: null,
          photo: null,
          category: "",
        });
        reset({
          firstName: "",
          lastName: "",
          username: "",
          phoneNumber: "",
          password: "",
          title: "",
          price: "",
          image: {
            url: "",
            public_id: "",
          },
          quantity: "",
        });
      },
      getAllData: async (search, page) => {
        try {
          const params = {
            search,
            page,
            limit: LIMIT,
          };
          setState({ loading: true });
          const { data } = await request.get(url, {
            params,
          });
          let newData;
          if (url === "user") {
            newData = data.users?.map((el: object, i: number) => ({
              ...el,
              key: i,
            }));
          } else if (url === "product") {
            newData = data.products?.map((el: object, i: number) => ({
              ...el,
              key: i,
            }));
          } else if (url === "category" || url === "payment") {
            newData = data.map((el: object, i: number) => ({
              ...el,
              key: i,
            }));
          }
          setState({ allData: newData, total: data?.total ?? newData?.length });
        } finally {
          setState({ loading: false });
        }
      },
      addData: async (values) => {
        try {
          setState({ isModalLoad: true });
          await request.post(url, values);
          const { page, search, getAllData } = get();
          setState({ isModalOpen: false });
          getAllData(search, page);
        } finally {
          setState({ isModalLoad: false });
        }
      },
      getSingleData: async (id, reset) => {
        setState({ selected: id });
        const { data } = await request.get<UseFormInputs>(`${url}/${id}`);
        reset(data);
        setState({
          isModalOpen: true,
          photo: data.image,
          category: data?.category,
        });
      },
      updateData: async (values, id) => {
        try {
          setState({ isModalLoad: true });
          await request.put(`${url}/${id}`, values);
          const { page, search, getAllData } = get();
          setState({ isModalOpen: false });
          getAllData(search, page);
        } finally {
          setState({ isModalLoad: false });
        }
      },
      uploadPhoto: async (file) => {
        try {
          setState({ photoLoad: true });
          const { data } = await request.post(`upload`, file);
          setState({ photo: data });
        } finally {
          setState({ photoLoad: false });
        }
      },
      deleteData: async (id) => {
        await request.delete(`${url}/${id}`);
        const { getAllData, search, page } = get();
        getAllData(search, page);
      },
      handleSearch: (e) => {
        setState({ search: e.target.value, page: 1 });
      },
      setPage: (page) => {
        setState({ page });
      },
      setCategory: (id) => {
        setState({ category: id });
      },
      confirm: async (id) => {
        try {
          setState({ loading: true });
          const { data } = await request.post(`${url}/${id}`);
          toast.info(data.msg);
        } finally {
          setState({ loading: false });
        }
      },
      cancel: async (id) => {
        try {
          setState({ loading: true });
          const { data } = await request.put(`${url}/${id}`);
          toast.info(data.msg);
        } finally {
          setState({ loading: false });
        }
      },
    };
  });
};

export default crud;
