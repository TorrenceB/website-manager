import {
  PartialWithFieldValue,
  QueryDocumentSnapshot,
} from "firebase/firestore";

const converter = <Type>() => ({
  toFirestore: (data: PartialWithFieldValue<Type>) => data,
  fromFirestore: (snapshot: QueryDocumentSnapshot) => snapshot.data() as Type,
});

export default converter;
