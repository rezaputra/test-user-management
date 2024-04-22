import useSWR from "swr"
import axios from "axios"

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

export function useMenusByApplicationId(applicationId: string) {
    const { data, error, mutate } = useSWR(`/api/menus?applicationId=${applicationId}`, fetcher)

    return {
        menus: data,
        isLoading: !error && !data,
        isError: error,
        mutate,
    }
}
