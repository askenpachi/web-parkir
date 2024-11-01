export const getClientFromLocalStorage = (): string | null => {
    const clientData = localStorage.getItem('user');
    if (clientData) {
        try {
            const client = JSON.parse(clientData);
            console.log('Client ID:', client.clients[0].id);
            return client.clients[0].id;
        } catch (error) {
            console.error('Error parsing client data:', error);
        }
    }
    return null;
};

export const getIDUserFromLocalStorage = (): string | null => {
    const userData = localStorage.getItem('user');
    if (userData) {
        try {
            const user = JSON.parse(userData);
            return user.id;
        } catch (error) {
            console.error('Error parsing user data:', error);
        }
    }
    return null;
};

export const getTokenFromLocalStorage = (): string | null => {
    const userData = localStorage.getItem('user');
    if (userData) {
        try {
            const user = JSON.parse(userData);
            return user.token;
        } catch (error) {
            console.error('Error parsing user data:', error);
        }
    }
    return null;
};
export const getlocalStorage = (): string | null => {
    const userData = localStorage.getItem('user');
    if (userData) {
        try {
            const user = JSON.parse(userData);
            return user;
        } catch (error) {
            console.error('Error parsing user data:', error);
        }
    }
    return null;
}
export const formatDateToDDMMYY = (date: Date | string): string => {
    const newDate = typeof date === 'string' ? new Date(date) : date;
    const day = String(newDate.getDate()).padStart(2, '0');
    const month = String(newDate.getMonth() + 1).padStart(2, '0'); 
    const year = String(newDate.getFullYear()).slice(-2); 
    return `${day}-${month}-${year}`;
};

export const logout = (): void => {
    localStorage.removeItem('user');
    console.log('User logged out successfully.');
};



