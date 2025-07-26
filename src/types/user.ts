export interface User {
    id: number;
    firstName: string;
    lastName: string;
    maidenName: string;
    age: number;
    gender: string;
    phone: string;
    email: string;
    address: {
        city: string;
        country: string;
    };
    height: number;
    weight: number;
    image: string;
}

export type UsersApiResponse = {
    users: User[];
    total: number;
    skip: number;
    limit: number;
};

export type FetchUsersParams = {
    limit: number;
    skip: number;
    query?: string;
    sortBy?: string;
    order?: 'asc' | 'desc';
};

export type DetailedUser = {
    id: number;
    firstName: string;
    lastName: string;
    maidenName: string;
    age: number;
    address: {
        address: string;
        city: string;
        country: string;
        postalCode: string;
    };
    height: number;
    weight: number;
    phone: string;
    email: string;
    image: string;
};

export type SortableKey = 'lastName' | 'age' | 'gender' | 'phone';
export type SortDirection = 'asc' | 'desc' | 'none';
export type SortConfig = { key: SortableKey | null; direction: SortDirection };
