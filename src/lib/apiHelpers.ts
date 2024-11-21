import axiosClient from '@/axiosConfig';

interface GetRequestParams {
    url: string;
    params?: Record<string, any>; 
  }
  
  export const getRequest = async ({ url, params = {} }: GetRequestParams): Promise<any> => {
    try {
      const res = await axiosClient.get(url, { params });
      return res.data;
    } catch (err) {
      return err; 
    }
  };

  interface PostRequestParams {
    url: string;
    data?: Record<string, any>; 
    params?: Record<string, any>; 
  }
  
  export const postRequest = async ({ url, data }: PostRequestParams): Promise<any> => {
    try {
      const res = await axiosClient.post(url, data);
      return res.data;
    } catch (err) {
      return err; // Consider handling the error more explicitly
    }
  };