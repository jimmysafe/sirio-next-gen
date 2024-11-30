/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  collections: {
    users: User;
    media: Media;
    courses: Course;
    pages: Page;
    teachers: Teacher;
    tutors: Tutor;
    'course-subscriptions': CourseSubscription;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  collectionsJoins: {
    courses: {
      students: 'course-subscriptions';
    };
    teachers: {
      courses: 'courses';
    };
  };
  collectionsSelect: {
    users: UsersSelect<false> | UsersSelect<true>;
    media: MediaSelect<false> | MediaSelect<true>;
    courses: CoursesSelect<false> | CoursesSelect<true>;
    pages: PagesSelect<false> | PagesSelect<true>;
    teachers: TeachersSelect<false> | TeachersSelect<true>;
    tutors: TutorsSelect<false> | TutorsSelect<true>;
    'course-subscriptions': CourseSubscriptionsSelect<false> | CourseSubscriptionsSelect<true>;
    'payload-locked-documents': PayloadLockedDocumentsSelect<false> | PayloadLockedDocumentsSelect<true>;
    'payload-preferences': PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
    'payload-migrations': PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: number;
  };
  globals: {};
  globalsSelect: {};
  locale: null;
  user: User & {
    collection: 'users';
  };
  jobs: {
    tasks: unknown;
    workflows: unknown;
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: number;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: number;
  alt: string;
  prefix?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "courses".
 */
export interface Course {
  id: number;
  title: string;
  description: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  };
  hero_image: number | Media;
  price: number;
  start_date: string;
  modules: number;
  days: number;
  gallery?:
    | {
        photo?: (number | null) | Media;
        id?: string | null;
      }[]
    | null;
  goals: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  };
  programme: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  };
  _participations?: (number | CourseSubscription)[] | null;
  students?: {
    docs?: (number | CourseSubscription)[] | null;
    hasNextPage?: boolean | null;
  } | null;
  teacher: number | Teacher;
  tutors?: (number | Tutor)[] | null;
  slug?: string | null;
  slugLock?: boolean | null;
  publishedAt?: string | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "course-subscriptions".
 */
export interface CourseSubscription {
  id: number;
  nome: string;
  cognome: string;
  email?: string | null;
  codiceFiscale?: string | null;
  partitaIva?: string | null;
  codiceUnivoco?: string | null;
  paymentId?: string | null;
  course?: (number | null) | Course;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "teachers".
 */
export interface Teacher {
  id: number;
  nome: string;
  cognome: string;
  description: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  };
  photo: number | Media;
  courses?: {
    docs?: (number | Course)[] | null;
    hasNextPage?: boolean | null;
  } | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "tutors".
 */
export interface Tutor {
  id: number;
  nome: string;
  cognome: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages".
 */
export interface Page {
  id: number;
  title: string;
  slug: string;
  hero: {
    type: 'none' | 'grande' | 'piccolo';
    media?: (number | null) | Media;
  };
  layout: ImageText[];
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ImageText".
 */
export interface ImageText {
  text: string;
  image: number | Media;
  id?: string | null;
  blockName?: string | null;
  blockType: 'image-text';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: number;
  document?:
    | ({
        relationTo: 'users';
        value: number | User;
      } | null)
    | ({
        relationTo: 'media';
        value: number | Media;
      } | null)
    | ({
        relationTo: 'courses';
        value: number | Course;
      } | null)
    | ({
        relationTo: 'pages';
        value: number | Page;
      } | null)
    | ({
        relationTo: 'teachers';
        value: number | Teacher;
      } | null)
    | ({
        relationTo: 'tutors';
        value: number | Tutor;
      } | null)
    | ({
        relationTo: 'course-subscriptions';
        value: number | CourseSubscription;
      } | null);
  globalSlug?: string | null;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: number;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: number;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users_select".
 */
export interface UsersSelect<T extends boolean = true> {
  updatedAt?: T;
  createdAt?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  loginAttempts?: T;
  lockUntil?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media_select".
 */
export interface MediaSelect<T extends boolean = true> {
  alt?: T;
  prefix?: T;
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "courses_select".
 */
export interface CoursesSelect<T extends boolean = true> {
  title?: T;
  description?: T;
  hero_image?: T;
  price?: T;
  start_date?: T;
  modules?: T;
  days?: T;
  gallery?:
    | T
    | {
        photo?: T;
        id?: T;
      };
  goals?: T;
  programme?: T;
  _participations?: T;
  students?: T;
  teacher?: T;
  tutors?: T;
  slug?: T;
  slugLock?: T;
  publishedAt?: T;
  updatedAt?: T;
  createdAt?: T;
  _status?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages_select".
 */
export interface PagesSelect<T extends boolean = true> {
  title?: T;
  slug?: T;
  hero?:
    | T
    | {
        type?: T;
        media?: T;
      };
  layout?:
    | T
    | {
        'image-text'?:
          | T
          | {
              text?: T;
              image?: T;
              id?: T;
              blockName?: T;
            };
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "teachers_select".
 */
export interface TeachersSelect<T extends boolean = true> {
  nome?: T;
  cognome?: T;
  description?: T;
  photo?: T;
  courses?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "tutors_select".
 */
export interface TutorsSelect<T extends boolean = true> {
  nome?: T;
  cognome?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "course-subscriptions_select".
 */
export interface CourseSubscriptionsSelect<T extends boolean = true> {
  nome?: T;
  cognome?: T;
  email?: T;
  codiceFiscale?: T;
  partitaIva?: T;
  codiceUnivoco?: T;
  paymentId?: T;
  course?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T;
  globalSlug?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T;
  key?: T;
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T;
  batch?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}