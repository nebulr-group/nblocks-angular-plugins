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
};

export type App = {
  __typename?: 'App';
  logo?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  privacyPolicyUrl?: Maybe<Scalars['String']>;
  termsOfServiceUrl?: Maybe<Scalars['String']>;
  uiUrl?: Maybe<Scalars['String']>;
  websiteUrl?: Maybe<Scalars['String']>;
};

export type CreateTenantInput = {
  logo?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  owner: TenantOwnerInput;
  plan: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createTenantAnonymous: Tenant;
  /** This will create a new user for a tenant. */
  createUsers: Array<User>;
  deleteUser: Scalars['Boolean'];
  sendPasswordResetLink: Scalars['Boolean'];
  updateTenant: Tenant;
  /** Update the user. You can change role, teams and also enable or disable the user from logging in. */
  updateUser: User;
};


export type MutationCreateTenantAnonymousArgs = {
  tenant: CreateTenantInput;
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
  tenant: TenantInput;
};


export type MutationUpdateUserArgs = {
  user: UserInput;
};

export type Query = {
  __typename?: 'Query';
  /** Gets useful App configs for the UI to consume */
  getAppAnonymous: App;
  /** Obtain an short lived session url to redirect or present the user its Stripe subscription panel for updating payment or subscription data. */
  getCustomerPortal: Scalars['String'];
  /** Gets a single tenant */
  getTenant: Tenant;
  getTenantAnonymous: TenantAnonymous;
  /** Lists all tenants */
  listTenants: Array<Tenant>;
  /** List all available user roles that the current user can assign others */
  listUserRoles: Array<Scalars['String']>;
  /** List all users in this tenant. */
  listUsers: Array<User>;
};

export type Tenant = {
  __typename?: 'Tenant';
  createdAt?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  logo: Scalars['String'];
  mfa?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  plan?: Maybe<Scalars['String']>;
};

export type TenantAnonymous = {
  __typename?: 'TenantAnonymous';
  id: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type TenantInput = {
  locale?: InputMaybe<Scalars['String']>;
  mfa?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
};

export type TenantOwnerInput = {
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  enabled?: Maybe<Scalars['Boolean']>;
  fullName?: Maybe<Scalars['String']>;
  id: Scalars['String'];
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

export type GetAppAnonymousQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAppAnonymousQuery = { __typename?: 'Query', getAppAnonymous: { __typename?: 'App', name?: string | null | undefined, logo?: string | null | undefined, privacyPolicyUrl?: string | null | undefined, termsOfServiceUrl?: string | null | undefined, uiUrl?: string | null | undefined, websiteUrl?: string | null | undefined } };

export type CreateTenantAnonymousMutationVariables = Exact<{
  tenant: CreateTenantInput;
}>;


export type CreateTenantAnonymousMutation = { __typename?: 'Mutation', createTenantAnonymous: { __typename?: 'Tenant', id: string, name: string, locale?: string | null | undefined, logo: string, plan?: string | null | undefined, mfa?: boolean | null | undefined, createdAt?: string | null | undefined } };

export type GetTenantQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTenantQuery = { __typename?: 'Query', getTenant: { __typename?: 'Tenant', id: string, name: string, locale?: string | null | undefined, logo: string, plan?: string | null | undefined, createdAt?: string | null | undefined } };

export type UpdateTenantMutationVariables = Exact<{
  tenant: TenantInput;
}>;


export type UpdateTenantMutation = { __typename?: 'Mutation', updateTenant: { __typename?: 'Tenant', id: string, name: string, locale?: string | null | undefined, logo: string, plan?: string | null | undefined, mfa?: boolean | null | undefined, createdAt?: string | null | undefined } };

export type CreateUsersMutationVariables = Exact<{
  userNames: Array<Scalars['String']> | Scalars['String'];
}>;


export type CreateUsersMutation = { __typename?: 'Mutation', createUsers: Array<{ __typename?: 'User', id: string, fullName?: string | null | undefined, email?: string | null | undefined, username?: string | null | undefined, createdAt?: string | null | undefined, onboarded?: boolean | null | undefined, enabled?: boolean | null | undefined, role?: string | null | undefined, teams?: Array<string> | null | undefined }> };

export type DeleteUserMutationVariables = Exact<{
  userId: Scalars['String'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: boolean };

export type ListUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type ListUsersQuery = { __typename?: 'Query', listUsers: Array<{ __typename?: 'User', id: string, fullName?: string | null | undefined, email?: string | null | undefined, username?: string | null | undefined, createdAt?: string | null | undefined, onboarded?: boolean | null | undefined, enabled?: boolean | null | undefined, role?: string | null | undefined, teams?: Array<string> | null | undefined }> };

export type SendPasswordResetLinkMutationVariables = Exact<{
  userId: Scalars['String'];
}>;


export type SendPasswordResetLinkMutation = { __typename?: 'Mutation', sendPasswordResetLink: boolean };

export type UpdateUserMutationVariables = Exact<{
  user: UserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, fullName?: string | null | undefined, email?: string | null | undefined, username?: string | null | undefined, createdAt?: string | null | undefined, onboarded?: boolean | null | undefined, enabled?: boolean | null | undefined, role?: string | null | undefined, teams?: Array<string> | null | undefined } };

export const GetAppAnonymousDocument = gql`
    query GetAppAnonymous {
  getAppAnonymous {
    name
    logo
    privacyPolicyUrl
    termsOfServiceUrl
    uiUrl
    websiteUrl
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAppAnonymousGQL extends Apollo.Query<GetAppAnonymousQuery, GetAppAnonymousQueryVariables> {
    document = GetAppAnonymousDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateTenantAnonymousDocument = gql`
    mutation CreateTenantAnonymous($tenant: CreateTenantInput!) {
  createTenantAnonymous(tenant: $tenant) {
    id
    name
    locale
    logo
    plan
    mfa
    createdAt
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateTenantAnonymousGQL extends Apollo.Mutation<CreateTenantAnonymousMutation, CreateTenantAnonymousMutationVariables> {
    document = CreateTenantAnonymousDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
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
    mutation UpdateTenant($tenant: TenantInput!) {
  updateTenant(tenant: $tenant) {
    id
    name
    locale
    logo
    plan
    mfa
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
export const DeleteUserDocument = gql`
    mutation DeleteUser($userId: String!) {
  deleteUser(userId: $userId)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteUserGQL extends Apollo.Mutation<DeleteUserMutation, DeleteUserMutationVariables> {
    document = DeleteUserDocument;
    
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
export const SendPasswordResetLinkDocument = gql`
    mutation SendPasswordResetLink($userId: String!) {
  sendPasswordResetLink(userId: $userId)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SendPasswordResetLinkGQL extends Apollo.Mutation<SendPasswordResetLinkMutation, SendPasswordResetLinkMutationVariables> {
    document = SendPasswordResetLinkDocument;
    
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