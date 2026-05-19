import {
  addNewContact,
  deleteContact,
  getUserPreference,
} from "@/services/user.services";
import { Contact } from "@/store/recharge-store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useUserPrefs() {
  return useQuery({
    queryKey: ["userPreferences", "userPreference"],
    queryFn: () => getUserPreference(),
  });
}

export function useAddContact() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (contact: Partial<Contact>) => addNewContact(contact),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["userPreferences", "userPreference"],
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });
}

export function useDeleteContact() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (phone: string) => deleteContact(phone),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["userPreferences", "userPreference"],
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });
}
