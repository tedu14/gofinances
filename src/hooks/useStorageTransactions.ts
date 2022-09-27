import { storageKeys } from "../config/storagesKey";
import { useAuth } from "../providers/AuthProvider";
import { useStorage } from "./useStorage";

export function useStorageTransactions() {
  const { user } = useAuth();
  const storage = useStorage(
    storageKeys.transactionKey.replace("{userId}", user.id)
  );

  return storage;
}
