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
export type RequestBodyType = Static<typeof User> & Static<typeof UserDetail>;

export type ResponseUserType = {
  user_id: string;
  name: string;
  email: string;
  password: string;
  u_created_at: Date;
  u_updated_at: Date;
  udetail_id: string;
  nick: string;
  fullName: string;
  ud_created_at: Date;
  ud_updated_at: Date;
};

//export type ResponseUserType = Static<typeof User> & >;

// Profile
export const Profile = Type.Object({
  settings: Type.String(),
});

export type ProfileType = Static<typeof Profile>;
