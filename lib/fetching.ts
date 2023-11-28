
export const FETCH_REQUEST = async (request_path: string, METHOD: string, token: string, data?: any): Promise<any> => {
    const API: string = 'http://localhost:3003';
    try {
      const requestOptions: RequestInit = {
        method: METHOD,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };
  
      if (METHOD !== 'GET') {
        requestOptions.body = JSON.stringify(data);

      }
  
      const response = await fetch(`${API}/${request_path}`, requestOptions);
     console.log(response)
  
      if (response.ok) {
        const responseData = await response.json();
        return responseData;
      } else {
        console.error('Request failed with status:', response.status);
      
      
    } }catch (error) {
      console.error('Error:', error);
  
  
    }
  }
