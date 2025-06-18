import axios from "axios";
const baseUrl = import.meta.env.VITE_API_URL;
const access_token = localStorage.getItem('access_token')

export const getUser = async () => {
    const url = `${baseUrl.replace(/\/$/, '')}/users/profile`;
    const response = await axios.get(url, {
        headers: {
            authorization: `Bearer ${access_token}`,
        },
    });
    return response.data;

}

export const getAllUser = async () => {
    const url = `${baseUrl.replace(/\/$/, '')}/users`;
    const response = await axios.get(url, {
        headers: {
            authorization: `Bearer ${access_token}`,
        },
    });
    return response.data;

}

export const updateUser = async (
    userId: number | string,
    payload: {

        name?: string;
        email?: string;
        password?: string;
        role?: string;
        status?: boolean;

    }
) => {
    const url = `${baseUrl.replace(/\/$/, "")}/users/${userId}`;
    const { data } = await axios.patch(url, payload, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });

    return data;
};

export const getUserById = async (userId: number) => {
    const url = `${baseUrl.replace(/\/$/, "")}/users/${userId}`;
    const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${access_token}` },
    });
    return response.data;
};
export const getUserInative = async (daysFilter: number) => {
    const url = `${baseUrl.replace(/\/$/, "")}/users/inactive?days${daysFilter}`;
    const response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });
    console.log(response.data);
    return response.data;
};
export const deleteUser = async (userId: number) => {
    const url = `${baseUrl.replace(/\/$/, "")}/users/${userId}`;
    const response = await axios.delete(url, {
        headers: { Authorization: `Bearer ${access_token}` },
    });
    return response.data;
};



