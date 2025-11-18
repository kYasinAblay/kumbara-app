import axios, { AxiosInstance } from "axios";
import { API_BASE_URL_ANDROID,API_BASE_URL_IOS } from "../utils/ApiConfig";
import { Platform } from "react-native";

export default class BaseApiService {
  protected client: AxiosInstance;

  constructor() {

    this.client = axios.create({
      baseURL: Platform.OS ==="android"? API_BASE_URL_ANDROID : API_BASE_URL_IOS,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  protected async get<T>(url: string): Promise<T> {
    const response = await this.client.get<T>(url);
    return response.data;
  }

  protected async post<T>(url: string, data?: any): Promise<T> {
    const response = await this.client.post<T>(url, data);
    return response.data;
  }

  protected async delete<T>(url: string): Promise<T> {
    const response = await this.client.delete<T>(url);
    return response.data;
  }
}
