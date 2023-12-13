import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export const sortByDate = (
  array: FirebaseFirestoreTypes.DocumentData[] | [] | undefined
) => {
  return array?.sort((a, b) => {
    const dateA = a.createdAt;
    const dateB = b.createdAt;

    if (dateA < dateB) {
      return -1;
    }
    if (dateA > dateB) {
      return 1;
    }
    return 0;
  });
};

export const size = (multiplier: number) => {
  if (multiplier === 0) return 0;

  if (multiplier < 0) return multiplier * -4;

  return multiplier * 4;
};
