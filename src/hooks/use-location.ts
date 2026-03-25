import {
  fetchLgasByStateRequest,
  fetchStatesRequest,
} from "@/services/location.service";
import { useQuery } from "@tanstack/react-query";

export const useLocationHook = () => {
  const useGetAllStates = () => {
    return useQuery({
      select: (data) => data.data,
      queryKey: ["STATES"],
      queryFn: () => fetchStatesRequest(),
    });
  };
  const useGetLGAByState = (state?: string) => {
    return useQuery({
      select: (data) => data.data,
      queryKey: ["LGA", state],
      queryFn: () => fetchLgasByStateRequest(state),
      enabled: !!state,
    });
  };

  return {
    useGetAllStates,
    useGetLGAByState,
  };
};
