import { apiSlice } from "../api/apiSlice";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";

export const roomsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRoom: builder.query({
      queryFn: async ({ roomId, password }) => {
        try {
          const roomsRef = doc(db, "rooms", roomId);
          const querySnapshot = await getDoc(roomsRef);
          const roomPassword = querySnapshot.data()?.password;
          if (roomPassword && password === roomPassword) {
            return { data: querySnapshot.data() };
          } else if (roomPassword && password !== roomPassword) {
            return { data: "wrong" };
          }
          return { data: querySnapshot.data() };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["Room"],
    }),
    addRoom: builder.mutation({
      queryFn: async ({ roomId, password, uid }) => {
        try {
          const roomRef = doc(db, "rooms", roomId);
          const data = {
            id: roomId,
            password,
            members: [uid],
            createdAt: serverTimestamp(),
          };
          await setDoc(roomRef, data);
          return { data: "ok" };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["Room"],
    }),
    getMemberByRoomId: builder.query({
      queryFn: async ({ roomId, uid }) => {
        try {
          const roomRef = doc(db, "rooms", roomId);
          const querySnapshot = await getDoc(roomRef);
          if (!querySnapshot.data()) {
            return { data: false };
          }
          const hasMember = querySnapshot.data().members.includes(uid);
          if (hasMember) {
            return { data: true };
          } else {
            return { data: false };
          }
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["Member"],
    }),
    addMemberByRoomId: builder.mutation({
      queryFn: async ({ roomId, uid }) => {
        try {
          const roomRef = doc(db, "rooms", roomId);
          await updateDoc(roomRef, {
            members: arrayUnion(uid),
          });
          return { data: "ok" };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["Room", "Member"],
    }),
    getMessagesByRoomId: builder.query({
      queryFn: async (roomId) => {
        try {
          const messagesRef = collection(db, "rooms", roomId, "messages");
          const q = query(messagesRef, orderBy("createdAt", "asc"));
          const querySnapshot = await getDocs(q);
          let messages = [];
          querySnapshot?.forEach((m) => {
            // console.log(m.id);
            messages.push({ id: m.id, ...m.data() });
          });
          // console.log(messages);
          return { data: messages };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["Message"],
    }),
    addMessage: builder.mutation({
      async queryFn({ roomId, data }) {
        try {
          const messagesRef = collection(db, "rooms", roomId, "messages");
          const datedData = { ...data, createdAt: serverTimestamp() };
          await addDoc(messagesRef, datedData);
          return { data: "ok" };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["Message"],
    }),
    updateMessage: builder.mutation({
      async queryFn({ roomId, messageId, data }) {
        try {
          const messageRef = doc(db, "rooms", roomId, "messages", messageId);
          await updateDoc(messageRef, data);
          return { data: "ok" };
        } catch (error) {
          return { error };
        }
      },
    }),
    invalidatesTags: ["Message"],
  }),
});

export const {
  useGetRoomQuery,
  useGetMessagesByRoomIdQuery,
  useGetMemberByRoomIdQuery,
  useAddMemberByRoomIdMutation,
  useUpdateMessageMutation,
  useAddMessageMutation,
  useAddRoomMutation,
} = roomsSlice;
