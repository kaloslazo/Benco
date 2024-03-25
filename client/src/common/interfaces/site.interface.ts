export interface SiteInterface {
  name: string;
  defaultTitle: string;
  author: string;
  twitterAuthor: string;
  description: string;
  keywords: string[];
  url: UrlInterface;
  social: SocialInterface;
}

interface UrlInterface {
  base: string;
  author: string;
}

interface SocialInterface {
  github?: string;
  twitter?: string;
  mastodon?: string;
  linkedin?: string;
}
