export interface SearchUser {
  id: string;
  username: string;
  profilePicture?: string;
}

export interface SearchPost {
  id: string;
  content: string;
}

export interface SearchResponse {
  users?: SearchUser[];
  posts?: SearchPost[];
}