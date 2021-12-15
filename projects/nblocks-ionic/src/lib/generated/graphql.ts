import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUsers: Array<User>;
  deleteUser: Scalars['Boolean'];
  sendPasswordResetLink: Scalars['Boolean'];
  testInsert: NebulrDemo;
  updateTenant: Tenant;
  updateUser: User;
};


export type MutationCreateUsersArgs = {
  userNames: Array<Scalars['String']>;
};


export type MutationDeleteUserArgs = {
  userId: Scalars['String'];
};


export type MutationSendPasswordResetLinkArgs = {
  userId: Scalars['String'];
};


export type MutationUpdateTenantArgs = {
  locale: Scalars['String'];
  name: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  user: UserInput;
};

export type NebulrDemo = {
  __typename?: 'NebulrDemo';
  id: Scalars['ID'];
  /** A word is a composition of letters, nothing more... */
  word: Scalars['String'];
};

export type NebulrDemoInput = {
  id: Scalars['ID'];
  /** A word is a composition of letters, nothing more... */
  word: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getCustomerPortal: Scalars['String'];
  getTenant: Tenant;
  getTenantAnonymous: TenantAnonymous;
  list: Array<NebulrDemo>;
  listUsers: Array<User>;
};

export type Tenant = {
  __typename?: 'Tenant';
  createdAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  logo: Scalars['String'];
  name: Scalars['String'];
  plan?: Maybe<Scalars['String']>;
};

export type TenantAnonymous = {
  __typename?: 'TenantAnonymous';
  id: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  enabled?: Maybe<Scalars['Boolean']>;
  fullName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  onboarded?: Maybe<Scalars['Boolean']>;
  role?: Maybe<Scalars['String']>;
  teams?: Maybe<Array<Scalars['String']>>;
  username?: Maybe<Scalars['String']>;
};

export type UserInput = {
  enabled?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['String'];
  role?: InputMaybe<Scalars['String']>;
};

export type GetTenantQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTenantQuery = { __typename?: 'Query', getTenant: { __typename?: 'Tenant', id: string, name: string, locale?: string | null | undefined, logo: string, plan?: string | null | undefined, createdAt?: any | null | undefined } };

export type UpdateTenantMutationVariables = Exact<{
  name: Scalars['String'];
  locale: Scalars['String'];
}>;


export type UpdateTenantMutation = { __typename?: 'Mutation', updateTenant: { __typename?: 'Tenant', id: string, name: string, locale?: string | null | undefined, logo: string, plan?: string | null | undefined, createdAt?: any | null | undefined } };

export type CreateUsersMutationVariables = Exact<{
  userNames: Array<Scalars['String']> | Scalars['String'];
}>;


export type CreateUsersMutation = { __typename?: 'Mutation', createUsers: Array<{ __typename?: 'User', id?: string | null | undefined, fullName?: string | null | undefined, email?: string | null | undefined, username?: string | null | undefined, createdAt?: any | null | undefined, onboarded?: boolean | null | undefined, enabled?: boolean | null | undefined, role?: string | null | undefined, teams?: Array<string> | null | undefined }> };

export type ListUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type ListUsersQuery = { __typename?: 'Query', listUsers: Array<{ __typename?: 'User', id?: string | null | undefined, fullName?: string | null | undefined, email?: string | null | undefined, username?: string | null | undefined, createdAt?: any | null | undefined, onboarded?: boolean | null | undefined, enabled?: boolean | null | undefined, role?: string | null | undefined, teams?: Array<string> | null | undefined }> };

export type UpdateUserMutationVariables = Exact<{
  user: UserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id?: string | null | undefined, fullName?: string | null | undefined, email?: string | null | undefined, username?: string | null | undefined, createdAt?: any | null | undefined, onboarded?: boolean | null | undefined, enabled?: boolean | null | undefined, role?: string | null | undefined, teams?: Array<string> | null | undefined } };

export const GetTenantDocument = gql`
    query GetTenant {
  getTenant {
    id
    name
    locale
    logo
    plan
    createdAt
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetTenantGQL extends Apollo.Query<GetTenantQuery, GetTenantQueryVariables> {
    document = GetTenantDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateTenantDocument = gql`
    mutation UpdateTenant($name: String!, $locale: String!) {
  updateTenant(name: $name, locale: $locale) {
    id
    name
    locale
    logo
    plan
    createdAt
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateTenantGQL extends Apollo.Mutation<UpdateTenantMutation, UpdateTenantMutationVariables> {
    document = UpdateTenantDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateUsersDocument = gql`
    mutation CreateUsers($userNames: [String!]!) {
  createUsers(userNames: $userNames) {
    id
    fullName
    email
    username
    createdAt
    onboarded
    enabled
    role
    teams
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateUsersGQL extends Apollo.Mutation<CreateUsersMutation, CreateUsersMutationVariables> {
    document = CreateUsersDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ListUsersDocument = gql`
    query ListUsers {
  listUsers {
    id
    fullName
    email
    username
    createdAt
    onboarded
    enabled
    role
    teams
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ListUsersGQL extends Apollo.Query<ListUsersQuery, ListUsersQueryVariables> {
    document = ListUsersDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateUserDocument = gql`
    mutation UpdateUser($user: UserInput!) {
  updateUser(user: $user) {
    id
    fullName
    email
    username
    createdAt
    onboarded
    enabled
    role
    teams
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateUserGQL extends Apollo.Mutation<UpdateUserMutation, UpdateUserMutationVariables> {
    document = UpdateUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }