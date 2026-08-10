export interface ProgramSession {
  meta: string;
  title: string;
  host: string;
  image: string;
}

export interface Program {
  label: string;
  title: string;
  text: string;
  sessions: ProgramSession[];
}

export interface Story {
  tag: string;
  title: string;
  image: string;
}

export interface Quote {
  text: string;
  author: string;
  role: string;
  image: string;
  location: string;
  github: string;
  linkedin: string;
  website?: string;
}
