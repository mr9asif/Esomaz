export interface SuggestionUser {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  isVerified: boolean;

  _count: {
    followers: number;
  };
}