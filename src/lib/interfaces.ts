import { UserType, ResponseUserType } from "../lib/Type";

interface IReply {
  201: {
    success: boolean;
    data: {
      users: ResponseUserType[];
    };
  };
  302: { url: string };
  "4xx": { error: string };
  "5xx": { error: string };
  200: {
    success: boolean;
    data: {
      users: ResponseUserType[];
    };
  };
}
interface IQuerystring {
  id: string;
}
interface IdeleteReply {
  200: {
    success: boolean;
  };
  404: {
    error: string;
  };
}
export { IReply, IQuerystring, IdeleteReply };