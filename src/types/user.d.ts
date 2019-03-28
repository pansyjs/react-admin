export type tagType = {
  key: string;
  label: string;
};

export interface currentUserType {
  name: string;
  realName: string;
  unreadCount: number;
  avatar: string;
  email: string;
  phone: string;
  signature: string;
  title: string;
  group: string;
  tags: tagType[];
}
