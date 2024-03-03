import { QueryDocumentSnapshot, WithFieldValue } from "firebase/firestore";

const converter = <Type>() => ({
  toFirestore: (data: WithFieldValue<Type>) => data,
  fromFirestore: (snapshot: QueryDocumentSnapshot) =>
    ({ ...snapshot.data(), id: snapshot.id } as Type),
});

export default converter;
