import { Static, Type } from "@sinclair/typebox";

// User
export const User = Type.Object({
  name: Type.String(),
  email: Type.String(),
  password: Type.String(),
});

export type UserType = Static<typeof User>;


// UserDetail
export const UserDetail = Type.Object({
  nick: Type.String(),
  fullName: Type.String(),
});

export type UserDetailType = Static<typeof UserDetail>;

// RequestBody
export type RequestBody = Static<typeof User> & Static<typeof UserDetail>;
export type RequestBodyType = Static<typeof User>;

// Profile
export const Profile = Type.Object({
  settings: Type.String(),
});

export type ProfileType = Static<typeof Profile>;
