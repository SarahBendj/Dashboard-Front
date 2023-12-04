import useNotification from "@/hook/useNotification";

export const FETCH_REQUEST = async (request_path: string, METHOD: string, token: string, data?: any): Promise<any> => {
  const { showError, showSucess, showWarning } = useNotification();
  const API: string = 'http://localhost:3003';

  try {
    const requestOptions: RequestInit = {
      method: METHOD,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };

    if (METHOD === 'GET') {
      const response = await fetch(`${API}/${request_path}`, requestOptions);
      console.log(response);

      if (response.ok) {
        const responseData = await response.json();
        return responseData;
      } else {
        const errorText = await response.text();
        console.error(errorText, response.status);
      }
    } else {
      requestOptions.body = JSON.stringify(data);
      const response = await fetch(`${API}/${request_path}`, requestOptions);
      console.log(response);

      if (response.ok) {
        const responseData = await response.json();
        showSucess('Success');
        return responseData;
      } else {
        const errorText = await response.text();
        console.error(errorText, response.status);
        showWarning(errorText);
      }
    }
  } catch (error) {
    console.error('Error:', error);
    if( METHOD !== 'GET') {
      showError('Something went wrong, please try again');

    }
  
  }
};
