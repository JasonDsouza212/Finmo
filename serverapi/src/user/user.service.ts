import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse,AxiosRequestConfig } from 'axios';

@Injectable()
export class UserService {
  private baseUrl = 'https://api.qafinmo.net/';
  private accessKey = 'AK_FINMO_SBX_216E44195E9E41EF95A8A653C340026C';
  private secretKey = 'SK_FINMO_SBX_E77FC2D5_C6E0_420C_AE81_89F914ED4773';

  private credentials = `${this.accessKey}:${this.secretKey}`;
  private encodedCredentials = Buffer.from(this.credentials).toString('base64');
  private auth_cred= `Basic ${this.encodedCredentials}`;


  // function for obj header 
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
    const config = this.fetchData('v1/payin-method/all?country=AU&currency=AUD')
    console.log(config)
    try {
      const response: AxiosResponse = await axios(config);
      console.log(config)
      return response.status === 200; // Return true if the response status is 200 (success)
    } catch (error) {
      console.log(error);
      // throw error;
      return false;
    }
  }

  // get the payin lists
  async payinmethods(): Promise<any> {
    const config = this.fetchData('v1/payin-method/all?country=AU&currency=AUD')

    try {
      const response: AxiosResponse = await axios(config);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // get payout methods 
  async payoutmethods(): Promise<any> {
    const config = this.fetchData('v1/payout-method/all?sender_country=AU&sender_currency=AUD&beneficiary_country=AU&beneficiary_currency=AUD')
  
    try {
      const response = await axios(config);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }  
  
  // authenticating payin 
  async authpayin(): Promise<boolean> {
    const config = this.fetchData('v1/payin-method/all?country=AU&currency=AUD')
  
    try {
      const response: AxiosResponse = await axios(config);
      return response.status === 200; // Return true if the response status is 200 (success)
    } catch (error) {
      console.log(error);
      // throw error;
      return false;
    }
  }

    // authenticating Payout 
    async authpayout(): Promise<boolean> {
      const config = this.fetchData('v1/payout-method/all?sender_country=AU&sender_currency=AUD&beneficiary_country=AU&beneficiary_currency=AUD')
    
      try {
        const response: AxiosResponse = await axios(config);
        return response.status === 200; // Return true if the response status is 200 (success)
      } catch (error) {
        console.log(error);
        // throw error;
        return false;
      }
    }

      // get payinall  
  async payinall(): Promise<any> {
    const config = this.fetchData('v1/payin?status=PENDING')
  
    try {
      const response = await axios(config);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  } 

  // get payoutall 
  async payoutall(): Promise<any> {
    const config = this.fetchData('v1/payout?limit=30')
  
    try {
      const response = await axios(config);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
  
  async createPayin(payinData: any): Promise<boolean> {
    const data = JSON.stringify(payinData);
  
    const config: AxiosRequestConfig = {
      method: 'post',
      url: `${this.baseUrl}v1/payin`,
      headers: {
        Authorization: this.auth_cred,
        'Content-Type': 'application/json',
      },
      data: data,
    };
  
    try {
      await axios(config);
      return true;
    } catch (error) {
      throw error;
    }
  }
  
  async createPayout(payoutData: any): Promise<void> {
    try {
      const config: AxiosRequestConfig = {
        method: 'post',
        url: `${this.baseUrl}v1/payout`,
        headers: {
          Authorization: this.auth_cred,
          'Content-Type': 'application/json',
        },
        data: payoutData,
      };
  
      await axios(config);
    } catch (error) {
      throw error;
    }
  }
  
  
}

