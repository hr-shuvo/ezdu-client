import httpClient from "@/lib/httpClient";





export const updateUser = async (userData: any) => {
  try {
    const response = await httpClient.put(`/users/update-user`, userData);

    // console.log(response.data)
    if (response.status === 201 || response.status === 200) {
      return { success: response.data.data };
    }
    return { error: response?.data?.msg };
  } catch (err: any) {
    // console.error(err.message);
    // console.error(err);

    return { error: err.response?.data?.msg };
  }
};