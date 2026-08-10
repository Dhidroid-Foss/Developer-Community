export interface Session {
  name: string;
  desc: string;
  host: string;
  date: string;
}

export interface Cohort {
  id: string;
  label: string;
  title: string;
  desc: string;
  sessions: Session[];
  bg: string;
}
