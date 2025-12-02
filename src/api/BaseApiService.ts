import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import SessionCookieStore from "../session/SessionCookieStore";
import { API_BASE_URL_ANDROID, API_BASE_URL_IOS } from "../utils/ApiConfig";
import { Platform } from "react-native";

export default class BaseApiService {
  protected client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: Platform.OS === "android" ? API_BASE_URL_ANDROID : API_BASE_URL_IOS,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    // → Cookie ekleme
    this.client.interceptors.request.use(async config => {
      const cookie = SessionCookieStore.get();

      if (cookie) {
        config.headers["Cookie"] = cookie;
      }

      return config;
    }); 

    // Cookie yakalama (login olduktan sonra)
    this.client.interceptors.response.use(
      response => {
        const setCookie = response.headers["set-cookie"];

        if (setCookie && Array.isArray(setCookie)) {
          SessionCookieStore.set(setCookie[0]); 
          console.log("SESSION COOKIE STORED:", setCookie[0]);
        }

        return response;
      },
      error => {
        return Promise.reject(error);
      }
        );
  }

  protected async getWithConfig<T>(url: string,config?:AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url,config);
    return response.data;
  }

  protected async get<T>(url: string): Promise<T> {
    const response = await this.client.get<T>(url);
    return response.data;
  }

  protected async post<T>(url: string, data?: any): Promise<T> {
    const response = await this.client.post<T>(url, data);
    return response.data;
  }

    protected async put<T>(url: string, data?: any): Promise<T> {
    const response = await this.client.put<T>(url, data);
    return response.data;
  }

   protected async patch<T>(url: string, data: any): Promise<T> {
    const response = await this.client.patch<T>(url, data);
    return response.data;
  }

  protected async delete<T>(url: string): Promise<T> {
    const response = await this.client.delete<T>(url);
    return response.data;
  }
}
