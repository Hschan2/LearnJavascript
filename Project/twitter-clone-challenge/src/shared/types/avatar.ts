import { User } from "firebase/auth";

export type UseAvatarOptions = {
  user?: User | null;
  enableUpload?: boolean;
};
