import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse,AxiosRequestConfig } from 'axios';

@Injectable()
export class UserService {
  private baseUrl = 'https://api.qafinmo.net/';
  private accessKey = '';
  private secretKey = '';
  private credentials = "";
  // private accessKey = 'AK_FINMO_SBX_46CB8F4C4D4B4942A26D62094FC03D1E';
  // private secretKey = 'SK_FINMO_SBX_C8EB585A_CF94_46EB_BE02_40BF3BCB03B7';
  private encodedCredentials = "";
  private auth_cred="" ;

 
  private setdata(aKey,skey){
    this.accessKey=aKey
    this.secretKey=skey
    this.credentials= `${this.accessKey}:${this.secretKey}`
    this.encodedCredentials=Buffer.from(this.credentials).toString('base64');
    this.auth_cred=`Basic ${this.encodedCredentials}`;
  }

  private resetdata(){
    this.accessKey=""
    this.secretKey=""
    this.credentials= ""
    this.encodedCredentials="";
    this.auth_cred="";
    return true;
  }

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
      console.log(response.status)
      return response.status == 200; // Return true if the response status is 200 (success)
    } catch (error) {
      console.log(error);
      // throw error;
      return false;
    }
  }

    // login true or false 
    async login(loginData: any): Promise<boolean> {
      const data = JSON.parse(loginData);
      this.setdata(data.accessKey,data.secretKey)
      return this.authenticate();
    }
 // logout true or false 
    async logout(): Promise<boolean> {
      
      return this.resetdata();
    }
    


  // get the payin lists
  async payinmethods(): Promise<any> {
    const config = this.fetchData('v1/payin-method/all?country=AU&currency=AUD')

    try {
      const response= await axios(config);
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
        const response:AxiosResponse = await axios(config);
        return response.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    } 
        // get payinall  
        async allcustomer(): Promise<any> {
          const config = this.fetchData('v1/customer')
        
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
  
  
  async createPayin(payinData: any): Promise<any> {
    const data = JSON.stringify(payinData);
    try {
      const config  = {
        method: 'post',
        url: `${this.baseUrl}v1/payin`,
        headers: {
          Authorization: `Basic ${Buffer.from(this.credentials).toString('base64')}`,
          'Content-Type': 'application/json',
        },
        data: data,
      };
    
      const response=await axios(config);
      return response.data;
    } catch (error) {
      return false
      // throw error;
    }
  }
  
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

