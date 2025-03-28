import Cookies from 'js-cookie';

let sessionSecret = "Secret"
const key = new TextEncoder().encode(sessionSecret);

// For getting token from the cookies
export const getCookie = () => {
    let Token = Cookies.get('userToken');

    // console.log("token here: ", Token);

    // If Token exists in the cookies, check with server if it's valid or expired
    if (Token) {
        return Token;
    }
    return null; // Token does not exist in cookies
};

export const getUserRole = () => {
    if (typeof window === "undefined") return null; // Prevents errors during SSR
    return Cookies.get("role") || null;
  };    

export const getUserCookie = (): any | null => {
    let userData = Cookies.get("userData");
  
    if (!userData) {
      console.error("userData cookie is undefined");
      return null; // Avoids parsing undefined
    }
  
    try {
      return JSON.parse(userData);
    } catch (error) {
      console.error("Invalid JSON in userData cookie:", error);
      return null; // Return null if JSON is malformed
    }
  };


// remove a tokken
export const removeToken = () => {
    // Remove the token 
    Cookies.remove('userToken');
    Cookies.remove('userData');
    // and user  data
}
// For getting userData from the cookies
export const getUserDataCookie = () => {
    const userDataString = Cookies.get('userData');
    console.log(userDataString);

    // If userData exists, parse it as JSON and return
    if (userDataString) {
        try {
            const userData = JSON.parse(userDataString);
            return userData;
        } catch (error) {
            console.error('Error parsing userData from cookies:', error);
            return null; // If JSON parsing fails, return null

        }
    }

    return null; // userData does not exist in cookies
};

export const createCookie = async (token: any, userData: any, role: string) => {
    // Set token cookie without expiry
    Cookies.set('userToken', token, { secure: true, SameSite: 'Strict' });

    // set role cookie without expiry
    Cookies.set('role', role, { secure: true, SameSite: 'Strict' });

    // Serialize userData object to a string and set userData cookie without expiry
    const serializedUserData = JSON.stringify(userData);

    Cookies.set('userData', serializedUserData, { secure: true, SameSite: 'Strict' });
};




// login and logout
export const login = async (password: string, email: string, role: string): Promise<boolean | number> => {
    const initLogin = async (): Promise<boolean | number> => {

        const res = await fetch(
            process.env.NEXT_PUBLIC_REACT_APP_API_URL + `${role == 'Tech-Team' ? '/auth/login' : role == 'Promoter' ? '/dashboard/promoter/login' : ''}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, password: password }),
            });

        if (!res.ok) {
            // console.log(`Server error: ${res.status}`);

            return res.status; // Return false on error
        }

        const data: any = await res.json();
        // console.log("Login successful", data);

        // Create cookies based on response
        if (role == 'Tech-Team') {
            console.log('this the tech team')
            createCookie(data.token, data.admin, role);
        } else if (role == 'Promoter') {
            createCookie(data.token, data.promoter, role);
        }

        return true; // Return true if login is successful
    };

    try {
        // Await the result of initLogin and return its result
        return await initLogin();
    } catch (error) {
        // console.error('Login failed', error);
        return false; // If anything goes wrong, return false
    }

};


// get dash data
export const getPaid = async (): Promise<boolean> => {
    const token = getCookie()

    const initUnregistered = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/dashboard/paid-unpaid`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Use Bearer token format
            },
        });

        if (!res.ok) {
            console.log('Error: ', res.status)
            if (res.status == 401) {
                removeToken()
            }
            return res.status
        }

        return res.json()
    }

    try {
        // Await the result of initLogin and return its result
        return await initUnregistered()
    } catch (error) {
        console.error('error', error);
        return false; // If anything goes wrong, return false
    }
}

export const getUnregistered = async (): Promise<any> => {
    const token = getCookie()

    const initUnregistered = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/dashboard/unregistered`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Use Bearer token format
            },
        });

        if (!res.ok) {
            console.log('Error: ', res.status)
            if (res.status == 401) {
                removeToken()
            }
            return res.status
        }

        return res.json()
    }

    try {
        // Await the result of initLogin and return its result
        return await initUnregistered()

    } catch (error) {
        console.error('error: ', error);
        return false; // If anything goes wrong, return false
    }
}


export const promoterData = async (): Promise<any> => {
    const token = getCookie()

    const getPromoData = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/dashboard/promoter/details`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Use Bearer token format
            },
        });

        if (!res.ok) {
            console.log('Error: ', res.status)
            if (res.status == 401) {
                removeToken()
            }

            return res.status
        }

        return res.json()
    }


    try {
        return getPromoData()
    }   catch(error) {
        console.error('error: ', error);
        return false; // If anything goes wrong, return false
    }
}