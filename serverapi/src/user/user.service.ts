import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

@Injectable()
export class UserService {
  private baseUrl = 'https://api.qafinmo.net/';
  private accessKey = '';
  private secretKey = '';
  private credentials = "";
  private encodedCredentials = "";
  private auth_cred = "";

  // setting data when logged in 
  private setdata(aKey, skey) {
    this.accessKey = aKey;
    this.secretKey = skey;
    this.credentials = `${this.accessKey}:${this.secretKey}`;
    this.encodedCredentials = Buffer.from(this.credentials).toString('base64');
    this.auth_cred = `Basic ${this.encodedCredentials}`;
  }

  // setting all values to empty during logout 
  private resetdata() {
    this.accessKey = "";
    this.secretKey = "";
    this.credentials = "";
    this.encodedCredentials = "";
    this.auth_cred = "";
    return true;
  }

  // function for object header 
  private fetchData(url) {
    const value = {
      method: 'get',
      url: `${this.baseUrl}${url}`,
      headers: {
        Authorization: this.auth_cred,
      },
    };
    return value;
  };

  // login true or false 
  async authenticate(): Promise<boolean> {
    const config = this.fetchData('v1/payin-method/all?country=AU&currency=AUD');
    try {
      const response: AxiosResponse = await axios(config);
      return response.status == 200; 
    } catch (error) {
      return false;
    }
  }

  // login true or false with access and secret
  async login(loginData: any): Promise<boolean> {
    const data = JSON.parse(loginData);
    this.setdata(data.accessKey, data.secretKey);
    return this.authenticate();
  }

  // logout true or false 
  async logout(): Promise<boolean> {
    return this.resetdata();
  }

  // get the payin methods
  async payinmethods(): Promise<any> {
    const config = this.fetchData('v1/payin-method/all?country=AU&currency=AUD');
    try {
      const response = await axios(config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // get payout methods 
  async payoutmethods(): Promise<any> {
    const config = this.fetchData('v1/payout-method/all?sender_country=AU&sender_currency=AUD&beneficiary_country=AU&beneficiary_currency=AUD');
    try {
      const response = await axios(config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // authenticating payin 
  async authpayin(): Promise<boolean> {
    const config = this.fetchData('v1/payin-method/all?country=AU&currency=AUD');
    try {
      const response: AxiosResponse = await axios(config);
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }

  // authenticating Payout 
  async authpayout(): Promise<boolean> {
    const config = this.fetchData('v1/payout-method/all?sender_country=AU&sender_currency=AUD&beneficiary_country=AU&beneficiary_currency=AUD');
    try {
      const response: AxiosResponse = await axios(config);
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }

  // get all Payins  
  async payinall(): Promise<any> {
    const config = this.fetchData('v1/payin?status=PENDING');

    try {
      const response: AxiosResponse = await axios(config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // get all customers  
  async allcustomer(): Promise<any> {
    const config = this.fetchData('v1/customer');

    try {
      const response = await axios(config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // individual customer details 
  async customerdetails(customerId: string): Promise<any> {
    const config = this.fetchData(`v1/customer/${customerId}`);
    try {
      const response = await axios(config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // individual payin details  
  async individualpayindetails(payinId: string): Promise<any> {
    const config = this.fetchData(`v1/payin/${payinId}`);

    try {
      const response = await axios(config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // get all payout 
  async payoutall(): Promise<any> {
    const config = this.fetchData('v1/payout?limit=30');

    try {
      const response = await axios(config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // creating a Payin post 
  async createPayin(payinData: any): Promise<any> {
    const data = JSON.stringify(payinData);
    try {
      const config = {
        method: 'post',
        url: `${this.baseUrl}v1/payin`,
        headers: {
          Authorization: `Basic ${Buffer.from(this.credentials).toString('base64')}`,
          'Content-Type': 'application/json',
        },
        data: data,
      };

      const response = await axios(config);
      return response.data;
    } catch (error) {
      return false;
    }
  }

  // creating a post to payout 
  async createPayout(payoutData: any): Promise<void> {
    try {
      const config: AxiosRequestConfig = {
        method: 'post',
        url: `${this.baseUrl}v1/payout`,
        headers: {
          Authorization: `Basic ${Buffer.from(this.credentials).toString('base64')}`,
          'Content-Type': 'application/json',
        },
        data: payoutData,
      };

      await axios(config);
    } catch (error) {
      throw error;
    }
  }

  // Adding customer
  async addcustomer(addcustomerData: any): Promise<void> {
    try {
      const config: AxiosRequestConfig = {
        method: 'post',
        url: `${this.baseUrl}v1/customer`,
        headers: {
          Authorization: `Basic ${Buffer.from(this.credentials).toString('base64')}`,
          'Content-Type': 'application/json',
        },
        data: addcustomerData,
      };

      await axios(config);
    } catch (error) {
      throw error;
    }
  }
}
