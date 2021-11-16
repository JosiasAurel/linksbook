// Application
// Custom models type definitions

declare interface Link {
  annotation: string;
  tags: Array<string>;
  note: string;
  url: string;
  owner: string;
  id: string;
  createdAt: string;
}

declare interface Group {
  id: string;
  links: Array<string>;
  name: string;
  createdAt: string;
}

declare interface Note {
  id: string;
  link: string;
  content: string;
  title: string;
}

declare interface bookmarksStructure {
  children: Array<bookmarksStructure>;
  url: string;
  name: string;
  date: string;
}
